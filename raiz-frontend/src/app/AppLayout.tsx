import { Outlet } from 'react-router-dom';
import { Navbar } from '../shared/components/Navbar';
import { RightSidebar } from '../features/feed/components/RightSidebar';
import { Sidebar } from '../features/feed/components/SideBar';
import { BottomNav } from '../shared/components/BottomNav';
import { useAuthStore } from '../features/auth/store/authStore';
import { useEffect } from 'react';
import { fetchUsuarioActual } from '../features/auth/services/auth.services';

export function AppLayout() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoaging = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    fetchUsuarioActual().then(setUser).finally(() => setLoaging(false));
  }, [setUser, setLoaging]);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-papel font-body">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 pb-20 md:pb-0">
          <Outlet />
        </div>
        <RightSidebar />
      </div>
      <BottomNav />
    </div>
  );
}