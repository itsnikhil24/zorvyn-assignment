import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { balanceTrendData } from "../../data/dashboardData";

export default function BalanceTrendChart() {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-slate-700">
          Balance Trend
        </CardTitle>
      </CardHeader>

      <CardContent className="h-105 pr-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={balanceTrendData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.28} />
                <stop offset="95%" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopOpacity={0.22} />
                <stop offset="95%" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="5 5" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip />
            <Legend />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              fill="url(#incomeFill)"
              strokeWidth={3}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              fill="url(#expenseFill)"
              strokeWidth={3}
              name="Expenses"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}