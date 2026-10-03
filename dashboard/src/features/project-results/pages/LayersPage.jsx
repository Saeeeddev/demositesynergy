import { useOutletContext } from 'react-router-dom';
import UnifiedBaseMap from '../components/Layers/UnifiedBaseMap';
import { getProjectLocation } from '../lib/projectLocation';

export default function LayersPage() {
  const { projectId, projectData } = useOutletContext();
  const location = getProjectLocation(projectData, projectId)?.features[0]?.geometry;
  const center = location?.type === 'Point'
    ? [location.coordinates[1], location.coordinates[0]]
    : undefined;

  return <div className="relative h-full w-full">
    <UnifiedBaseMap center={center} />
    <div className="absolute bottom-5 left-5 z-[1000] max-w-[260px] rounded-lg border border-gray-200 bg-white/95 p-3 text-right text-xs leading-6 text-gray-700 shadow-lg" dir="rtl">
      <p className="text-sm font-bold text-gray-900">راهنمای نقشه</p>
      <p>تصویر ماهواره‌ای، نقشهٔ پایه است.</p>
      <p>لایه‌های تحلیلی در نسخهٔ آزمایشی توسط سازنده غیرفعال شده‌اند.</p>
    </div>
  </div>;
}
