// features/auth/components/LoginForm.tsx
import { useLoginForm } from '../hooks/useLoginForm';
import { Field, inputClass } from './FormField';

export function LoginForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useLoginForm();

  return (
    <>
      <p className="mb-2 font-body text-sm font-medium uppercase tracking-wide text-verde">
        Raíz · Felipe Carrillo Puerto
      </p>
      <h1 className="mb-2 font-display text-3xl text-tinta sm:text-4xl">Bienvenido de vuelta</h1>
      <p className="mb-8 font-body text-sm text-tinta/60">
        Inicia sesión para seguir conectado con tu comunidad.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <Field label="Correo electrónico" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Contraseña" error={errors.password}>
          <input
            type="password"
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Tu contraseña"
            className={inputClass(!!errors.password)}
          />
        </Field>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 font-body text-sm text-tinta/70">
            <input
              type="checkbox"
              checked={values.remember}
              onChange={(e) => handleChange('remember', e.target.checked)}
              className="h-4 w-4 rounded border-arcilla text-verde focus:ring-verde"
            />
            Recordarme
          </label>
          <a href="#" className="font-body text-sm text-verde hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-verde px-4 py-3 font-body font-medium text-papel transition hover:bg-verde-light disabled:opacity-60"
        >
          {isSubmitting ? 'Ingresando…' : 'Iniciar sesión'}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-tinta/60">
        ¿No tienes cuenta?{' '}
        <a href="/registro" className="font-medium text-verde hover:underline">
          Regístrate
        </a>
      </p>
    </>
  );
}