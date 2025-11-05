"use client";
import React, { useState } from "react";
import TaskManagerLayout from "../shared-layout";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskMetricsCard from "@/components/tasks/cards/metrics.card";
import {
  CircleCheckBig,
  Clock,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import TeamLeaderBoard from "@/components/tasks/team-leaderboard";
import OverdueTasks from "@/components/tasks/overdue-tasks";
import { useUsers } from "@/lib/hooks/users/use-user";

const viewTypes = ["Daily", "Weekly", "Monthly", "Yearly"];

const TaskDashboardPage = () => {
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const [viewType, setViewType] = useState("daily");
  const [person, setPerson] = useState();

  const handleToggle = () => {};
  return (
    <TaskManagerLayout>
      <div className="space-y-3 mb-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Team Dashboard
        </h1>
        <p className="text-gray-600">
          Track productivity and task completion metrics
        </p>
      </div>
      {/* filter part */}
      <div className="p-4 md:p-6 border border-gray-300 rounded-lg flex items-center gap-6 mb-4 shadow-sm">
        <section className="flex items-center gap-2">
          <Label>Person:</Label>
          <Select value="Daily">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Person" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>View Type</SelectLabel>
                {users.map((user: any, i: number) => (
                  <SelectItem key={i} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
        <section className="flex items-center gap-2">
          <Label>View:</Label>
          <Select value="Daily">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a View" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>View Type</SelectLabel>
                {viewTypes.map((type, i) => (
                  <SelectItem key={i} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>
      </div>
      {/* Task Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        <TaskMetricsCard
          title="Tasks Assigned"
          count={5}
          icon={<Target size={18} />}
          borderColor="border-gray-300"
          description="Total tasks assigned to the user"
        />
        <TaskMetricsCard
          title="Tasks Completed"
          count={5}
          icon={<CircleCheckBig size={18} />}
          borderColor="border-green-300"
          description="Successfully completed"
        />
        <TaskMetricsCard
          title="Tasks Pending"
          count={5}
          icon={<Clock size={18} />}
          borderColor="border-blue-300"
          description="Still in progress"
        />
        <TaskMetricsCard
          title="Tasks Overdue"
          count={5}
          icon={<TriangleAlert size={18} />}
          borderColor="border-red-300"
          description="Past deadline"
        />
        <TaskMetricsCard
          title="Productivity Score"
          count={5}
          icon={<TrendingUp size={18} />}
          borderColor="border-purple-300"
          description="Weighted completion score"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeamLeaderBoard />
        <OverdueTasks />
      </div>
    </TaskManagerLayout>
  );
};

export default TaskDashboardPage;
