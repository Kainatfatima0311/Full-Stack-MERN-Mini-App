import axios from 'axios';

// Backend URL — read from env or default to assignment spec (port 5000)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchNotes = () => api.get('/notes').then((r) => r.data);
export const createNote = (payload) => api.post('/notes', payload).then((r) => r.data);
export const deleteNote = (id) => api.delete(`/notes/${id}`).then((r) => r.data);
