import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/authContext';

const socket = io(process.env.REACT_APP_API_BASE_URL, {
  withCredentials: true
});

export default function ProductComments({ productId}) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  // Подключаемся и присоединяемся к комнате продукта
  useEffect(() => {
    if (!productId) return;

    socket.emit('joinProduct', productId);

    socket.on('initialComments', (data) => {
      setComments(data);
    });

    socket.on('newComment', (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    return () => {
      socket.off('initialComments');
      socket.off('newComment');
    };
  }, [productId]);

  // Отправка нового комментария
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

socket.emit('newComment', {
  productId,
  userId: user?.id,
  username: user?.name || user?.username || user?.email || "Гость",
  text,
});

    setText('');
  };

  return (
  <div className="comment-box" style={{ marginTop: '2rem' }}>
    <h3>Комментарии</h3>

    {comments.length === 0 ? (
      <p style={{ color: '#777', fontStyle: 'italic' }}>
        💬 Пока комментариев нет. Будьте первым!
      </p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {comments.map((c, idx) => (
          <li key={c._id || idx} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            <strong>{c.username}</strong> <br />
            <span>{c.text}</span><br />
            <small style={{ color: '#777' }}>{new Date(c.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    )}

    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <textarea
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишите комментарий..."
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button type="submit" style={{ marginTop: '0.5rem' }}>Отправить</button>
    </form>
  </div>
);
}
