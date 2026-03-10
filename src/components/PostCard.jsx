import { useAuth } from '../context/AuthContext.jsx';

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const isOwn = user?._id === post.author?._id;

  const formattedDate = new Date(post.createdAt).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const initial = (post.author?.username?.[0] ?? '?').toUpperCase();

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <div className="avatar">{initial}</div>
          <div className="post-author-info">
            <strong>{post.author?.username ?? 'Desconocido'}</strong>
            <time>{formattedDate}</time>
          </div>
        </div>
        {isOwn && (
          <button className="btn btn-danger" onClick={() => onDelete(post._id)}>
            Eliminar
          </button>
        )}
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  );
}
