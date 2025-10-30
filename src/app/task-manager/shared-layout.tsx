// app/task-manager/layout.tsx
"use client";

import React from "react";
import TaskManagerNavbar from "@/components/navbar/task-manager";
import PageLayout from "@/components/ui/layout";

export default function TaskManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <div className="border-b">
        <PageLayout>
          <TaskManagerNavbar />
        </PageLayout>
      </div>
      <PageLayout style="py-6">{children}</PageLayout>
    </div>
  );
}
