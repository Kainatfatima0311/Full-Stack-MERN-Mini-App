import { useEffect, useState } from 'react';
import { NoteForm } from './components/NoteForm.jsx';
import { NoteList } from './components/NoteList.jsx';
import { fetchNotes, createNote, deleteNote } from './api.js';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetchNotes();
      setNotes(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load notes. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (payload) => {
    try {
      setError('');
      const res = await createNote(payload);
      setNotes((prev) => [res.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add note');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      setError('');
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete note');
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1>📝 Notes</h1>
        <p className="subtitle">Assignment 3 — Full-Stack MERN Mini App</p>
      </header>

      <NoteForm onSubmit={handleAdd} />

      {error && <div className="alert error">{error}</div>}

      {loading ? (
        <div className="status">Loading notes…</div>
      ) : notes.length === 0 ? (
        <div className="status">No notes yet — add your first one above.</div>
      ) : (
        <NoteList notes={notes} onDelete={handleDelete} />
      )}

      <footer className="footer">
        <small>{notes.length} note{notes.length === 1 ? '' : 's'} • Backend: localhost:5000</small>
      </footer>
    </main>
  );
}
