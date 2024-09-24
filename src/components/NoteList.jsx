import React from 'react';
import Note from './Note';

const NoteList = ({ notes, deleteNote, editNote }) => {
  return (
    <div className="row justify-content-center">
      {notes.map((note) => (
        <Note
          key={note.id} // Usar id único como key
          id={note.id}  // Pasar el id a Note
          title={note.title}
          content={note.content}
          color={note.color}
          deleteNote={deleteNote}
          editNote={editNote}
        />
      ))}
    </div>
  );
};

export default NoteList;
