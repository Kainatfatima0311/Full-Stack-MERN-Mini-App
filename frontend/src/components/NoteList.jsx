export function NoteList({ notes, onDelete }) {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note._id} className="note-card">
          <div className="note-body">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </div>
          <button
            className="delete-btn"
            onClick={() => onDelete(note._id)}
            aria-label={`Delete ${note.title}`}
            title="Delete"
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
