"use client";

import { Suspense } from "react";
import TaskDashboardPage from "@/components/tasks/_dashboard-content";

export default function DashboardPageWrapper() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <TaskDashboardPage />
    </Suspense>
  );
}
