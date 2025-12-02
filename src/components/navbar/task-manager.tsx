"use client";

import React, { useEffect, useState } from "react";
import { Kanban, LayoutDashboard, Target } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/auth-context";

const TaskManagerNavbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentIsAdmin = searchParams.get("isAdminView") === "true";
  const [isAdmin, setIsAdmin] = useState(currentIsAdmin);
  const router = useRouter();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setIsAdmin(currentIsAdmin);
  }, [currentIsAdmin]);

  const handleToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) params.set("isAdminView", "true");
    else params.delete("isAdminView");

    router.push(`${pathname}?${params.toString()}`);
    setIsAdmin(checked);
  };

  // 🔥 If user is still loading or null → prevent crash
  if (!user) {
    return (
      <nav className="flex justify-between items-center py-4 px-4">
        <div className="flex items-center gap-2">
          <img src={"/logo.png"} className="h-10" />
          <h2 className="font-bold text-2xl">Task Manager</h2>
        </div>
        <span className="text-gray-500">Loading...</span>
      </nav>
    );
  }

  return (
    <nav className="flex justify-between items-center gap-4 py-4">
      <section className="flex space-x-4">
        <div className="flex items-center gap-2">
          <img src={"/logo.png"} className="h-10" />
          <h2 className="font-bold text-2xl">Task Manager</h2>
        </div>

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
        <Button
          asChild
          variant={pathname === "/task-manager/goal" ? "default" : "secondary"}
        >
          <Link href="/task-manager/goal">
            <span className="flex items-center gap-2">
              <Target />
              Goals
            </span>
          </Link>
        </Button>
      </section>

      <div className="flex justify-end items-center gap-4">
        <h2 className="font-semibold text-xl">
          Hi, {user?.user_metadata?.name ?? "User"}
        </h2>

        <Button onClick={signOut}>Signout</Button>

        {/* {pathname === "/task-manager/board" &&
          user?.user_metadata?.role === "admin" && (
            <section className="flex items-center space-x-2">
              <Label htmlFor="admin">Admin</Label>
              <Switch
                id="admin"
                checked={isAdmin}
                onCheckedChange={handleToggle}
              />
            </section>
          )} */}
      </div>
    </nav>
  );
};

export default TaskManagerNavbar;
