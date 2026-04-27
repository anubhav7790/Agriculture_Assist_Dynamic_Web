export default function Loader({ message = "Loading..." }) {
  return (
    <div className="loader">
      <div className="loader-ring" />
      <p>{message}</p>
    </div>
  );
}
