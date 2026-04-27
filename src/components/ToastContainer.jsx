import { useAppContext } from "../context/AppContext";

export default function ToastContainer() {
  const { toasts } = useAppContext();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.variant}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
