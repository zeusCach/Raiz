import { createBrowserRouter } from 'react-router-dom';
import { Feed } from '../features/feed/components/Feed';
import { PostDetailPage } from '../features/postCultura/page/PostDetailPage';
import { AppLayout } from './AppLayout';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      { index: true, element: <Feed /> },
      { path: 'feed', element: <Feed /> },
      { path: 'post/:id', element: <PostDetailPage /> },
    ],
  },
]);