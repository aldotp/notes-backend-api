const router = require('express').Router();
const { addNoteHandler, getAllNotesHandler, getNotesByIdHandler, updateNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

// add new notes
router.post('/notes', addNoteHandler);
// get all notes
router.get('/notes', getAllNotesHandler);
// get notes by id
router.get('/notes/:id', getNotesByIdHandler);
// update notes by id
router.put('/notes/:id', updateNoteByIdHandler);
// delete notes by id
router.delete('/notes/:id', deleteNoteByIdHandler);

module.exports = router;


