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
import {
  CalendarClock,
  CheckCircle,
  CircleDashed,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

type KpiBackendType = {
  kpiId?: string;
  title: string;
  colorCode?: string | null;
  overallDeadline?: string | null;
  totalTasks?: number;
  completedOnTime?: number;
  completedLate?: number;
  notCompleted?: number;
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

            const initials =
              (k.title || "")
                .split(" ")
                .slice(0, 2)
                .map((w) => (w || "")[0])
                .join("")
                .toUpperCase() || "KP";

            const barStyle: React.CSSProperties = {
              width: `${displayScore}%`,
              background: k.colorCode ?? "#111827",
              boxShadow: `0 6px 18px ${k.colorCode ?? "#111827"}20`,
            };

            // friendly formatted deadline (if present)
            const deadlineLabel = k.overallDeadline
              ? new Date(k.overallDeadline).toLocaleDateString()
              : null;

            const totalTasks = k.totalTasks ?? 0;
            const completedOnTime = k.completedOnTime ?? 0;
            const completedLate = k.completedLate ?? 0;
            const notCompleted = k.notCompleted ?? 0;

            return (
              <div
                key={k.kpiId ?? k.title}
                className="flex items-center gap-4 p-3 rounded-xl border bg-card/60"
              >
                {/* icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold shrink-0"
                  style={{ background: k.colorCode ?? "#111827" }}
                >
                  {initials}
                </div>

                {/* label + bar */}
                <div className="w-full">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-medium">{k.title}</div>

                      <div className="text-xs text-muted-foreground mt-2">
                        {totalTasks > 0 ? (
                          <div className="grid grid-cols-2 gap-y-1 gap-x-4">
                            {/* On time */}
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>
                                <strong>{completedOnTime}</strong> of{" "}
                                {totalTasks} on time
                              </span>
                            </div>

                            {/* Late */}
                            <div className="flex items-center gap-2">
                              <XCircle className="w-3 h-3 text-red-500" />
                              <span>
                                <strong>{completedLate}</strong> completed late
                              </span>
                            </div>

                            {/* Not completed */}
                            <div className="flex items-center gap-2">
                              <CircleDashed className="w-3 h-3 text-yellow-400" />
                              <span>
                                <strong>{notCompleted}</strong> not completed
                              </span>
                            </div>

                            {/* Deadline */}
                            {deadlineLabel && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <CalendarClock className="w-3 h-3 text-blue-400" />
                                <span>Deadline: {deadlineLabel}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          "No task data"
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
                            <strong>On-time:</strong> {completedOnTime}
                          </div>
                          <div>
                            <strong>Late:</strong> {completedLate}
                          </div>
                          <div>
                            <strong>Not completed:</strong> {notCompleted}
                          </div>
                          <div>
                            <strong>Total:</strong> {totalTasks}
                          </div>
                          {deadlineLabel && (
                            <div>
                              <strong>Overall deadline:</strong> {deadlineLabel}
                            </div>
                          )}
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
            disabled={isLoading}
            aria-busy={isLoading}
          >
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
