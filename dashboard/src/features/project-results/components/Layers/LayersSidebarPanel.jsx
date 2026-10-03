import { useState } from 'react';

const layerGroups = [
  {
    title: 'مرزهای سایت',
    layers: [
      { key: 'selectedLocation', label: 'موقعیت انتخابی', needsLocation: true },
      { key: 'allocatedLand', label: 'زمین تخصیص‌یافته' },
    ],
  },
  {
    title: 'لایه‌های تحلیلی',
    layers: [{ key: 'technical', label: 'پتانسیل عملیاتی' }],
  },
  {
    title: 'منابع و عوارض زمین',
    layers: [
      { key: 'ghi', label: 'تابش خورشیدی (GHI)' },
      { key: 'slope', label: 'شیب' },
      { key: 'dem', label: 'مدل ارتفاعی (DEM)' },
    ],
  },
  {
    title: 'عوارض جغرافیایی',
    layers: [
      { key: 'powerLines', label: 'خطوط انتقال برق' },
      { key: 'roads', label: 'جاده‌ها' },
      { key: 'railways', label: 'راه‌آهن' },
      { key: 'cities', label: 'شهرها و آبادی‌ها' },
      { key: 'waterAreas', label: 'منابع آبی' },
      { key: 'landuse', label: 'کاربری اراضی' },
      { key: 'protectedAreas', label: 'مناطق حفاظت‌شده' },
      { key: 'fault', label: 'گسل‌ها' },
    ],
  },
];

function LayerItem({ label, onLockedClick }) {
  return <div className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 py-1.5">
    <span className="text-sm text-gray-700">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked="false"
      aria-disabled="true"
      aria-label={label}
      aria-describedby="demo-layers-notice"
      title="نمایش این لایه در نسخهٔ آزمایشی غیرفعال است"
      onClick={() => onLockedClick(label)}
      className="relative shrink-0 cursor-not-allowed rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-blue"
    >
      <span aria-hidden="true" className="block h-6 w-11 rounded-full border border-gray-300 bg-gray-200 opacity-75">
        <span className="mt-[2px] mr-[2px] block h-[18px] w-[18px] rounded-full border border-gray-300 bg-white shadow-sm" />
      </span>
    </button>
  </div>;
}

export default function LayersSidebarPanel({ hasSelectedLocation = false }) {
  const [requestedLayer, setRequestedLayer] = useState('');
  return <div className="space-y-5 pb-8" dir="rtl">
    <div id="demo-layers-notice" className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-right text-xs leading-6 text-blue-900">
      لایه‌های موجود در این پروژه در پایین فهرست شده‌اند. نمایش آن‌ها در نسخهٔ آزمایشی توسط سازنده غیرفعال شده است.
    </div>
    {requestedLayer && <div role="alert" className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-6 text-amber-900">
      نمایش لایهٔ «{requestedLayer}» در نسخهٔ آزمایشی توسط سازنده غیرفعال شده است.
    </div>}
    {layerGroups.map(({ title, layers }) => {
      const availableLayers = layers.filter((layer) => !layer.needsLocation || hasSelectedLocation);
      return <section key={title} aria-label={title}>
        <p className="mb-2 px-2 text-xs font-semibold text-gray-500">{title}</p>
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
          {availableLayers.map(({ key, label }) => <LayerItem key={key} label={label} onLockedClick={setRequestedLayer} />)}
        </div>
      </section>;
    })}
  </div>;
}
