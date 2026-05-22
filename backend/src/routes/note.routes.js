import { Router } from 'express';
import mongoose from 'mongoose';
import { Note } from '../models/note.model.js';

const router = Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /notes — list all notes (newest first)
router.get('/', async (_req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (err) {
    next(err);
  }
});

// POST /notes — create a new note
router.post('/', async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ success: true, data: note, message: 'Note created' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(err.errors).map((e) => e.message),
      });
    }
    next(err);
  }
});

// DELETE /notes/:id — delete a note by id
router.delete('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid id' });
    }
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }
    res.status(200).json({ success: true, message: 'Note deleted', data: note });
  } catch (err) {
    next(err);
  }
});

export default router;
