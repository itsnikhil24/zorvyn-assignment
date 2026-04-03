import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ title, value, icon, tone = "positive" }) {
  const valueClass = tone === "negative" ? "text-red-500" : "text-emerald-500";
  const iconClass = tone === "negative" ? "text-red-500" : "text-emerald-500";

  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardContent className="flex items-start justify-between p-6">
        <div>
          <p className="text-lg font-medium text-slate-500">{title}</p>
          <p className={`mt-5 text-4xl font-bold tracking-tight ${valueClass}`}>
            {value}
          </p>
        </div>

        <div className={iconClass}>{icon}</div>
      </CardContent>
    </Card>
  );
}