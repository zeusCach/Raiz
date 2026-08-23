import { createBrowserRouter } from 'react-router-dom';
import { Feed } from '../features/feed/components/Feed';
import { PostDetailPage } from '../features/postCultura/page/PostDetailPage';
import { AppLayout } from './AppLayout';
import { PostForm } from '../features/postCultura/components/postCard/PostFrom';
import { RegistroPage } from '../features/auth/page/RegisterPage';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      { index: true, element: <Feed /> },
      { path: 'feed', element: <Feed /> },
      { path: 'post/:id', element: <PostDetailPage /> },
      { path: 'publicar', element: <PostForm /> },
    
    ],
  },
  { path: 'registro', element: <RegistroPage /> },
]);