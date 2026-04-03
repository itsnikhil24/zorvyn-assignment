import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatDate = (dateString) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));

export default function TransactionsTable({ transactions = [] }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 🔹 Get unique categories dynamically
  const categories = useMemo(() => {
    return ["all", ...new Set(transactions.map((t) => t.category))];
  }, [transactions]);

  // 🔹 Filtering Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      // Search filter
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      // Type filter
      const matchesType =
        typeFilter === "all" || item.type === typeFilter;

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      // Date filter
      const itemDate = new Date(item.date);
      const matchesStartDate = startDate
        ? itemDate >= new Date(startDate)
        : true;
      const matchesEndDate = endDate
        ? itemDate <= new Date(endDate)
        : true;

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [transactions, search, typeFilter, categoryFilter, startDate, endDate]);

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-slate-700">
          Recent Transactions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 🔥 FILTER SECTION */}
        {/* 🔥 FILTER SECTION */}
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-5">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="rounded-xl border p-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* Type Filter */}
            <select
              className="rounded-xl border p-2 text-sm"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* Category Filter */}
            <select
              className="rounded-xl border p-2 text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Start Date */}
            <input
              type="date"
              className="rounded-xl border p-2 text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            {/* End Date */}
            <input
              type="date"
              className="rounded-xl border p-2 text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* ✅ NEW SECTION UNDER FILTER */}
          <div className="flex items-center justify-between">
            {/* Results count */}
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold">{filteredTransactions.length}</span>{" "}
              of <span className="font-semibold">{transactions.length}</span> transactions
            </p>

            {/* Reset button */}
            <button
              onClick={() => {
                setSearch("");
                setTypeFilter("all");
                setCategoryFilter("all");
                setStartDate("");
                setEndDate("");
              }}
              className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-100"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* 🔥 TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="py-3 pr-4 font-medium">Title</th>
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Category</th>
                <th className="py-3 pr-4 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 text-sm last:border-b-0"
                  >
                    <td className="py-4 pr-4 font-medium text-slate-800">
                      {item.title}
                    </td>
                    <td className="py-4 pr-4 text-slate-500">
                      {formatDate(item.date)}
                    </td>
                    <td className="py-4 pr-4 text-slate-500">
                      {item.category}
                    </td>
                    <td
                      className={`py-4 pr-4 font-semibold ${item.type === "income"
                          ? "text-emerald-500"
                          : "text-red-500"
                        }`}
                    >
                      {item.type === "income" ? "+" : "-"}${item.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-slate-400"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}