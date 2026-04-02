import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingDown, DollarSign } from "lucide-react";
import { insightsData } from "../../data/dashboardData";

function InsightBox({ icon, label, title, subtitle }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="flex items-center gap-2 text-slate-500">
        <span className="text-emerald-500">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Insights() {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-semibold text-slate-700">Insights</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <InsightBox
            icon={<BarChart3 className="h-4 w-4" />}
            label="Highest Spending"
            title={insightsData.highestSpending.category}
            subtitle={insightsData.highestSpending.total}
          />
          <InsightBox
            icon={<TrendingDown className="h-4 w-4" />}
            label="Monthly Change"
            title={insightsData.monthlyChange}
            subtitle="Spending decreased"
          />
          <InsightBox
            icon={<DollarSign className="h-4 w-4" />}
            label="Avg. Transaction"
            title={insightsData.avgTransaction}
            subtitle="Per expense"
          />
        </div>
      </CardContent>
    </Card>
  );
}