"use client";

import TaskManagerLayout from "@/app/task-manager/shared-layout";
import { Label } from "@radix-ui/react-label";
import { RotateCcw, ChevronDownIcon, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import CreateKpiDialog from "./dialogs/create-kpi-dialog";
import CreateTaskDialog from "./dialogs/create-task-dialog";
import KanbanBoard from "./task-status-dnd";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetTasks } from "@/lib/hooks/tasks/use-gettask.";
import { ViewTypeEnum } from "@erp/shared-schema";

const TaskBoardEmployee = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const dateParam = searchParams.get("date");

  useEffect(() => {
    if (dateParam) {
      setDate(new Date(dateParam));
    } else {
      setDate(null);
    }
  }, [dateParam]);

  const filters = date ? { date, viewType: ViewTypeEnum.DAILY } : undefined;

  const { data: tasks, isLoading, isError, refetch } = useGetTasks(filters);

  const handleFilter = (selectedDate?: Date) => {
    setDate(selectedDate || null);
    const params = new URLSearchParams(searchParams.toString());

    if (selectedDate) {
      params.set("date", selectedDate.toISOString());
      params.set("viewType", ViewTypeEnum.DAILY); // ✅ Always set daily view
    } else {
      params.delete("date");
      params.delete("viewType"); // remove viewType if filter cleared
    }

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  // ✅ Handle filter clear
  const handleClearFilter = () => {
    setDate(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("date");
    params.delete("viewType");
    router.push(pathname);
  };

  return (
    <TaskManagerLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Task Board
          </h1>
          <p className="text-gray-600">
            Manage and track your tasks with drag-and-drop functionality
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => refetch()}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset Data
          </Button>
          <CreateKpiDialog />
          <CreateTaskDialog />
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-4 md:p-6 border border-gray-300 rounded-lg flex items-center gap-2 mb-4 shadow-sm">
        <Label htmlFor="date" className="px-1">
          Due Date:
        </Label>

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
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date ?? undefined}
              captionLayout="dropdown"
              onSelect={handleFilter}
            />
          </PopoverContent>
        </Popover>

        {date && (
          <Button
            variant="outline"
            onClick={handleClearFilter}
            className="flex items-center gap-1 text-gray-700 hover:text-red-500"
          >
            <X className="w-4 h-4" />
            Clear Filter
          </Button>
        )}
      </div>

      <KanbanBoard tasks={tasks} isError={isError} isLoading={isLoading} />
    </TaskManagerLayout>
  );
};

export default TaskBoardEmployee;
