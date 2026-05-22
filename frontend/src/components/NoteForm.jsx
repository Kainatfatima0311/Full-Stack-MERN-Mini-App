import { useState } from 'react';

export function NoteForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    await onSubmit({ title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
    setSubmitting(false);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={120}
      />
      <textarea
        placeholder="Write your note here…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
        maxLength={2000}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add Note'}
      </button>
    </form>
  );
}
