import { useLocation } from 'react-router-dom';

export function Breadcrumb() {
  const location = useLocation();
  const path = location.pathname;

  const formatPath = (path: string) => {
    if (path === '/') {
      return '~ / src / pages / Home';
    }
    const pageName = path.slice(1);
    const capitalizedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    return `~ / src / pages / ${capitalizedPageName}`;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
      <span className="text-cyan-400">➜</span>
      <span>{formatPath(path)}</span>
    </div>
  );
}
