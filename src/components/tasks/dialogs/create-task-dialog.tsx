"use client";

import { useEffect, useState } from "react";
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
import {
  CreateTaskDtoType,
  CreateTaskSchema,
  TaskPriorityEnum,
  TaskStatusEnum,
  RecurringFrequencyEnum,
  WeekdayEnum,
} from "@erp/shared-schema";

/**
 * NOTE:
 * - Backend expects kpiId: string().uuid() (non-optional). If you want KPI to be optional,
 *   change backend to make kpiId nullable/optional and then update FE accordingly.
 */

/* ------------------------- Initial state that matches CreateTaskDtoType ------------------------- */
const getInitialState = (): CreateTaskDtoType => ({
  title: "",
  description: "",
  assignedUserId: "",
  kpiId: "", // must be a UUID before submit (backend requires this). See NOTE above.
  priority: TaskPriorityEnum.MEDIUM,
  isRecurring: false,
  recurringFrequency: null,
  recurringEndDate: null,
  recurringWeekDays: null,
  deadline: undefined,
  status: TaskStatusEnum.TODO,
  completionDate: null,
  proofOfCompletion: null,
});

export default function CreateTaskDialog() {
  const [form, setForm] = useState<CreateTaskDtoType>(getInitialState());
  const [open, setOpen] = useState(false);

  const { data: kpis = [], isLoading: kpiLoading } = useGetKpis();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { mutate: createTask, isPending } = useCreateTask();

  // Optional: if you want to default kpi to the first KPI automatically uncomment:
  useEffect(() => {
    if (kpis && kpis.length > 0 && form.kpiId === "") {
      // do not auto-set: we avoid forcing a KPI. If you want an auto default uncomment:
      // setForm(prev => ({ ...prev, kpiId: kpis[0].id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpis]);

  const handleChange = <K extends keyof CreateTaskDtoType>(
    key: K,
    value: CreateTaskDtoType[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleRecurring = (checked: boolean) => {
    // When enabling recurring: clear deadline and ensure recurring defaults are set to nulls
    if (checked) {
      setForm((prev) => ({
        ...prev,
        isRecurring: true,
        deadline: undefined,
        recurringFrequency: prev.recurringFrequency ?? null,
        recurringEndDate: prev.recurringEndDate ?? null,
        recurringWeekDays: prev.recurringWeekDays ?? null,
      }));
    } else {
      // When disabling recurring: clear all recurring related fields
      setForm((prev) => ({
        ...prev,
        isRecurring: false,
        recurringFrequency: null,
        recurringEndDate: null,
        recurringWeekDays: null,
      }));
    }
  };

  const handleWeekdayToggle = (day: WeekdayEnum, checked: boolean) => {
    const current = form.recurringWeekDays ?? [];
    const updated = checked
      ? Array.from(new Set([...current, day]))
      : current.filter((d) => d !== day);
    handleChange("recurringWeekDays", updated.length ? updated : null);
  };

  const transformForValidation = (raw: CreateTaskDtoType) => {
    // Convert string ISO dates (if any slipped in) to Date objects for zod.coerce.date()
    // and keep null/undefined semantics as the schema expects.
    const transformed: any = { ...raw };

    // recurringEndDate might be Date|null already. If it's a string, convert.
    if (
      transformed.recurringEndDate &&
      typeof transformed.recurringEndDate === "string"
    ) {
      transformed.recurringEndDate = new Date(transformed.recurringEndDate);
    }

    if (transformed.deadline && typeof transformed.deadline === "string") {
      transformed.deadline = new Date(transformed.deadline);
    }

    if (
      transformed.completionDate &&
      typeof transformed.completionDate === "string"
    ) {
      transformed.completionDate = new Date(transformed.completionDate);
    }

    return transformed as CreateTaskDtoType;
  };

  const handleSubmit = () => {
    // Quick FE pre-check for KPI: your backend requires a UUID. If empty => show helpful toast.
    if (!form.kpiId) {
      toast.error(
        "Please select a KPI or update the backend schema if KPI should be optional.",
      );
      return;
    }

    // Prepare object for zod parsing: convert string dates to Date objects
    const payload = transformForValidation(form);

    try {
      // parse with CreateTaskSchema which contains superRefine rules
      const validated = CreateTaskSchema.parse(payload);

      // If validated, call mutate
      createTask(validated, {
        onSettled: () => {
          setForm(getInitialState());
          setOpen(false);
        },
        onError: (err: any) => {
          // The hook may return structured error. Show generic fallback
          toast.error(err?.message || "Failed to create task");
        },
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        // show first issue message for user friendliness
        const first = err.issues[0];
        toast.error(first?.message || "Validation Error");
        // optionally log all
        // console.error(err.issues);
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {/* Title */}
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
              value={form.description ?? ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* KPI */}
          <div>
            <Label className="text-sm font-medium mb-1">KPI (required)</Label>
            <Select
              value={form.kpiId}
              onValueChange={(val) => handleChange("kpiId", val)}
              disabled={kpiLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a KPI" />
              </SelectTrigger>
              <SelectContent>
                {/* No 'no_kpi' option because backend requires a UUID */}
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
            {/* Assign To */}
            <div>
              <Label className="text-sm font-medium mb-1">Assign To</Label>
              <Select
                value={form.assignedUserId}
                onValueChange={(val) => handleChange("assignedUserId", val)}
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

            {/* Priority */}
            <div>
              <Label className="text-sm font-medium mb-1">Priority</Label>
              <Select
                value={form.priority}
                onValueChange={(val) =>
                  handleChange("priority", val as TaskPriorityEnum)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Medium" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TaskPriorityEnum).map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Deadline (only for non-recurring) */}
          {!form.isRecurring && (
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
                    selected={
                      form.deadline ? new Date(form.deadline) : undefined
                    }
                    onSelect={(date) =>
                      handleChange("deadline", date ? date : undefined)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Recurring toggle */}
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Checkbox
              checked={form.isRecurring}
              onCheckedChange={(checked) => handleToggleRecurring(!!checked)}
            />
            <Label className="text-sm">Make this a recurring task</Label>
          </div>

          {/* Recurring options */}
          {form.isRecurring && (
            <div className="space-y-4">
              {/* Frequency */}
              <div>
                <Label className="text-sm font-medium mb-2">
                  Recurring Frequency
                </Label>
                <Select
                  value={form.recurringFrequency ?? ""}
                  onValueChange={(val) =>
                    handleChange(
                      "recurringFrequency",
                      val === "" ? null : (val as RecurringFrequencyEnum),
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(RecurringFrequencyEnum).map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Recurring End Date */}
              <div>
                <Label className="text-sm font-medium mb-2">
                  Recurring End Date
                </Label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-gray-600 gap-2"
                    >
                      <CalendarFold className="w-4 h-4" />
                      {form.recurringEndDate
                        ? new Date(form.recurringEndDate).toDateString()
                        : "Select End Date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent align="start" className="p-0">
                    <Calendar
                      mode="single"
                      selected={
                        form.recurringEndDate
                          ? new Date(form.recurringEndDate)
                          : undefined
                      }
                      onSelect={(date) =>
                        handleChange("recurringEndDate", date ? date : null)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Weekly - weekdays multi-select */}
              {form.recurringFrequency === RecurringFrequencyEnum.WEEKLY && (
                <div>
                  <Label className="text-sm font-medium mb-2">
                    Select Weekdays
                  </Label>

                  <div className="grid grid-cols-3 gap-2">
                    {Object.values(WeekdayEnum)
                      .filter((day) => day !== WeekdayEnum.SUN)
                      .map((day) => {
                        const checked = (form.recurringWeekDays ?? []).includes(
                          day as WeekdayEnum,
                        );
                        return (
                          <div
                            key={day}
                            className="flex items-center space-x-2 border p-2 rounded-md"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(isChecked) =>
                                handleWeekdayToggle(
                                  day as WeekdayEnum,
                                  !!isChecked,
                                )
                              }
                            />
                            <Label className="text-sm">{day}</Label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
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
