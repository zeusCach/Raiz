
import { Feed } from './Feed';
import { RightSidebar } from './RightSidebar';
import { Sidebar } from './SideBar';

export function FeedLayout() {
  return (
    <div className="flex min-h-screen bg-papel font-body">
      <Sidebar />
      <Feed />
      <RightSidebar />
    </div>
  );
}