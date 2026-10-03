import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import gsap from 'gsap';

// The Card Component
export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 start-1/2 [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
      customClass ?? ''
    } ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

// Helper to calculate card positions
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const CardSwap = ({
  width = 1481, // Default updated
  height = 852, // Default updated
  cardDistance = 60,
  verticalDistance = 70,
  delay = 4000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const container = useRef(null);
  const tlRef = useRef(null);
  const intervalRef = useRef(null);

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  // We use a ref to track the order of indices [0, 1, 2...]
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  // GSAP Configuration
  const config = useMemo(() => {
    return easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };
  }, [easing]);

  useEffect(() => {
    const total = refs.length;

    // Initial Placement using gsap.context for cleanup safety
    let ctx = gsap.context(() => {
      refs.forEach((r, i) => {
        if (r.current) {
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          gsap.set(r.current, {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            xPercent: -50,
            yPercent: -50,
            skewY: skewAmount,
            transformOrigin: 'center center',
            zIndex: slot.zIndex,
            force3D: true,
          });
        }
      });
    }, container);

    const swap = () => {
      if (!container.current || order.current.length < 2) return;

      const [frontIndex, ...restIndices] = order.current;
      const elFront = refs[frontIndex].current;

      if (!elFront) return;

      // Kill previous timeline if it exists to prevent conflict
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline({
        onComplete: () => {
          // Update order at the very end of the logic to keep state clean
          order.current = [...restIndices, frontIndex];
        }
      });
      tlRef.current = tl;

      // 1. Drop the front card down
      tl.to(elFront, {
        y: `+=${height * 0.6}`, // Dynamic drop based on height
        duration: config.durDrop,
        ease: config.ease,
      });

      // 2. Move the back cards forward
      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      
      restIndices.forEach((idx, i) => {
        const el = refs[idx].current;
        if (el) {
          const slot = makeSlot(i, cardDistance, verticalDistance, total);
          // Set z-index immediately
          tl.set(el, { zIndex: slot.zIndex }, 'promote');
          // Animate position
          tl.to(
            el,
            {
              x: slot.x,
              y: slot.y,
              z: slot.z,
              duration: config.durMove,
              ease: config.ease,
            },
            `promote+=${i * 0.1}`
          );
        }
      });

      // 3. Return the dropped card to the back
      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      
      tl.call(() => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
      }, null, 'return');

      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return'
      );
    };

    // Start the interval
    intervalRef.current = setInterval(swap, delay);

    // Hover Logic
    const node = container.current;
    const pause = () => {
      if (tlRef.current) tlRef.current.pause();
      clearInterval(intervalRef.current);
    };
    const resume = () => {
      if (tlRef.current) tlRef.current.play();
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(swap, delay);
    };

    if (pauseOnHover && node) {
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
    }

    // Cleanup
    return () => {
      ctx.revert(); // Revert GSAP context
      clearInterval(intervalRef.current);
      if (tlRef.current) tlRef.current.kill();
      if (pauseOnHover && node) {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
      }
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, config, height, refs]);

  // Clone children to attach refs and click handlers
  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className="relative perspective-[2000px]" // Increased perspective for larger cards
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;