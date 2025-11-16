"use client";

import { Suspense } from "react";
import TaskBoardPage from "@/components/tasks/_board-content";
import { Loading } from "@/components/ui/loading-card";
import { withRoleProtection } from "@/components/role-based-protection";

const ALLOWED_ROLES = ["admin", "employee", "developer"];

function BoardPageWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <TaskBoardPage />
    </Suspense>
  );
}

export default withRoleProtection(BoardPageWrapper, {
  allowedRoles: ALLOWED_ROLES,
});
