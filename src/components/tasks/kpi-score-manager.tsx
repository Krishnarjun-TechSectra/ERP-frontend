"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User2Icon, Loader2 } from "lucide-react";
import { useUsers } from "@/lib/hooks/users/use-user";
import { useUpdateUser } from "@/lib/hooks/users/use-update-user";
import { UpdateUserSchema } from "@erp/shared-schema";
import { toast } from "react-toastify";

export default function KpiScoreManager() {
  const [scores, setScores] = useState<Record<string, string>>({});
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { mutate: updateUser } = useUpdateUser();

  console.log(users);

  const handleChange = (id: string, value: string) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (id: string) => {
    const score = scores[id];
    if (score === undefined || score === "") return;

    const parsed = UpdateUserSchema.safeParse({
      id,
      kpiScore: Number(score),
    });

    if (!parsed.success) {
      toast.error(parsed.error.message);
      return;
    }

    setActiveUserId(id);
    updateUser(
      { id, data: { kpiScore: Number(score) } },
      {
        onSettled: () => setActiveUserId(null),
      },
    );
  };

  if (usersLoading) {
    return (
      <div className="p-6 border border-gray-200 rounded-xl shadow-sm text-center text-muted-foreground">
        Loading users...
      </div>
    );
  }

  return (
    <div className="p-6 border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">KPI Score Management</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Manually set KPI scores for each employee (separate from productivity
        score)
      </p>

      <div className="space-y-3">
        {users.map((emp) => {
          const currentValue = scores[emp.id] ?? String(emp.kpiScore ?? "");
          const isChanged =
            currentValue !== "" &&
            Number(currentValue) !== Number(emp.kpiScore ?? NaN);

          return (
            <div key={emp.id} className="relative">
              {/* Overlay when updating this user */}
              {activeUserId === emp.id && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-600 mr-2" />
                  <span className="text-sm text-gray-700 font-medium">
                    Updating...
                  </span>
                </div>
              )}

              <Card className="border rounded-xl shadow-sm">
                <CardContent className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <User2Icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{emp.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Current KPI Score:{" "}
                        {emp.kpiScore !== null ? `${emp.kpiScore}%` : "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center rounded-md px-2 py-1">
                      <Input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="Enter score"
                        value={currentValue}
                        onChange={(e) => handleChange(emp.id, e.target.value)}
                        className="w-20 text-sm mr-1"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                    <Button
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSave(emp.id)}
                      disabled={!isChanged || activeUserId === emp.id}
                    >
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
