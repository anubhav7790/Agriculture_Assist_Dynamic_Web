import { Link } from "react-router-dom";
import Button from "./Button";

export default function CropCard({ listing, isFavorite, onFavorite }) {
  return (
    <article className="crop-card">
      <div className="crop-image-wrap">
        <img src={listing.image} alt={listing.cropName} className="crop-image" />
        <div className="badge-row">
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
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
        <p className="price">Rs. {listing.price}/kg</p>
        <p>{listing.quantity}</p>
        <p>📍 {listing.location}</p>
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
