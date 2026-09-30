import { useParams } from 'react-router-dom';
import { PostForm } from '../../postCultura/components/postCard/PostFrom';

export function ComunidadPublicarPage() {
  const { id } = useParams<{ id: string }>();
  return <PostForm comunidadId={id} />;
}