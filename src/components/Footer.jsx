import { useAppContext } from "../context/AppContext";

export default function Footer() {
  const { text } = useAppContext();

  return (
    <footer className="footer">
      <div className="footer-copy">
        <h3>Krishi Vikas</h3>
        <p>{text.footerDescription}</p>
      </div>
      <p className="footer-note">{text.footerNote}</p>
    </footer>
  );
}
