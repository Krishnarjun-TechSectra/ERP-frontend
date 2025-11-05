"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarFold, Loader2, Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "../../ui/calendar";
import { useGetKpis } from "@/lib/hooks/kpi/use-getkpi";
import { useUsers } from "@/lib/hooks/users/use-user";
import z from "zod";
import { toast } from "react-toastify";
import { useCreateTask } from "@/lib/hooks/tasks/use-createtask";
import { CreateTaskSchema } from "@erp/shared-schema";

export default function CreateTaskDialog() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    kpi_id: "no_kpi",
    assignTo: "",
    priority: "medium",
    deadline: "",
    isRecurring: false,
    recurringFrequency: "",
  });
  const [open, setOpen] = useState(false);
  const { data: kpis = [], isLoading: kpiLoading } = useGetKpis();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { mutate: createTask, isPending } = useCreateTask();

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    try {
      const validated = CreateTaskSchema.parse(form);
      createTask(validated, {
        onSettled: () => {
          setForm({
            title: "",
            description: "",
            kpi_id: "no_kpi",
            assignTo: "",
            priority: "medium",
            deadline: "",
            isRecurring: false,
            recurringFrequency: "",
          });
          setOpen(false);
        },
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0].message);
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus />
          Create Task
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Task Title */}
          <div>
            <Label className="text-sm font-medium mb-1">Task Title</Label>
            <Input
              placeholder="Enter task title..."
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-medium mb-1">Description</Label>
            <Textarea
              placeholder="Describe the task in detail..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* KPI */}
          <div>
            <Label className="text-sm font-medium mb-1">KPI (Optional)</Label>
            <Select
              value={form.kpi_id}
              onValueChange={(val) => handleChange("kpi_id", val)}
              disabled={kpiLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a KPI" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no_kpi">No KPI</SelectItem>
                {kpis?.map((kpi: any) => (
                  <SelectItem key={kpi.id} value={kpi.id}>
                    <div
                      className="w-3 h-3 rounded-full mr-1 inline-block"
                      style={{ backgroundColor: kpi.colorCode }}
                    />
                    {kpi.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium mb-1">Assign To</Label>
              <Select
                value={form.assignTo}
                onValueChange={(val) => handleChange("assignTo", val)}
                disabled={usersLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {users?.map((user: any) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-1">Priority</Label>
              <Select
                value={form.priority}
                onValueChange={(val) => handleChange("priority", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <Label className="text-sm font-medium mb-1">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-gray-600 gap-2"
                >
                  <CalendarFold className="w-4 h-4" />
                  {form.deadline
                    ? new Date(form.deadline).toDateString()
                    : "Select Deadline"}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar
                  mode="single"
                  selected={form.deadline ? new Date(form.deadline) : undefined}
                  onSelect={(date) =>
                    handleChange("deadline", date?.toISOString() || "")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Recurring */}
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Checkbox
              checked={form.isRecurring}
              onCheckedChange={(checked) =>
                handleChange("isRecurring", !!checked)
              }
            />
            <Label className="text-sm">Make this a recurring task</Label>
          </div>
          {form.isRecurring && (
            <div>
              <Label className="text-sm font-medium mb-2">
                Recurring Frequency
              </Label>
              <Select
                value={form.recurringFrequency}
                onValueChange={(val) => handleChange("recurringFrequency", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Frquency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
