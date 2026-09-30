import { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";

const TAMANO_MAX_MB = 5;
const DIMENSION_MAX = 400;

interface AvatarUploaderProps {
  fotoActual?: string;
  nombre: string;
  onChange: (base64: string) => void;
}

export function AvatarUploader({ fotoActual, nombre, onChange, }: AvatarUploaderProps) {

  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(fotoActual ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);

    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
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
        const canvas = document.createElement("canvas");
        const escala = Math.min(
          1,
          DIMENSION_MAX / Math.max(img.width, img.height),
        );

        canvas.width = img.width * escala;
        canvas.height = img.height * escala;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL("image/jpeg", 0.8);
        setPreview(base64);
        onChange(base64);

      };

      img.src = reader.result as string;
    };
    
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-verde/15 md:h-28 md:w-28"
      >
        {preview ? (
          <img
            src={preview}
            alt={nombre}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-3xl font-semibold text-verde md:text-4xl">
            {nombre.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="absolute inset-0 flex items-center justify-center bg-tinta/40 opacity-0 transition group-hover:opacity-100">
          <FiCamera className="h-6 w-6 text-white" />
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-xs text-terracota">{error}</p>}
    </div>
  );
}
