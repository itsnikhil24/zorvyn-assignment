import React, { useMemo } from "react";
import TopBar from "./components/dashboard/TopBar";
import StatCard from "./components/dashboard/StatCard";
import BalanceTrendChart from "./components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "./components/dashboard/SpendingBreakdownChart";
import Insights from "./components/dashboard/Insights";
import TransactionsTable from "./components/dashboard/TransactionsTable";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { buildDashboardData, transactions } from "./data/dashboardData";

export default function App() {
  const dashboard = useMemo(() => buildDashboardData(transactions), []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopBar />

      <main className="mx-auto max-w-7xl px-6 py-6 space-y-6">
        <section className="grid gap-6 md:grid-cols-3">
          <StatCard
            title={dashboard.stats[0].title}
            value={dashboard.stats[0].value}
            icon={<Wallet className="h-5 w-5" />}
            tone={dashboard.stats[0].tone}
          />
          <StatCard
            title={dashboard.stats[1].title}
            value={dashboard.stats[1].value}
            icon={<TrendingUp className="h-5 w-5" />}
            tone={dashboard.stats[1].tone}
          />
          <StatCard
            title={dashboard.stats[2].title}
            value={dashboard.stats[2].value}
            icon={<TrendingDown className="h-5 w-5" />}
            tone={dashboard.stats[2].tone}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <BalanceTrendChart data={dashboard.balanceTrendData} />
          </div>
          <div className="lg:col-span-3">
            <SpendingBreakdownChart data={dashboard.spendingBreakdownData} />
          </div>
        </section>

        <Insights insightsData={dashboard.insightsData} />

        <TransactionsTable transactions={dashboard.transactions} />
      </main>
    </div>
  );
}