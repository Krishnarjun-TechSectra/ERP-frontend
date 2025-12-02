"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { withRoleProtection } from "@/components/role-based-protection";
import GoalPageComponent from "@/components/tasks/goal/goal-page";

// Allowed roles for dashboard
const ALLOWED_ROLES = ["admin", "employee", "developer"];

function GoalPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
        </div>
      }
    >
      <GoalPageComponent />
    </Suspense>
  );
}

export default withRoleProtection(GoalPageWrapper, {
  allowedRoles: ALLOWED_ROLES,
});
