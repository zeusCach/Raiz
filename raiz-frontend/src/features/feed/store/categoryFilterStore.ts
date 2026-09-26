import { create } from 'zustand';
import type { TipoPost } from '../../postCultura/schema/post.schema';

interface CategoryFilterState {
  tipo: TipoPost | null; // null = "Inicio", sin filtro
  setTipo: (tipo: TipoPost | null) => void;
}

export const useCategoryFilterStore = create<CategoryFilterState>((set) => ({
  tipo: null,
  setTipo: (tipo) => set({ tipo }),
}));