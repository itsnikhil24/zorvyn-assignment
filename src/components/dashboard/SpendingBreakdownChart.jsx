import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

export default function SpendingBreakdownChart({ data = [] }) {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-slate-700">
          Spending Breakdown
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[26rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={90}
              outerRadius={130}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}