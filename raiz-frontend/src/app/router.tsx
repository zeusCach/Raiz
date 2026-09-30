import { createBrowserRouter } from "react-router-dom";
import { Feed } from "../features/feed/components/Feed";
import { PostDetailPage } from "../features/postCultura/page/PostDetailPage";
import { AppLayout } from "./AppLayout";
import { PostForm } from "../features/postCultura/components/postCard/PostFrom";
import { RegistroPage } from "../features/auth/page/RegisterPage";
import { LoginPage } from "../features/auth/page/LoginPage";
import { ProtectedRoute } from "./protectedRoute";
import { ProfilePage } from "../features/profile/page/ProfilePage";
import { ComunidadesPage } from "../features/comunidades/page/ComunidadesPage";
import { CrearComunidadPage } from "../features/comunidades/page/CrearComunidadPage";
import { ComunidadDetailPage } from "../features/comunidades/page/ComunidadDetailPage";
import { ComunidadPublicarPage } from "../features/comunidades/page/ComunidadPublicarPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Feed /> },
      { path: "feed", element: <Feed /> },
      { path: "post/:id", element: <PostDetailPage /> },
      {
        path: "publicar",
        element: (
          <ProtectedRoute>
            <PostForm />
          </ProtectedRoute>
        ),
      },
      { path: "perfil/:id", element: <ProfilePage /> },
      { path: "comunidades", element: <ComunidadesPage /> },
      {
        path: "comunidades/crear",
        element: (
          <ProtectedRoute>
            <CrearComunidadPage />
          </ProtectedRoute>
        ),
      },
      { path: "comunidades/:id", element: <ComunidadDetailPage /> },
    ],
  },
  { path: "registro", element: <RegistroPage /> },
  { path: "login", element: <LoginPage /> },
  {
  path: 'comunidades/:id/publicar',
  element: (
    <ProtectedRoute>
      <ComunidadPublicarPage />
    </ProtectedRoute>
  ),
},
]);
