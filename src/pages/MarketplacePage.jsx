import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SectionHeader from "../components/SectionHeader";
import CropCard from "../components/CropCard";
import FilterPanel from "../components/FilterPanel";
import Loader from "../components/Loader";

export default function MarketplacePage() {
  const { favorites, globalSearch, listings, listingsLoading, profile, text, toggleFavorite } = useAppContext();
  const profileDistrict = useMemo(() => {
    const parts = (profile.address || "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    return profile.district || parts.at(-2) || parts.at(0) || "";
  }, [profile.address, profile.district]);
  const [filters, setFilters] = useState({ crop: "", region: profileDistrict });

  useEffect(() => {
    setFilters((current) => (current.region ? current : { ...current, region: profileDistrict }));
  }, [profileDistrict]);

  const userListings = useMemo(
    () =>
      listings.filter((item) =>
        profile.id ? item.ownerId === profile.id : item.ownerName === profile.name
      ),
    [listings, profile.id, profile.name]
  );

  const filteredListings = useMemo(
    () =>
      listings.filter((item) => {
        const searchText = `${item.cropName} ${item.district || ""} ${item.location}`
          .toLowerCase()
          .includes(globalSearch.toLowerCase());
        const matchesCrop = filters.crop
          ? item.cropName.toLowerCase().includes(filters.crop.toLowerCase())
          : true;
        const listingRegion = `${item.district || ""} ${item.location || ""}`.toLowerCase();
        const matchesRegion = filters.region
          ? listingRegion.includes(filters.region.toLowerCase())
          : true;

        return searchText && matchesCrop && matchesRegion;
      }),
    [filters, globalSearch, listings]
  );

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Marketplace"
        title={text.marketplaceTitle}
        description="Browse local crop listings by district or nearby market, publish available crops, and connect directly with sellers."
        action={
          <Link className="btn btn-primary" to="/marketplace/add">
            Publish Listing
          </Link>
        }
      />

      <FilterPanel
        filters={filters}
        onChange={(event) =>
          setFilters((current) => ({ ...current, [event.target.name]: event.target.value }))
        }
        onClear={() => setFilters({ crop: "", region: "" })}
      />

      {listingsLoading ? (
        <Loader message="Loading crop listings..." />
      ) : (
        <>
          <section className="marketplace-section">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Your Published Listings</p>
                <h2>Manage crops you published</h2>
              </div>
              <Link className="btn btn-secondary" to="/marketplace/add">
                Publish New
              </Link>
            </div>
            {userListings.length === 0 ? (
              <div className="panel empty-state">
                <h3>No published listing yet</h3>
                <p>Publish a crop with clear district, quantity, price, and contact details.</p>
              </div>
            ) : (
              <div className="crop-grid">
                {userListings.map((listing) => (
                  <CropCard
                    key={listing.id}
                    listing={listing}
                    isFavorite={favorites.includes(listing.id)}
                    onFavorite={toggleFavorite}
                    ownerLabel="Your listing"
                  />
                ))}
              </div>
            )}
          </section>

          <section className="marketplace-section">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Regional Marketplace</p>
                <h2>{filters.region ? `${filters.region} crop listings` : "All crop listings"}</h2>
              </div>
              <span className="marketplace-count">{filteredListings.length} active</span>
            </div>
            {filteredListings.length === 0 ? (
              <div className="panel empty-state">
                <h3>No matching listings found</h3>
                <p>Try another crop or district, or publish the first listing for this area.</p>
              </div>
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
          </section>
        </>
      )}
    </div>
  );
}
