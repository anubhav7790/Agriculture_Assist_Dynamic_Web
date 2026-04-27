export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="search-bar">
      <span>🔎</span>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}
