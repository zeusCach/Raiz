import { useRegistroForm } from "../hooks/useRegisterForm";


export function RegisterForm() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useRegistroForm();

  return (
    <>
      <p className="mb-2 font-body text-sm font-medium uppercase tracking-wide text-verde">
        Raíz · Felipe Carrillo Puerto
      </p>
      <h1 className="mb-2 font-display text-3xl text-tinta sm:text-4xl">Crea tu cuenta</h1>
      <p className="mb-8 font-body text-sm text-tinta/60">
        Súmate a tu comunidad: comparte reuniones, colabora y apoya causas locales.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Field label="Nombre completo" error={errors.nombreCompleto}>
          <input
            type="text"
            value={values.nombreCompleto}
            onChange={(e) => handleChange('nombreCompleto', e.target.value)}
            placeholder="Tu nombre"
            className={inputClass(!!errors.nombreCompleto)}
          />
        </Field>

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
            placeholder="Mínimo 8 caracteres"
            className={inputClass(!!errors.password)}
          />
        </Field>

        <Field label="Confirmar contraseña" error={errors.confirmPassword}>
          <input
            type="password"
            value={values.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Repite tu contraseña"
            className={inputClass(!!errors.confirmPassword)}
          />
        </Field>

        <label className="flex items-start gap-2 font-body text-sm text-tinta/70">
          <input
            type="checkbox"
            checked={values.aceptaTerminos}
            onChange={(e) => handleChange('aceptaTerminos', e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-arcilla text-verde focus:ring-verde"
          />
          <span>
            Acepto los términos y el aviso de privacidad de Raíz.
            {errors.aceptaTerminos && (
              <span className="mt-1 block text-xs text-terracota">{errors.aceptaTerminos}</span>
            )}
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-verde px-4 py-3 font-body font-medium text-papel transition hover:bg-verde-light disabled:opacity-60"
        >
          {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-6 text-center font-body text-sm text-tinta/60">
        ¿Ya tienes cuenta?{' '}
        <a href="/login" className="font-medium text-verde hover:underline">
          Inicia sesión
        </a>
      </p>
    </>
  );
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-xl border bg-papel px-4 py-2.5 font-body text-tinta placeholder:text-tinta/40',
    'focus:outline-none focus:ring-2 focus:ring-verde/50',
    hasError ? 'border-terracota' : 'border-arcilla',
  ].join(' ');
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-body text-sm font-medium text-tinta/80">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-terracota">{error}</p>}
    </div>
  );
}