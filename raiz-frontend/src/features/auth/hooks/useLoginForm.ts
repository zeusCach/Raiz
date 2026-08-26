// features/auth/hooks/useLoginForm.ts
import { useState } from 'react';
import { loginSchema, type LoginFormData } from '../schema/auth.schema';

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

const initialValues: LoginFormData = {
  email: '',
  password: '',
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
    console.log('Login (visual-only):', result.data);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    onSuccess?.(result.data);
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}