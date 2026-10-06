// features/postCultura/components/ImageUploader.tsx
import { useRef, useState } from 'react';
import { FiImage, FiX } from 'react-icons/fi';

const TAMANO_MAX_MB = 5;
const DIMENSION_MAX = 1000;

interface ImageUploaderProps {
  imagenActual?: string;
  onChange: (base64: string | null) => void;
}

export function ImageUploader({ imagenActual, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(imagenActual ?? '');
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (!file.type.startsWith('image/')) {
      setError('Selecciona un archivo de imagen válido.');
      return;
    }
    if (file.size > TAMANO_MAX_MB * 1024 * 1024) {
      setError(`La imagen no debe superar ${TAMANO_MAX_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const escala = Math.min(1, DIMENSION_MAX / Math.max(img.width, img.height));
        canvas.width = img.width * escala;
        canvas.height = img.height * escala;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        setPreview(base64);
        onChange(base64);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function quitarImagen() {
    setPreview('');
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <label className="text-sm font-medium text-tinta">Imagen (opcional)</label>

      {preview ? (
        <div className="relative mt-1">
          <img src={preview} alt="Vista previa" className="h-48 w-full rounded-xl object-cover" />
          <button
            type="button"
            onClick={quitarImagen}
            className="absolute right-2 top-2 rounded-full bg-tinta/60 p-1.5 text-white hover:bg-tinta/80"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-1 flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-arcilla bg-white/40 py-8 text-sm text-tinta/50 hover:bg-white/60"
        >
          <FiImage className="h-6 w-6" />
          Toca para subir una imagen
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="mt-1 text-xs text-terracota">{error}</p>}
    </div>
  );
}