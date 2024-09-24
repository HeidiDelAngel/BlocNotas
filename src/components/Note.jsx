import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Note = ({ title, content, color, index, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [newColor, setNewColor] = useState(color);
  const [isMinimized, setIsMinimized] = useState(false); // Nuevo estado para minimizar/maximizar

  const handleEdit = () => {
    if (newTitle && newContent) {
      editNote(index, { title: newTitle, content: newContent, color: newColor });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewTitle(title);
    setNewContent(content);
    setNewColor(color);
  };

  const handleDelete = () => {
    if (window.confirm("¿Está seguro de que desea eliminar esta nota?")) {
      deleteNote(index);
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
  
  // Función para calcular la luminosidad del color
  const isDarkColor = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;  // Si el brillo es menor que 128, es un color oscuro
  };

  const textColor = isDarkColor(newColor) ? '#FFFFFF' : '#000000'; // Blanco si el color es oscuro, negro si es claro

  return (
    <div className="col-sm-4 mb-3">
      <div className="card" style={{ backgroundColor: color }}>
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 className="card-title" style={{ backgroundColor: titleColor, color: textColor, cursor: 'default' }}>
              {title}
            </h5>
            <span onClick={() => setIsMinimized(!isMinimized)} style={{ backgroundColor: titleColor, cursor: 'pointer', color: textColor }}>
              &nbsp;&nbsp;{isMinimized ? '+' : '-'}&nbsp;&nbsp;
            </span>
          </div>
          {!isMinimized && (
            <>
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
                  <div className="d-flex justify-content-between">
                    <button onClick={handleEdit} className="btn btn-primary">Guardar</button>
                    <button onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="card-text" style={{ color: textColor }}>
                    {newContent.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <button onClick={() => setIsEditing(true)} className="btn btn-secondary" style={{ marginRight: '20px' }}>Editar</button>
                  <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
