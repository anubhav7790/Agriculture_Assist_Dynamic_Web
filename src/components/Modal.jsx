export default function Modal({ title, open, onClose, children }) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
