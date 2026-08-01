export default function FilterPanel({ filters, onChange, onClear }) {
  return (
    <div className="filter-panel marketplace-search-panel">
      <label className="form-field">
        <span>Search Crop</span>
        <input
          name="crop"
          value={filters.crop}
          onChange={onChange}
          placeholder="Tomato, wheat, onion"
        />
      </label>
      <label className="form-field">
        <span>Search District / Location</span>
        <input
          name="region"
          value={filters.region}
          onChange={onChange}
          placeholder="District, village, or mandi"
        />
      </label>
      <button type="button" className="btn btn-secondary marketplace-clear-btn" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}
