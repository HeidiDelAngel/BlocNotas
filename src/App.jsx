import React, { useState } from 'react';
import NoteList from './components/NoteList';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [noteColor, setNoteColor] = useState('#fdf4ca');

  const addNote = () => {
    if (noteTitle && noteInput) {
      const newNote = {
        id: Date.now(), // Generar un id único
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

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  };  

  const editNote = (id, updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };  

   // Obtener el año actual dinámicamente
   const currentYear = new Date().getFullYear();

  return (
    <div className="App">
      <header>
        <h1>Bloc de Notas</h1>
      </header>
      
      {/* Input para el título de la nota */}
      <input
        type="text"
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        placeholder="Título de la nota"
      />

      {/* Mostrar el campo de contenido y selector de color solo si el título no está vacío */}
      {noteTitle && (
        <>
          <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Escribe una nota..."
          rows="1" // Número de filas visibles
          style={{ width: '20%' }} // Para que ocupe todo el ancho disponible
        />
          <input
            type="color"
            value={noteColor}
            onChange={(e) => setNoteColor(e.target.value)}
          />
        </>
      )}

      <button onClick={addNote}>Agregar Nota</button>

      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} />

      <footer>
        <p>Copyright ⓒ {currentYear}</p> {/* año mostrado dinamicamente */}
      </footer>
    </div>
  );
};

export default App;
