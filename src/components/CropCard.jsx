import { Link } from "react-router-dom";

export default function CropCard({ listing, isFavorite, onFavorite, ownerLabel = "" }) {
  return (
    <article className="crop-card">
      <div className="crop-image-wrap">
        <img src={listing.image} alt={listing.cropName} className="crop-image" />
        <div className="badge-row">
          {ownerLabel ? <span className="badge">{ownerLabel}</span> : null}
          {listing.tags?.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="crop-content">
        <div className="crop-topline">
          <h3>{listing.cropName}</h3>
          <button className="favorite-btn" onClick={() => onFavorite(listing.id)}>
            {isFavorite ? "Saved" : "Save"}
          </button>
        </div>
        <p className="price">Rs. {listing.price}/kg</p>
        <p>{listing.quantityKg ? `${listing.quantityKg} kg available` : listing.quantity}</p>
        <p>{listing.district ? `${listing.district} district` : listing.location}</p>
        <p>{listing.location}</p>
        <div className="card-actions">
          <a className="btn btn-secondary" href={`tel:${listing.phone}`}>
            Contact
          </a>
          <Link className="btn btn-primary" to={`/marketplace/${listing.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
