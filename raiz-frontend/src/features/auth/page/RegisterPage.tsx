// features/auth/pages/RegistroPage.tsx
import { AuthLayout } from '../components/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';


// Placeholder de Unsplash (selva/naturaleza de Quintana Roo) — reemplázala cuando tengas la definitiva
const IMAGEN_REGISTRO =
  'https://images.unsplash.com/photo-1669025468262-dbce6afb540d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export function RegistroPage() {
  return (
    <AuthLayout
      imageUrl={IMAGEN_REGISTRO}
      imageAlt="Selva y cultura maya de Quintana Roo"
      quote="Raíz florece donde la comunidad se reúne."
      locationTag="Felipe Carrillo Puerto, Q. Roo"
    >
      <RegisterForm />
    </AuthLayout>
  );
}