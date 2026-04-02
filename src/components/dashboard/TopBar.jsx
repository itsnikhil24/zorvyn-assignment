import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Shield, Eye } from "lucide-react";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl border border-emerald-500/30 bg-emerald-50">
            <div className="grid grid-cols-2 gap-1">
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />
            </div>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">FinTrack</h1>
        </div>

        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-emerald-500" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-11 rounded-2xl px-5 text-base shadow-sm"
              >
                <span className="mr-2">Admin</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>Admin</DropdownMenuItem>
              <DropdownMenuItem>Viewer</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}