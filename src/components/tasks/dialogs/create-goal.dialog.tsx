"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUsers } from "@/lib/hooks/users/use-user";
import { CalendarFold, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "react-toastify";

import { useCreateGoal } from "@/lib/hooks/goals/use-create-goal";
import type { CreateGoalDtoType } from "@erp/shared-schema";

const CreateGoalDialog: React.FC = () => {
  const { data: users = [], isPending: usersLoading } = useUsers();
  const createGoalMutation = useCreateGoal();

  const [open, setOpen] = useState(false);

  // Use Partial while editing — final payload will conform to CreateGoalDtoType
  const [form, setForm] = useState<Partial<CreateGoalDtoType>>({
    name: "",
    deadline: undefined,
    weightageLevel: 3,
    target: "",
    assignedUserId: "",
  });

  function handleChange<K extends keyof Partial<CreateGoalDtoType>>(
    key: K,
    value: Partial<CreateGoalDtoType>[K]
  ) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function resetForm() {
    setForm({
      name: "",
      weightageLevel: 3,
      target: "",
      assignedUserId: "",
      deadline: undefined,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    createGoalMutation.mutate(form as CreateGoalDtoType, {
      onSuccess: () => {
        setOpen(false);
        resetForm();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus /> Create Goal
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            {/* Name */}
            <div className="col-span-2">
              <Label className="text-sm font-medium mb-1">Name</Label>
              <Input
                value={form.name ?? ""}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Goal name"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <Label className="text-sm font-medium mb-1">Deadline</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-gray-600 gap-2"
                  >
                    <CalendarFold className="w-4 h-4" />
                    {form.deadline
                      ? form.deadline.toDateString()
                      : "Select Deadline"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="p-0 w-auto">
                  <Calendar
                    mode="single"
                    selected={form.deadline}
                    onSelect={(date) =>
                      handleChange("deadline", date ?? undefined)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Weightage Level */}
            <div>
              <Label className="text-sm font-medium mb-1">
                Weightage Level
              </Label>
              <Select
                value={String(form.weightageLevel ?? 3)}
                onValueChange={(val) =>
                  handleChange("weightageLevel", Number(val))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="3" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assigned To */}
            <div>
              <Label className="text-sm font-medium mb-1">Assign To</Label>
              <Select
                value={form.assignedUserId ?? ""}
                onValueChange={(val) => handleChange("assignedUserId", val)}
                disabled={usersLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      usersLoading ? "Loading..." : "Select assignee"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user: any) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target */}
            <div className="col-span-2">
              <Label className="text-sm font-medium mb-1">Target</Label>
              <Textarea
                value={form.target ?? ""}
                onChange={(e) => handleChange("target", e.target.value)}
                placeholder="Describe the target (KPIs, numbers, etc.)"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={createGoalMutation.isPending}>
              {createGoalMutation.isPending ? "Saving..." : "Save Goal"}
            </Button>
            <DialogClose asChild>
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
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

export default CreateGoalDialog;
