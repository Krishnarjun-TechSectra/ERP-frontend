"use client";

import React, { useEffect, useState } from "react";
import PageLayout from "../ui/layout";
import { Kanban, LayoutDashboard } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const TaskManagerNavbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentIsAdmin = searchParams.get("isAdminView") === "true";
  const [isAdmin, setIsAdmin] = useState(currentIsAdmin);
  const router = useRouter();

  useEffect(() => {
    setIsAdmin(currentIsAdmin);
  }, [currentIsAdmin]);

  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("isAdminView", "true");
    } else {
      params.delete("isAdminView");
    }

    router.push(`${pathname}?${params.toString()}`);
    setIsAdmin(checked);
  };

  return (
    <nav className="flex justify-between items-center gap-4 py-4">
      <section className="flex space-x-4">
        <h2 className="font-bold text-2xl">Task Manager</h2>

        <Button
          asChild
          variant={
            pathname === "/task-manager/dashboard" ? "default" : "secondary"
          }
        >
          <Link href="/task-manager/dashboard">
            <span className="flex items-center gap-2">
              <LayoutDashboard />
              Dashboard
            </span>
          </Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/task-manager/board" ? "default" : "secondary"}
        >
          <Link href="/task-manager/board">
            <span className="flex items-center gap-2">
              <Kanban />
              Board
            </span>
          </Link>
        </Button>
      </section>

      {pathname === "/task-manager/board" && (
        <section className="flex items-center space-x-2">
          <Label htmlFor="admin">Admin</Label>
          <Switch id="admin" checked={isAdmin} onCheckedChange={handleToggle} />
        </section>
      )}
    </nav>
  );
};

export default TaskManagerNavbar;
