import React, { useEffect } from 'react';
import { 
  MapIcon,
  Cog6ToothIcon,
  SunIcon,
  ChartBarIcon,
  GlobeAltIcon,
  BoltIcon,
  TruckIcon,
  TicketIcon,
  PaperAirplaneIcon,
  BuildingOffice2Icon,
  CloudIcon,
  HomeIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import useResultStore from '../../../../stores/useResultStore';

// Helper Component for List Items
const LayerItem = ({ icon, label, iconBgColor, iconColor, layerKey }) => {
  const isChecked = useResultStore(state => state.layers[layerKey]);
  const toggleLayer = useResultStore(state => state.toggleLayer);

  return (
    <div className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
      {/* 
         RTL Layout:
         Flex row (Start is Right).
         Icon/Label on Right. Switch on Left.
         Standard 'justify-between' handles this separation.
      */}
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 ${iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
          {React.cloneElement(icon, { className: `w-5 h-5 ${iconColor}` })}
        </div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
      </div>
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          checked={!!isChecked} 
          onChange={() => toggleLayer(layerKey)} 
          className="sr-only peer" 
        />
        {/* Toggle Switch */}
        {/* 
           RTL Check: 
           peer-checked:after:translate-x-full moves the dot to the right (physically).
           In LTR: OFF (Left), ON (Right).
           In RTL: The logic of the switch visual usually remains (Left=Off, Right=On) or flips.
           Tailwind 'translate-x-full' is physical translation.
           This style should look fine in RTL as standard toggle switches usually fill L->R.
        */}
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary-blue peer-checked:bg-primary-blue peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
    </div>
  );
};

const SectionHeader = ({ title }) => (
  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2.5">{title}</h4>
);

export default function LayersSidebarPanel() {
  const setContentView = useResultStore(state => state.setContentView);
  
  // Ensure the main view is set to layers when this panel is active
  useEffect(() => {
    setContentView('layers-page');
  }, [setContentView]);

  return (
    <div className="space-y-6 pb-[80px]">
      <div className="space-y-3">
        <SectionHeader title="مرزهای سایت" />
        <div className="space-y-1">
          <LayerItem label="موقعیت انتخابی" layerKey="selectedLocation" icon={<MapPinIcon />} iconBgColor="bg-indigo-50" iconColor="text-indigo-600" />
          <LayerItem label="زمین تخصیص‌یافته" layerKey="allocatedLand" icon={<MapIcon />} iconBgColor="bg-emerald-50" iconColor="text-emerald-600" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionHeader title="لایه‌های تحلیلی" />
        <div className="space-y-1">
          <LayerItem label="تحلیل فنی" layerKey="technical" icon={<Cog6ToothIcon />} iconBgColor="bg-violet-50" iconColor="text-violet-600" />
        </div>
      </div>
      
      <div className="space-y-3">
        <SectionHeader title="منابع و عوارض زمین" />
        <div className="space-y-1">
          <LayerItem label="تابش خورشیدی (GHI)" layerKey="ghi" icon={<SunIcon />} iconBgColor="bg-amber-50" iconColor="text-amber-600" /> 
          <LayerItem label="شیب" layerKey="slope" icon={<ChartBarIcon />} iconBgColor="bg-emerald-50" iconColor="text-emerald-600" />
          <LayerItem label="مدل ارتفاعی (DEM)" layerKey="dem" icon={<GlobeAltIcon />} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionHeader title="عوارض جغرافیایی" />
        <div className="space-y-1">
          <LayerItem label="خطوط انتقال برق" layerKey="powerLines" icon={<BoltIcon />} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
          <LayerItem label="جاده‌ها" layerKey="roads" icon={<TruckIcon />} iconBgColor="bg-orange-50" iconColor="text-orange-600" />
          <LayerItem label="راه‌آهن" layerKey="railways" icon={<TicketIcon />} iconBgColor="bg-yellow-50" iconColor="text-yellow-600" />
          <LayerItem label="فرودگاه‌ها" layerKey="airports" icon={<PaperAirplaneIcon />} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
          <LayerItem label="شهرها و آبادی‌ها" layerKey="cities" icon={<BuildingOffice2Icon />} iconBgColor="bg-gray-100" iconColor="text-gray-600" />
          <LayerItem label="منابع آبی" layerKey="waterAreas" icon={<CloudIcon />} iconBgColor="bg-teal-50" iconColor="text-teal-600" />
          <LayerItem label="کاربری اراضی" layerKey="landuse" icon={<HomeIcon />} iconBgColor="bg-indigo-50" iconColor="text-indigo-600" />
          <LayerItem label="مناطق حفاظت‌شده" layerKey="protectedAreas" icon={<ShieldCheckIcon />} iconBgColor="bg-green-50" iconColor="text-green-600" />
          <LayerItem label="گسل‌ها" layerKey="fault" icon={<ExclamationTriangleIcon />} iconBgColor="bg-rose-50" iconColor="text-rose-600" />
        </div>
      </div>
    </div>
  );
}
