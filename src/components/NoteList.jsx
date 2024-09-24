import React from 'react';
import Note from './Note';

const NoteList = ({ notes, deleteNote, editNote }) => {
  return (
    <div className="row justify-content-center">
      {notes.map((note, index) => (
        <Note
          key={index}
          index={index}
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