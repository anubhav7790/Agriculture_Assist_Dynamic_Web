import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";

export default function ListingDetailsPage() {
  const { listingId } = useParams();
  const { deleteListing, listings, profile, showToast } = useAppContext();
  const listing = listings.find((item) => item.id === listingId);

  const handleMarkSold = async () => {
    const confirmed = window.confirm(
      "Are you sure this crop is sold? This will permanently remove the listing from the marketplace database."
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteListing(listingId);
      window.history.back();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  if (!listing) {
    return (
      <div className="page-stack">
        <SectionHeader eyebrow="Marketplace" title="Listing not found" description="This crop listing may have been removed or is unavailable." />
      </div>
    );
  }

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Listing Details"
        title={listing.cropName}
        description="Buyers can review details here and contact the farmer directly."
      />
      <section className="listing-detail">
        <img src={listing.image} alt={listing.cropName} className="listing-detail-image" />
        <div className="panel">
          <p className="price">Rs. {listing.price}/kg</p>
          <p>
            <strong>Quantity:</strong> {listing.quantityKg ? `${listing.quantityKg} kg` : listing.quantity}
          </p>
          <p>
            <strong>District:</strong> {listing.district || "Not specified"}
          </p>
          <p>
            <strong>Location:</strong> {listing.location}
          </p>
          <p>
            <strong>Description:</strong> {listing.description}
          </p>
          <p>
            <strong>Contact:</strong> {listing.phone}
          </p>
          <div className="inline-links">
            <a className="btn btn-primary" href={`tel:${listing.phone}`}>
              Call Now
            </a>
            <a
              className="btn btn-secondary"
              href={`https://wa.me/${listing.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <Link className="btn btn-secondary" to="/marketplace">
              Back to Listings
            </Link>
            {listing.ownerId === profile.id || listing.ownerName === profile.name ? (
              <Button variant="secondary" onClick={handleMarkSold}>
                Mark as Sold
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
