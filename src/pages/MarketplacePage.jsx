import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import CropCard from "../components/CropCard";
import FilterPanel from "../components/FilterPanel";
import Loader from "../components/Loader";

export default function MarketplacePage() {
  const { favorites, globalSearch, listings, listingsLoading, text, toggleFavorite } = useAppContext();
  const [filters, setFilters] = useState({ location: "", price: "", quantity: "" });

  const filteredListings = useMemo(
    () =>
      listings.filter((item) => {
        const matchesSearch = `${item.cropName} ${item.location}`
          .toLowerCase()
          .includes(globalSearch.toLowerCase());
        const matchesLocation = filters.location
          ? item.location.toLowerCase().includes(filters.location.toLowerCase())
          : true;
        const matchesPrice = filters.price ? Number(item.price) <= Number(filters.price) : true;
        const numericQuantity = parseInt(item.quantity, 10);
        const filterQuantity = parseInt(filters.quantity, 10);
        const matchesQuantity = filters.quantity ? numericQuantity >= filterQuantity : true;

        return matchesSearch && matchesLocation && matchesPrice && matchesQuantity;
      }),
    [filters, globalSearch, listings]
  );

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Marketplace"
        title={text.marketplaceTitle}
        description="Farmers can publish listings and buyers can connect directly using phone or WhatsApp."
        action={
          <Link className="btn btn-primary" to="/marketplace/add">
            Add Listing
          </Link>
        }
      />

      <FilterPanel
        filters={filters}
        onChange={(event) =>
          setFilters((current) => ({ ...current, [event.target.name]: event.target.value }))
        }
      />

      {listingsLoading ? (
        <Loader message="Loading crop listings..." />
      ) : (
        <div className="crop-grid">
          {filteredListings.map((listing) => (
            <CropCard
              key={listing.id}
              listing={listing}
              isFavorite={favorites.includes(listing.id)}
              onFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
