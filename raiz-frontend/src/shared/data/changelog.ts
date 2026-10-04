// shared/data/changelog.ts
export interface ChangelogEntry {
  version: string;
  titulo: string;
  items: string[];
}

// La entrada más reciente va primero — es la que se muestra en la ventana.
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: 'v0.7.0',
    titulo: 'Guardados y notificación de novedades',
    items: [
      'Ahora puedes guardar publicaciones para verlas después',
      'Ahora puedes seguir a tu red, añade amigos, conecta con tu gente',
      'Ahora puedes editar y eliminar tus post',
    ],
  },
];