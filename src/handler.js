const { nanoid } = require('nanoid');

const notes = [];


const addNoteHandler = (req, res) => {
  try {
    const { title, body, tags } = req.body;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const newNote = {
      id: id,
      title,
      tags,
      createdAt,
      updatedAt,
      body,
    };

    notes.push(newNote);
    res.status(201).json({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      notes: newNote,
    });
    return;
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      status: 'error',
      message: 'Catatan gagal ditambahkan',
      error: error.message,
    });
  }
};

const getAllNotesHandler = (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'Menampilkan semua catatan',
      data: {
        notes,
      }
    });

  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      status: 'error',
      message: 'Catatan gagal ditampilkan',
      error: error.message,
    });
  }
};

const getNotesByIdHandler = (req, res) => {
  try {
    const { id } = req.params;
    const note = notes.filter((note) => note.id === id)[0];
    if (note) {
      res.status(200).json({
        status: 'success',
        data: {
          note,
        },
      });
      return;
    }

    res.status(500).json({
      status: 'error',
      message: 'Catatan gagal ditampilkan. Id catatan tidak ditemukan',
    });

  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      status: 'error',
      message: 'Catatan gagal ditampilkan',
      error: error.message,
    });
  }
};

const updateNoteByIdHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, tags } = req.body;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);
    if (index === -1) {
      res.status(500).json({
        status: 'error',
        message: 'Catatan gagal diperbarui. Id catatan tidak ditemukan',
      });
      return;
    }

    notes[index] = {
      ...notes[index],
      title,
      tags,
      updatedAt,
      body,
    };
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
      data: notes[index],
    });
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      status: 'error',
      message: 'Catatan gagal diperbarui',
      error: error.message,
    });
  }
};

const deleteNoteByIdHandler = (req, res) => {
  try {
    const { id } = req.params;
    const index = notes.findIndex((note) => note.id === id);
    if (index === -1) {
      res.status(500).json({
        status: 'error',
        message: 'Catatan gagal dihapus. Id catatan tidak ditemukan',
      });
      return;
    }

    notes.splice(index, 1);
    res.status(200).json({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      status: 'error',
      message: 'Catatan gagal dihapus',
      error: error.message,
    });
  }
};


module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  updateNoteByIdHandler,
  deleteNoteByIdHandler,
};