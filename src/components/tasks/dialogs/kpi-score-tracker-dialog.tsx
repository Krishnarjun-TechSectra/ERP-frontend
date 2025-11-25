"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useGetKpiScore } from "@/lib/hooks/kpi/use-get-kpi-score";
import { RotateCcw } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

type KpiBackendType = {
  kpiId?: string;
  title: string;
  colorCode?: string | null;
  overallDeadline?: string | null;
  totalTasks?: number;
  completedOnTime?: number;
  completedLate?: number;
  score?: number; // 0-100
};

export default function KpiScoreDialog({
  buttonLabel = "KPI Scores",
}: {
  buttonLabel?: string;
}) {
  const { data: kpis, isLoading, isError, refetch } = useGetKpiScore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{buttonLabel}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            KPI Scores
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto scrollbar-overlay">
          {isLoading && (
            <div className="py-8 text-center text-sm">Loading KPI scores…</div>
          )}

          {isError && (
            <div className="py-8 text-center text-sm text-red-600">
              Failed to load KPI scores.
            </div>
          )}

          {kpis && kpis.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No KPI scores available.
            </div>
          )}

          {kpis?.map((k: KpiBackendType) => {
            const score = Number(k.score ?? 0);
            const displayScore = Number.isFinite(score)
              ? Math.max(0, Math.min(100, score))
              : 0;
            const initials = (k.title || "")
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase();

            const barStyle: React.CSSProperties = {
              width: `${displayScore}%`,
              background: k.colorCode ?? "#111827",
              boxShadow: `0 6px 18px ${k.colorCode ?? "#111827"}20`,
            };

            return (
              <div
                key={k.kpiId}
                className="flex items-center gap-4 p-3 rounded-xl border bg-card/60"
              >
                {/* icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                  style={{ background: k.colorCode ?? "#111827" }}
                >
                  {initials || "KP"}
                </div>

                {/* label + bar */}
                <div className="w-full">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium">{k.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {/* small subtle subtitle */}
                        {k.totalTasks != null
                          ? `${k.completedOnTime ?? 0}/${k.totalTasks} tasks completed on time`
                          : "No task data"}
                        {k.completedLate && k.completedLate > 0 && (
                          <div className="text-xs mt-1 text-red-400">{k.completedLate} tasks completed late</div>
                        )}
                      </div>
                    </div>

                    {/* big percentage */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-end">
                          <div className="text-xl font-bold">
                            {displayScore.toFixed(0)}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            score
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <div className="text-sm">
                          <div>
                            <strong>Score:</strong> {displayScore.toFixed(2)}%
                          </div>
                          <div>
                            <strong>On-time:</strong> {k.completedOnTime ?? 0}
                          </div>
                          <div>
                            <strong>Total:</strong> {k.totalTasks ?? 0}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* progress bar */}
                  <div className="mt-3">
                    <div className="w-full h-2 rounded-full bg-muted/20 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={barStyle}
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RotateCcw /> Refresh
          </Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
