import React from "react";
import "../css/customModal.css";

export const CustomModal = ({ isOpen, onClose, children, title = "Formulario" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header>
          <h2>{title}</h2>
        </header>
        {children}
      </div>
    </div>
  );
};
