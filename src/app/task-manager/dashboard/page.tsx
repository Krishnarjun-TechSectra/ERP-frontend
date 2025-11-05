"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TaskManagerLayout from "../shared-layout";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskMetricsCard from "@/components/tasks/cards/metrics.card";
import {
  ChevronDownIcon,
  CircleCheckBig,
  Clock,
  Target,
  TrendingUp,
  TriangleAlert,
  X,
} from "lucide-react";
import TeamLeaderBoard from "@/components/tasks/team-leaderboard";
import OverdueTasks from "@/components/tasks/overdue-tasks";
import { useUsers } from "@/lib/hooks/users/use-user";
import {
  TaskSchema,
  TaskSchemaType,
  TaskStatusEnum,
  ViewTypeEnum,
} from "@erp/shared-schema";
import { Calendar } from "@/components/ui/calendar";
import { getTasks } from "@/services/tasks";
import { TaskFilterDTO } from "@erp/shared-schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetTasks } from "@/lib/hooks/tasks/use-gettask.";

const TaskDashboardPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: users = [], isLoading: usersLoading } = useUsers();
  const [open, setOpen] = useState(false);

  // Filters state
  const [assignedUserId, setAssignedUserId] = useState<string>();
  const [viewType, setViewType] = useState<ViewTypeEnum>();
  const [date, setDate] = useState<Date>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();

  // Initialize filters from query params (once)
  useEffect(() => {
    const params = Object.fromEntries([...searchParams.entries()]);
    if (params.assignedUserId) setAssignedUserId(params.assignedUserId);
    if (params.viewType) setViewType(params.viewType as ViewTypeEnum);
    if (params.date) setDate(new Date(params.date));
    if (params.month) setMonth(Number(params.month));
    if (params.year) setYear(Number(params.year));
  }, [searchParams]);

  // Memoize filters to prevent infinite loops
  const filters = useMemo<TaskFilterDTO>(() => {
    const obj: TaskFilterDTO = {};
    if (assignedUserId) obj.assignedUserId = assignedUserId;
    if (viewType) obj.viewType = viewType;
    if (date) obj.date = date;
    if (month) obj.month = month;
    if (year) obj.year = year;
    return obj;
  }, [assignedUserId, viewType, date, month, year]);

  // Update URL query params whenever filters change
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        params.set(key, val instanceof Date ? val.toISOString() : String(val));
      }
    });

    router.replace(params.toString() ? `?${params.toString()}` : "");
  }, [filters, router]);

  // Fetch tasks via React Query hook
  const {
    data: tasks = [],
    isLoading,
    isError,
    refetch,
  } = useGetTasks(filters);

  const tasksCompleted = tasks.filter(
    (task: TaskSchemaType) => task.status === TaskStatusEnum.COMPLETED,
  ).length;
  const tasksPending = tasks.filter(
    (task: TaskSchemaType) =>
      task.status !== "Completed" && new Date(task.deadline) >= new Date(),
  ).length;
  const tasksOverdue = tasks.filter(
    (task: TaskSchemaType) =>
      task.status !== "Completed" && new Date(task.deadline) < new Date(),
  ).length;

  const handleClearFilters = () => {
    // Reset state
    setAssignedUserId(undefined);
    setViewType(undefined);
    setDate(undefined);
    setMonth(undefined);
    setYear(undefined);

    // Clear query params immediately
    router.replace("");

    // Optional: refetch tasks after clearing
    refetch();
  };

  // Smart weekly selection for calendar highlight
  const getCalendarSelected = () => {
    if (!date) return undefined;
    if (viewType === ViewTypeEnum.WEEKLY) {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        return d;
      });
    }
    return date;
  };

  // Render conditional inputs based on viewType
  const renderFilterInput = () => {
    switch (viewType) {
      case ViewTypeEnum.DAILY:
      case ViewTypeEnum.WEEKLY:
        const calendarSelected = getCalendarSelected();
        return (
          <div className="flex items-center gap-2">
            <Label>Select Date:</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  required
                  mode="single"
                  captionLayout="dropdown"
                  selected={
                    Array.isArray(calendarSelected)
                      ? calendarSelected[0]
                      : calendarSelected
                  }
                  onSelect={(d: Date) => setDate(d)}
                />
              </PopoverContent>
            </Popover>
          </div>
        );

      case ViewTypeEnum.MONTHLY:
        return (
          <>
            <div className="flex items-center gap-2">
              <Label>Month:</Label>
              <Select
                value={month?.toString() || ""}
                onValueChange={(val) => setMonth(Number(val))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label>Year:</Label>
              <Select
                value={year?.toString() || ""}
                onValueChange={(val) => setYear(Number(val))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Array.from({ length: 101 }, (_, i) => 2000 + i).map(
                      (y) => (
                        <SelectItem key={y} value={y.toString()}>
                          {y}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case ViewTypeEnum.YEARLY:
        return (
          <div className="flex items-center gap-2">
            <Label>Year:</Label>
            <Select
              value={year?.toString() || ""}
              onValueChange={(val) => setYear(Number(val))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: 101 }, (_, i) => 2000 + i).map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
    }
  };

  return (
    <TaskManagerLayout>
      <div className="space-y-3 mb-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Team Dashboard
        </h1>
        <p className="text-gray-600">
          Track productivity and task completion metrics
        </p>
      </div>

      {/* Filters */}
      <div className="p-4 md:p-6 border border-gray-300 rounded-lg flex flex-wrap items-center gap-6 mb-4 shadow-sm">
        {/* Person */}
        <div className="flex items-center gap-2">
          <Label>Person:</Label>
          <Select
            value={assignedUserId || ""}
            onValueChange={setAssignedUserId}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Person" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {users.map((user: any) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* View Type */}
        <div className="flex items-center gap-2">
          <Label>View:</Label>
          <Select
            value={viewType}
            onValueChange={(val: ViewTypeEnum) => setViewType(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a View" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.values(ViewTypeEnum).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Conditional filter inputs */}
        {renderFilterInput()}

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="flex items-center gap-1 text-gray-700 hover:text-red-500"
        >
          <X className="w-4 h-4" />
          Clear Filter
        </Button>
      </div>

      {/* Task Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <TaskMetricsCard
          title="Tasks Assigned"
          count={tasks.length}
          icon={<Target size={18} />}
          borderColor="border-gray-300"
          description="Total tasks assigned to the user"
        />
        <TaskMetricsCard
          title="Tasks Completed"
          count={tasksCompleted}
          icon={<CircleCheckBig size={18} />}
          borderColor="border-green-300"
          description="Successfully completed"
        />
        <TaskMetricsCard
          title="Tasks Pending"
          count={tasksPending}
          icon={<Clock size={18} />}
          borderColor="border-blue-300"
          description="Still in progress"
        />
        <TaskMetricsCard
          title="Tasks Overdue"
          count={tasksOverdue}
          icon={<TriangleAlert size={18} />}
          borderColor="border-red-300"
          description="Past deadline"
        />
        <TaskMetricsCard
          title="Productivity Score"
          count={5}
          icon={<TrendingUp size={18} />}
          borderColor="border-purple-300"
          description="Weighted completion score"
        />
      </div>

      {/* Other components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeamLeaderBoard />
        <OverdueTasks />
      </div>
    </TaskManagerLayout>
  );
};

export default TaskDashboardPage;
