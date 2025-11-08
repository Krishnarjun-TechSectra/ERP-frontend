"use client";

import React from "react";

import TeamLeaderBoard from "./team-leaderboard";
import KpiScoreManager from "./kpi-score-manager";
import { withRoleProtection } from "../role-based-protection";

const TaskBoardAdmin = () => {
  return (
    <>
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
            Employee&apos;s Task Board
          </h1>
          <p className="text-gray-600 text-sm">
            View and manage tasks for selected team member
          </p>
        </div>

        <KpiScoreManager />
      </div>
    </>
  );
};

// ✅ Protect this component — only "admin" role can view
export default withRoleProtection(TaskBoardAdmin, {
  allowedRoles: ["admin"],
});
