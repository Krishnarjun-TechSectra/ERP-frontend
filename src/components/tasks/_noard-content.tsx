"use client";
import React from "react";

import TaskBoardEmployee from "@/components/tasks/task-board-employee";
import TaskBoardAdmin from "@/components/tasks/task-board-admin";
import { useSearchParams } from "next/navigation";

const TaskBoardPage = () => {
  const searchParams = useSearchParams();
  const currentIsAdmin = searchParams.get("isAdminView") === "true";

  if (currentIsAdmin) return <TaskBoardAdmin />;
  else return <TaskBoardEmployee />;
};

export default TaskBoardPage;
