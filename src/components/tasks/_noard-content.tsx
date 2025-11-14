"use client";
import React from "react";

import TaskBoardAdmin from "@/components/tasks/task-board-admin";
import { useSearchParams } from "next/navigation";
import TaskManagerLayout from "@/app/task-manager/shared-layout";
import { TaskBoardEmployee } from "./task-board-employee";

const TaskBoardPage = () => {
  const searchParams = useSearchParams();
  const currentIsAdmin = searchParams.get("isAdminView") === "true";

  if (currentIsAdmin)
    return (
      <TaskManagerLayout>
        <TaskBoardAdmin />
      </TaskManagerLayout>
    );
  else
    return (
      <TaskManagerLayout>
        <TaskBoardEmployee />
      </TaskManagerLayout>
    );
};

export default TaskBoardPage;
