// features/auth/hooks/useLoginForm.ts
import { useState } from "react";
import { loginSchema, type LoginFormData } from "../schema/auth.schema";
import { useAuthStore } from "../store/authStore";
import { loginUsuario } from "../services/auth.services";

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

const initialValues: LoginFormData = {
  email: "",
  password: "",
  remember: false,
};

export function useLoginForm(onSuccess?: (data: LoginFormData) => void) {
  const [values, setValues] = useState<LoginFormData>(initialValues);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof LoginFormData, value: string | boolean) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: LoginFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    // TODO: reemplazar por la llamada real de auth cuando exista
    try {
      const user = await loginUsuario(result.data);
      useAuthStore.getState().setUser(user);
      onSuccess?.(result.data);
    } catch (err) {
      setErrors({
        email:
          err instanceof Error
            ? err.message
            : "Correo o contraseña incorrectos",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}
