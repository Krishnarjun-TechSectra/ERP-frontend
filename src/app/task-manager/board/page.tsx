 "use client";

import { Suspense } from "react";
import TaskBoardPage from "@/components/tasks/_noard-content";

export default function BoardPageWrapper() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <TaskBoardPage />
    </Suspense>
  );
}
