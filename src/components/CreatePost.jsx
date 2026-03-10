import { useState } from 'react';
import api from '../api/index.js';

const MAX = 280;

export default function CreatePost({ onCreated }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/posts', { content });
      onCreated(data);
      setContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al publicar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h3>¿Qué estás pensando?</h3>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            placeholder="Escribe algo..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={MAX}
            rows={3}
          />
          <p className={`char-count ${content.length > MAX - 20 ? 'over' : ''}`}>
            {content.length}/{MAX}
          </p>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading || !content.trim() || content.length > MAX}
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
}
