import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, Search } from "lucide-react";
import { transactions } from "../../data/dashboardData";

export default function TransactionsTable() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(() => {
    const unique = [...new Set(transactions.map((t) => t.category))];
    return unique;
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "all" ? true : t.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" ? true : t.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [search, typeFilter, categoryFilter]);

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="text-2xl font-semibold text-slate-700">
          Transactions
        </CardTitle>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="h-11 w-[220px] rounded-2xl pl-9"
            />
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-11 w-[160px] rounded-2xl">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-11 w-[180px] rounded-2xl">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button className="inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <ArrowUpDown className="h-4 w-4" />
            Date
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead>Transaction</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">
                    {tx.title}
                  </TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.category}</TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      tx.type === "income" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {tx.amount}
                  </TableCell>
                </TableRow>
              ))}

              {filteredTransactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-slate-500">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}