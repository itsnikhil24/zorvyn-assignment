import React from "react";
import { Card } from "@/components/ui/card";

export default function TopBar() {
  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Dashboard</h1>
          <p className="text-sm text-slate-500">
            Live-style summary powered by derived data
          </p>
        </div>

        <Card className="rounded-2xl px-4 py-2 shadow-sm">
          <p className="text-sm font-medium text-slate-600">Updated just now</p>
        </Card>
      </div>
    </div>
  );
}