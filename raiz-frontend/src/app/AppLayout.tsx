import { Outlet } from 'react-router-dom';
import { Navbar } from '../shared/components/Navbar';
import { RightSidebar } from '../features/feed/components/RightSidebar';
import { Sidebar } from '../features/feed/components/SideBar';
import { useAuthStore } from '../features/auth/store/authStore';
import { useEffect } from 'react';
import { fetchUsuarioActual } from '../features/auth/services/auth.services';

export function AppLayout() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoaging = useAuthStore((state) => state.setLoading);

  useEffect(()=> {
    fetchUsuarioActual().then(setUser).finally(() => setLoaging(false))
  },[setUser, setLoaging]);
  
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