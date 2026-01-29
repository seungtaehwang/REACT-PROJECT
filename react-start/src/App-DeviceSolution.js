import { useState } from 'react';
import './App.css';
import HeaderMenu from './components/Header-Menu';
import LayoutMonitoring from './components/monitoring/Layout-Monitoring';
import LayoutMap from './components/map/Layout-Map';

function AppDeviceSolution() {
  const [menuType, setMenuType] = useState('Monitoring');

  return (
    <div>
      <HeaderMenu className="Top-header" onMenuType={setMenuType} />
      {menuType === 'Monitoring' && <LayoutMonitoring userId={'miyoung.id'} />}
      {menuType === 'Map' && <LayoutMap />}
    </div>
  );
}

export default AppDeviceSolution;
