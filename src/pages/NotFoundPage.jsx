import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="panel">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="btn btn-primary" to="/dashboard">
        Return to Dashboard
      </Link>
    </section>
  );
}
