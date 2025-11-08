"use client";

import { Suspense } from "react";
import TaskBoardPage from "@/components/tasks/_board-content";
import { Loading } from "@/components/ui/loading-card";

export default function BoardPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <TaskBoardPage />
    </Suspense>
  );
}
