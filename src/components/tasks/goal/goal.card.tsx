"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, Users, Calendar, Star } from "lucide-react";
import { GoalType } from "@erp/shared-schema";
import UpdateGoalDialog from "../dialogs/update-goal";
import DeleteGoalDialog from "../dialogs/delete-goal.dialog";


interface GoalCardProps {
  goal: any;
  isAdmin: boolean;
  onActionSuccess?: () => void;
}

export default function GoalCard({
  goal,
  isAdmin,

  onActionSuccess,
}: GoalCardProps) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm border bg-white">
      <CardContent className="p-0 flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{goal.name}</h2>

            <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Assigned to: {goal.assignedUser.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(goal.deadline).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">
                  Weightage: {goal.weightageLevel} / 5
                </span>
              </div>
            </div>
          </div>

          {/* Admin actions */}
          {isAdmin && (
            <div className="flex gap-2">
              <UpdateGoalDialog goal={goal} onSuccess={onActionSuccess}>
                <Pencil className="w-5 h-5" />
              </UpdateGoalDialog>

              <DeleteGoalDialog
                goalId={goal.id as string}
                onSuccess={onActionSuccess}
              >
                <Trash2 className="w-5 h-5" />
              </DeleteGoalDialog>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div>
          <div className="flex justify-between mb-1">
            <p className="text-sm font-medium">Progress</p>

            {goal.progress === 0 ? (
              <span className="text-sm font-semibold text-red-500">
                No progress yet!
              </span>
            ) : (
              <span className="text-sm font-semibold">{goal.progress}%</span>
            )}
          </div>

          <Progress
            value={goal.progress}
            className={`h-3 rounded-xl ${
              goal.progress === 0 ? "bg-red-200" : ""
            }`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
