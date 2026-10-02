import { FiX } from 'react-icons/fi';

// eslint-disable-next-line react-refresh/only-export-components
export const BANCO_BANNERS = [
  'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500043357865-c6b8827edf10?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop',
];

interface BannerPickerProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function BannerPicker({ onSelect, onClose }: BannerPickerProps) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-tinta/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-papel p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-tinta">Elige un banner</h3>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-arcilla/30">
            <FiX className="h-5 w-5 text-tinta/60" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {BANCO_BANNERS.map((url, i) => (
            <button
              key={url}
              onClick={() => {
                onSelect(url);
                onClose();
              }}
              className="aspect-video overflow-hidden rounded-lg border-2 border-transparent transition hover:border-verde"
            >
              <img src={url} alt={`Banner ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}