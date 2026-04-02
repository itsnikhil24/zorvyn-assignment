import React from "react";
import TopBar from "./components/dashboard/TopBar";
import StatCard from "./components/dashboard/StatCard";
import BalanceTrendChart from "./components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "./components/dashboard/SpendingBreakdownChart";
import Insights from "./components/dashboard/Insights";
import TransactionsTable from "./components/dashboard/TransactionsTable";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { dashboardStats } from "./data/dashboardData";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopBar />

      <main className="mx-auto max-w-[1600px] px-6 py-6 space-y-6">
        <section className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Total Balance"
            value="$33,710"
            icon={<Wallet className="h-5 w-5" />}
            tone="positive"
          />
          <StatCard
            title="Total Income"
            value="$43,174"
            icon={<TrendingUp className="h-5 w-5" />}
            tone="positive"
          />
          <StatCard
            title="Total Expenses"
            value="-$9,464"
            icon={<TrendingDown className="h-5 w-5" />}
            tone="negative"
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <BalanceTrendChart />
          </div>
          <div className="lg:col-span-3">
            <SpendingBreakdownChart />
          </div>
        </section>

        <Insights />

        <TransactionsTable />
      </main>
    </div>
  );
}