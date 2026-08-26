
import { useState } from 'react';
import { registroSchema, type RegistroFormData } from '../schema/auth.schema';


type RegistroFormErrors = Partial<Record<keyof RegistroFormData, string>>;

const initialValues: RegistroFormData = {
  nombreCompleto: '',
  email: '',
  password: '',
  confirmPassword: '',
  aceptaTerminos: false,
};

export function useRegistroForm(onSuccess?: (data: RegistroFormData) => void) {
  const [values, setValues] = useState<RegistroFormData>(initialValues);
  const [errors, setErrors] = useState<RegistroFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof RegistroFormData, value: string | boolean) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = registroSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: RegistroFormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegistroFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    // TODO: cuando exista auth real, reemplazar por la llamada al backend
    // (ej. useAuth().registrar(result.data)) — visual-only por ahora
    console.log('Registro (visual-only):', result.data);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    onSuccess?.(result.data);
  }

  return { values, errors, isSubmitting, handleChange, handleSubmit };
}