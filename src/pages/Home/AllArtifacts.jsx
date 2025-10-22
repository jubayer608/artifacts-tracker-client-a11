import React, { useEffect, useMemo, useState } from "react";
import ArtifactCard from "../Shared/ArtifactCard";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [serverPagination, setServerPagination] = useState(true);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const [field, direction] = sortBy.split("-");
    setLoading(true);
    fetch(
      `https://artifacts-tracker-server-one.vercel.app/artifacts?search=${encodeURIComponent(
        query
      )}&sort=${field}&order=${direction}&page=${page}&limit=${pageSize}`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Fallback if API returns plain array
          setServerPagination(false);
          setArtifacts(data);
          setTotal(data.length);
        } else {
          setServerPagination(true);
          setArtifacts(data.items || []);
          setTotal(data.total || 0);
        }
      })
      .catch(() => {
        setArtifacts([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [query, sortBy, page, pageSize]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setQuery(search.trim());
  };

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize]);

  const displayedArtifacts = useMemo(() => {
    if (serverPagination) return artifacts;
    const [field, direction] = sortBy.split("-");
    const sorted = [...artifacts].sort((a, b) => {
      const va = (a?.[field] ?? "").toString().toLowerCase();
      const vb = (b?.[field] ?? "").toString().toLowerCase();
      if (field === "likeCount") {
        return (Number(a.likeCount || 0) - Number(b.likeCount || 0)) * (direction === "asc" ? 1 : -1);
      }
      if (field === "createdAt") {
        return va.localeCompare(vb) * (direction === "asc" ? 1 : -1);
      }
      return va.localeCompare(vb) * (direction === "asc" ? 1 : -1);
    });
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [artifacts, serverPagination, sortBy, page, pageSize]);

  return (
    <div className="bg-[#fdf6e3] dark:bg-slate-900 py-16 px-6 md:px-20 font-serif min-h-screen">
      <h1 className="text-4xl text-[#5d4634] dark:text-[#e5ddca] font-bold mb-8 text-center">
        All Artifacts
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by artifact name..."
          className="w-full px-4 py-2 rounded-lg border border-[#c8b8a5] focus:outline-none focus:ring-2 focus:ring-[#5d4634] bg-white dark:bg-slate-800 dark:text-gray-100"
        />
        <button
          type="submit"
          className="bg-[#5d4634] text-[#fdf6e3] px-5 py-2 rounded-lg hover:bg-[#4b3727] transition"
        >
          Search
        </button>
        <select
          value={sortBy}
          onChange={(e) => {
            setPage(1);
            setSortBy(e.target.value);
          }}
          className="px-3 py-2 rounded-lg border border-[#c8b8a5] bg-white dark:bg-slate-800 dark:text-gray-100"
          aria-label="Sort artifacts"
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="createdAt-desc">Newest First</option>
          <option value="likeCount-desc">Most Liked</option>
        </select>
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg text-warning"></span>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {(displayedArtifacts.length > 0) ? (
            displayedArtifacts.map((artifact) => (
              <ArtifactCard key={artifact._id} artifact={artifact} />
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">
              No artifacts found.
            </p>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <span>
            Page {page} of {totalPages}
          </span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPage(1);
              setPageSize(Number(e.target.value));
            }}
            className="px-2 py-1 rounded border border-[#c8b8a5] bg-white dark:bg-slate-800 dark:text-gray-100"
          >
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
          <span>per page</span>
        </div>
        <div className="join">
          <button className="join-item btn" onClick={() => setPage(1)} disabled={page === 1}>
            « First
          </button>
          <button className="join-item btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            ‹ Prev
          </button>
          <button className="join-item btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next ›
          </button>
          <button className="join-item btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
            Last »
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllArtifacts;
