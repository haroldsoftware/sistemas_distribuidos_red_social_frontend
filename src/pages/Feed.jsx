import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import CreatePost from '../components/CreatePost.jsx';
import PostCard from '../components/PostCard.jsx';
import api from '../api/index.js';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/posts')
      .then(({ data }) => setPosts(data))
      .catch(() => setError('No se pudieron cargar los posts'))
      .finally(() => setLoading(false));
  }, []);

  const handleCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert('Error al eliminar el post');
    }
  };

  return (
    <>
      <Navbar />
      <main className="feed-page">
        <CreatePost onCreated={handleCreated} />
        {loading && <p className="state-msg">Cargando posts...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && posts.length === 0 && (
          <p className="state-msg">No hay posts aún. ¡Sé el primero en publicar!</p>
        )}
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </main>
    </>
  );
}
