"use client";

import { Suspense } from "react";
import TaskDashboardPage from "@/components/tasks/_dashboard-content";
import { Loader2 } from "lucide-react";
import { withRoleProtection } from "@/components/role-based-protection";

// Allowed roles for dashboard
const ALLOWED_ROLES = ["admin", "employee", "developer"];

function DashboardPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      }
    >
      <TaskDashboardPage />
    </Suspense>
  );
}

export default withRoleProtection(DashboardPageWrapper, {
  allowedRoles: ALLOWED_ROLES,
});
