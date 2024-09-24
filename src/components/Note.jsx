import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Note = ({ title, content, color, id, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newColor, setNewColor] = useState(color);

  const handleEdit = () => {
    if (newTitle && newContent) {
      editNote(id, { title: newTitle, content: newContent, color: newColor });
      setIsEditing(false);
    }
  };

  const darkenColor = (hex, percent) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const r = (num >> 16) + amt;
    const g = ((num >> 8) & 0x00FF) + amt;
    const b = (num & 0x0000FF) + amt;
    return `#${(0x1000000 + (r < 255 ? r < 1 ? 0 : r : 255) * 0x10000 + (g < 255 ? g < 1 ? 0 : g : 255) * 0x100 + (b < 255 ? b < 1 ? 0 : b : 255)).toString(16).slice(1)}`;
  };

  const titleColor = darkenColor(color, -20);

  return (
    <div className="col-sm-6 mb-3">
      <div className="card" style={{ backgroundColor: color }}>
        <div className="card-body">
          {isEditing ? (
            <>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Título"
                className="form-control mb-2"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows="5"
                className="form-control mb-2"
              />
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="form-control mb-2"
              />
              <button onClick={handleEdit} className="btn btn-primary">Guardar</button>
            </>
          ) : (
            <>
              <h5 className="card-title" style={{ backgroundColor: titleColor }}>{title}</h5>
              <p className="card-text">
                {newContent.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <button onClick={() => setIsEditing(true)} className="btn btn-secondary">Editar</button>
              <button onClick={() => deleteNote(id)} className="btn btn-danger">Eliminar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
