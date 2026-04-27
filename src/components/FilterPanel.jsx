export default function FilterPanel({ filters, onChange }) {
  return (
    <div className="filter-panel">
      <label className="form-field">
        <span>Location</span>
        <input
          name="location"
          value={filters.location}
          onChange={onChange}
          placeholder="State or city"
        />
      </label>
      <label className="form-field">
        <span>Max Price</span>
        <input
          name="price"
          type="number"
          value={filters.price}
          onChange={onChange}
          placeholder="Rs / kg"
        />
      </label>
      <label className="form-field">
        <span>Min Quantity</span>
        <input
          name="quantity"
          value={filters.quantity}
          onChange={onChange}
          placeholder="eg. 200 kg"
        />
      </label>
    </div>
  );
}
