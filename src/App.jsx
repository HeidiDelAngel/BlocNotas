import React, { useState } from 'react';
import NoteList from './components/NoteList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [noteColor, setNoteColor] = useState('#fdf4ca');

  const addNote = () => {
    if (noteTitle && noteInput) {
      const newNote = { 
        id: Date.now(),  // Genera un ID único basado en el tiempo
        title: noteTitle, 
        content: noteInput, 
        color: noteColor 
      };
      setNotes([...notes, newNote]);
      setNoteTitle('');
      setNoteInput('');
      setNoteColor('#fdf4ca');
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const editNote = (index, newNote) => {
    const updatedNotes = notes.map((note, i) => (i === index ? newNote : note));
    setNotes(updatedNotes);
  };

   // Obtener el año actual dinámicamente
   const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <header>
        <h1 style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Bloc de Notas</h1>
      </header>
      
      {/* Input para el título de la nota */}
      <input
        type="text"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Título de la nota"
        style={{ width: '20%', marginBottom: '20px' }}
      />

      {/* Mostrar el campo de contenido y selector de color solo si el título no está vacío */}
      {noteTitle && (
        <>
          <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Escribe una nota..."
          rows="1"
          style={{ width: '20%', marginRight: '20px' }}
        />
          <label>Seleccionar color:&nbsp;&nbsp;</label>
          <input
            type="color"
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
            style={{ marginRight: '20px' }}
          />
        </>
      )}

      <button onClick={addNote} className="btn btn-primary">Agregar Nota</button>

      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} />

      <footer>
        <p>Copyright ⓒ {currentYear}</p> {/* año mostrado dinamicamente */}
      </footer>
    </div>
  );
};

export default App;