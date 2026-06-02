"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown } from "lucide-react";

interface Client {
  slug: string;
  email: string;
  phone: string;
  theme: string;
  status: "Active" | "Pending";
  created_at: string;
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/admin/clients", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch clients: ${response.statusText}`);
      }

      const data = await response.json();
      setClients(data.clients || []);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Gagal mengambil data klien";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = clients
    .filter((client) => {
      // 1. Filter status
      if (filter !== "all" && client.status.toLowerCase() !== filter) return false;

      // 2. Filter search term (slug, email, atau phone)
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        return (
          client.slug.toLowerCase().includes(term) ||
          client.email.toLowerCase().includes(term) ||
          client.phone.includes(term)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // 3. Sort by created_at
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-sakura-primary-dark mb-2">
          Dashboard Admin
        </h2>
        <p className="text-sakura-charcoal-muted">
          Kelola semua klien dan RSVP undangan pernikahan digital
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs p-6 rounded-2xl">
          <h3 className="text-xs font-bold text-sakura-charcoal-muted/80 uppercase tracking-wide">
            Total Klien
          </h3>
          <p className="text-3xl font-serif font-bold text-sakura-charcoal mt-2">
            {clients.length}
          </p>
        </div>
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs p-6 rounded-2xl">
          <h3 className="text-xs font-bold text-sakura-charcoal-muted/80 uppercase tracking-wide">
            Klien Aktif
          </h3>
          <p className="text-3xl font-serif font-bold text-emerald-600 mt-2">
            {clients.filter((c) => c.status === "Active").length}
          </p>
        </div>
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs p-6 rounded-2xl">
          <h3 className="text-xs font-bold text-sakura-charcoal-muted/80 uppercase tracking-wide">
            Menunggu Pembayaran
          </h3>
          <p className="text-3xl font-serif font-bold text-amber-600 mt-2">
            {clients.filter((c) => c.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Controls: Filter, Search, and Sort */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Status Filter */}
        <div className="flex gap-2">
          {(["all", "active", "pending"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                filter === status
                  ? "bg-sakura-primary text-white hover:bg-sakura-primary-dark shadow-md shadow-sakura-primary/20"
                  : "bg-white text-sakura-charcoal border border-sakura-primary-light/40 hover:bg-sakura-bg"
              }`}
            >
              {status === "all"
                ? "Semua"
                : status === "active"
                  ? "Aktif"
                  : "Menunggu"}
            </button>
          ))}
        </div>

        {/* Right: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-sakura-charcoal-muted absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari slug, email, telp..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-4 py-2 bg-white border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all text-sakura-charcoal placeholder-sakura-charcoal-muted/50"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center">
            <ArrowUpDown className="w-4 h-4 text-sakura-charcoal-muted absolute left-3 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
              className="w-full sm:w-40 pl-9 pr-8 py-2 bg-white border border-sakura-primary-light/40 rounded-xl text-sm focus:outline-none focus:border-sakura-primary focus:ring-1 focus:ring-sakura-primary transition-all text-sakura-charcoal cursor-pointer appearance-none"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
            {/* Custom select arrow indicator */}
            <div className="pointer-events-none absolute right-3 flex items-center text-sakura-charcoal-muted">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl">
          <p className="text-rose-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <p className="text-sakura-charcoal-muted font-medium">Memuat data klien...</p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredClients.length > 0 && (
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-sakura-bg-dark/40 px-6 py-3.5 text-left text-xs font-bold text-sakura-primary-dark uppercase tracking-wider border-b border-sakura-primary-light/20">
                    Slug
                  </th>
                  <th className="bg-sakura-bg-dark/40 px-6 py-3.5 text-left text-xs font-bold text-sakura-primary-dark uppercase tracking-wider border-b border-sakura-primary-light/20">
                    Email
                  </th>
                  <th className="bg-sakura-bg-dark/40 px-6 py-3.5 text-left text-xs font-bold text-sakura-primary-dark uppercase tracking-wider border-b border-sakura-primary-light/20">
                    Telepon
                  </th>
                  <th className="bg-sakura-bg-dark/40 px-6 py-3.5 text-left text-xs font-bold text-sakura-primary-dark uppercase tracking-wider border-b border-sakura-primary-light/20">
                    Tema
                  </th>
                  <th className="bg-sakura-bg-dark/40 px-6 py-3.5 text-left text-xs font-bold text-sakura-primary-dark uppercase tracking-wider border-b border-sakura-primary-light/20">
                    Status
                  </th>
                  <th className="bg-sakura-bg-dark/40 px-6 py-3.5 text-left text-xs font-bold text-sakura-primary-dark uppercase tracking-wider border-b border-sakura-primary-light/20">
                    Dibuat
                  </th>
                  <th className="bg-sakura-bg-dark/40 px-6 py-3.5 text-left text-xs font-bold text-sakura-primary-dark uppercase tracking-wider border-b border-sakura-primary-light/20">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr
                    key={client.slug}
                    className="hover:bg-sakura-bg/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap border-b border-sakura-primary-light/10">
                      <code className="text-xs bg-sakura-bg border border-sakura-primary-light/35 px-2 py-1 rounded-lg text-sakura-primary-dark font-mono font-bold">
                        /{client.slug}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-sakura-primary-light/10 text-sm font-medium">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-sakura-primary-light/10 text-sm">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-sakura-primary-light/10 text-sm capitalize">
                      {client.theme}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-sakura-primary-light/10">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          client.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200/50"
                            : "bg-amber-100 text-amber-800 border-amber-200/50"
                        }`}
                      >
                        {client.status === "Active" ? "Aktif" : "Menunggu"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-sakura-primary-light/10 text-sm text-sakura-charcoal-muted">
                      {new Date(client.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b border-sakura-primary-light/10">
                      <Link
                        href={`/admin/clients/${client.slug}`}
                        className="text-sakura-primary hover:text-sakura-primary-dark font-bold text-sm transition-colors"
                      >
                        Lihat →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filteredClients.length === 0 && !error && (
        <div className="bg-white border border-sakura-primary-light/20 shadow-xs p-12 text-center rounded-2xl">
          <p className="text-sakura-charcoal-muted mb-4 font-medium">
            {filter === "all"
              ? "Tidak ada klien terdaftar"
              : `Tidak ada klien dengan status ${filter}`}
          </p>
          <Link
            href="/"
            className="text-sakura-primary hover:text-sakura-primary-dark font-bold transition-colors"
          >
            Buat pemesanan baru →
          </Link>
        </div>
      )}
    </div>
  );
}
