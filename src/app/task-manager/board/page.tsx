"use client";
import React, { useState } from "react";
import TaskManagerLayout from "../shared-layout";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Plus, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import TaskBoardCard from "@/components/tasks/task-board.card";
import { useSearchParams } from "next/navigation";
import TeamLeaderBoard from "@/components/tasks/team-leaderboard";
import KpiScoreManager from "@/components/tasks/kpi-score-manager";
import CreateKpiDialog from "@/components/tasks/create-kpi-dialog";
import CreateTaskDialog from "@/components/tasks/create-task-dialog";
import TaskBoard from "@/components/tasks/task-status-dnd";
import { initialTasks } from "@/data/demo";

const completedTasks = [
  { name: "Client Meetings", date: "Oct 17, 2025" },
  { name: "5 google reviews per week", date: "Oct 17, 2025" },
  { name: "Update Success Marathon", date: "Oct 17, 2025" },
  { name: "Update Lead Tracker", date: "Oct 17, 2025" },
];
const notask: any[] = [];

const TaskBoardPage = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentIsAdmin = searchParams.get("isAdminView") === "true";

  if (currentIsAdmin) {
    return (
      <TaskManagerLayout>
        <div className="space-y-3 mb-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of team performance and individual task boards
          </p>
        </div>
        <TeamLeaderBoard />
        <div className="space-y-4 mt-6">
          <div className="space-y-2 mb-4">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">
              Employee's Task Board
            </h1>
            <p className="text-gray-600 text-sm">
              View and manage tasks for selected team member
            </p>
          </div>
          <TaskBoard
            initialTasks={initialTasks}
          />
          <KpiScoreManager />
        </div>
      </TaskManagerLayout>
    );
  } else {
    return (
      <TaskManagerLayout>
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
            <Button variant={"outline"}>
              <RotateCcw /> Reset Data
            </Button>
            <CreateKpiDialog />
            <CreateTaskDialog />
          </div>
        </div>
        {/* filter part */}
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
                {"Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                // selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  // setDate(date)
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <TaskBoard
          initialTasks={initialTasks}
        />
      </TaskManagerLayout>
    );
  }
};

export default TaskBoardPage;
