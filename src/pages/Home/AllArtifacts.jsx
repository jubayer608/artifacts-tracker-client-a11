import React, { useEffect, useMemo, useState } from "react";
import ArtifactCard from "../Shared/ArtifactCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdvancedSearch from "../../components/AdvancedSearch";

const AllArtifacts = () => {
  const [allArtifacts, setAllArtifacts] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("likes_desc"); // likes_desc | likes_asc | name_asc | name_desc
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://artifacts-tracker-server-one.vercel.app/artifacts?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (isMounted) setAllArtifacts(Array.isArray(data) ? data : []);
      } catch (_) {
        if (isMounted) setAllArtifacts([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [query]);

  useEffect(() => {
    applyFilters();
  }, [artifacts, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(search.trim());
  };

  const filteredSorted = useMemo(() => {
    let list = [...allArtifacts];
    if (typeFilter !== "all") {
      list = list.filter((a) => (a.type || "").toLowerCase() === typeFilter);
    }
    if (sort === "likes_desc") {
      list.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
    } else if (sort === "likes_asc") {
      list.sort((a, b) => (a.likeCount || 0) - (b.likeCount || 0));
    } else if (sort === "name_asc") {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sort === "name_desc") {
      list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }
    return list;
  }, [allArtifacts, typeFilter, sort]);

  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filteredSorted.slice(start, end);

  return (
    <div className="bg-base-100 py-16 px-6 md:px-20 font-serif min-h-screen">
      <h1 className="text-4xl text-base-content font-bold mb-8 text-center">All Artifacts</h1>

      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSearch} className="mb-6 grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by artifact name..."
            className="input input-bordered w-full"
          />
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }} className="select select-bordered">
            <option value="all">All Types</option>
            <option value="tools">Tools</option>
            <option value="weapons">Weapons</option>
            <option value="documents">Documents</option>
            <option value="writings">Writings</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered">
            <option value="likes_desc">Most Liked</option>
            <option value="likes_asc">Least Liked</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
          </select>
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {loading ? (
          <div className="py-16 flex justify-center"><span className="loading loading-spinner loading-lg" aria-label="Loading" /></div>
        ) : pageItems.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {pageItems.map((artifact) => (
                <ArtifactCard key={artifact._id} artifact={artifact} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="text-sm opacity-70">Showing {start + 1}-{Math.min(end, total)} of {total}</div>
              <div className="join">
                <button className="btn join-item" disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), Math.max(0, currentPage - 3) + 5).map((p) => (
                  <button key={p} className={`btn join-item ${p === currentPage ? 'btn-active' : ''}`} onClick={() => setPage(p)}>{p}</button>
                ))}
                <button className="btn join-item" disabled={currentPage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center opacity-70 py-10">No artifacts found.</p>
        )}
      </div>
    </div>
  );
};

export default AllArtifacts;
