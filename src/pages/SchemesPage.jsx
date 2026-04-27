import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { fetchSchemes } from "../services/api";
import SectionHeader from "../components/SectionHeader";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

export default function SchemesPage() {
  const { schemes } = useAppContext();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSchemes(schemes).then(() => {
      if (active) {
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [schemes]);

  const filteredSchemes = useMemo(
    () =>
      schemes.filter((scheme) =>
        `${scheme.name} ${scheme.state} ${scheme.eligibility}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [schemes, search]
  );

  return (
    <div className="page-stack">
      <SectionHeader
        eyebrow="Government Support"
        title="Government Schemes"
        description="Search support programs, review eligibility, and get a basic application checklist."
      />
      <SearchBar
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search schemes or eligibility"
      />
      {loading ? (
        <Loader message="Loading schemes..." />
      ) : (
        <div className="scheme-grid">
          {filteredSchemes.map((scheme) => (
            <article className="panel scheme-card" key={scheme.id}>
              <h3>{scheme.name}</h3>
              <p className="scheme-state">{scheme.state}</p>
              <p>
                <strong>Benefit:</strong> {scheme.benefit}
              </p>
              <p>
                <strong>Eligibility:</strong> {scheme.eligibility}
              </p>
              <p>
                <strong>Application Guide:</strong> {scheme.guide}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
