import { Outlet } from 'react-router-dom';
import { Navbar } from '../shared/components/Navbar';
import { RightSidebar } from '../features/feed/components/RightSidebar';
import { Sidebar } from '../features/feed/components/SideBar';

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-papel font-body">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}