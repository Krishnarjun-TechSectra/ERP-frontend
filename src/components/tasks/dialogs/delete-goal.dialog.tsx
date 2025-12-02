"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteGoal } from "@/lib/hooks/goals/use-delete-goal";
import { toast } from "react-toastify";

const DeleteGoalDialog: React.FC<{
  goalId: string;
  onSuccess?: () => void;
  children: React.ReactNode;
}> = ({ goalId, onSuccess, children }) => {
  const deleteGoal = useDeleteGoal();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteGoal.mutate(goalId, {
      onSuccess: () => {
        toast.success("Goal deleted");
        setOpen(false);
        onSuccess?.();
      },
      onError: (err: any) => {
        toast.error(err?.message ?? "Failed to delete goal");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Goal</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p>Are you sure you want to delete this goal? This action cannot be undone.</p>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteGoal.isPending}>
            {deleteGoal.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGoalDialog;
