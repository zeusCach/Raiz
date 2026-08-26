// features/auth/pages/LoginPage.tsx
import { AuthLayout } from '../components/AuthLayout';
import { LoginForm } from '../components/LoginForm';

// Placeholder de Unsplash (cenote) — mismo criterio que RegistroPage, reemplázalo cuando tengas el definitivo
const IMAGEN_LOGIN =
  'https://images.unsplash.com/photo-1719941463960-f3310fe64e46?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export function LoginPage() {
  return (
    <AuthLayout
      imageUrl={IMAGEN_LOGIN}
      imageAlt="Cenote de Quintana Roo"
      quote="Cada encuentro fortalece la raíz."
      locationTag="Felipe Carrillo Puerto, Q. Roo"
    >
      <LoginForm />
    </AuthLayout>
  );
}