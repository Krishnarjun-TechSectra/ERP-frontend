"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateGoal } from "@/lib/hooks/goals/use-update-goal";
import { toast } from "react-toastify";
import type { GoalType } from "@erp/shared-schema";

const UpdateGoalDialog: React.FC<{
  goal: GoalType;
  onSuccess?: () => void;
  children: React.ReactNode;
}> = ({ goal, onSuccess, children }) => {
  const updateGoal = useUpdateGoal();
  const [open, setOpen] = useState(false);

  // only progress
  const [progress, setProgress] = useState<number>(Number(goal.progress ?? 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // basic clamp & normalization
    const normalized = Math.max(
      0,
      Math.min(100, Math.round(Number(progress) || 0))
    );

    const payload = {
      id: goal.id,
      data: {
        progress: normalized,
      },
    } as any; // keep typing loose for backend update payload

    updateGoal.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        onSuccess?.();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Progress</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Progress: {progress}%
              </label>

              {/* Range slider */}
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full"
              />

              {/* Numeric input (kept in sync) */}
              <input
                type="number"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (Number.isNaN(v)) return setProgress(0);
                  setProgress(Math.max(0, Math.min(100, Math.round(v))));
                }}
                className="mt-2 w-28 px-2 py-1 border rounded"
                aria-label="Progress percent"
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={updateGoal.isPending}>
              {updateGoal.isPending ? "Saving..." : "Save"}
            </Button>

            <DialogClose asChild>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGoalDialog;
