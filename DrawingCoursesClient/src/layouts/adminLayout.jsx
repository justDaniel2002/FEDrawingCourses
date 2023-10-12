

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AdminLayout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}