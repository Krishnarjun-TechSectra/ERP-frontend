"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User2Icon } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  currentScore?: number | null;
}

const employees: Employee[] = [
  { id: 1, name: "John Doe", currentScore: null },
  { id: 2, name: "Jane Smith", currentScore: null },
  { id: 3, name: "Mike Johnson", currentScore: null },
  { id: 4, name: "Sarah Wilson", currentScore: null },
];

export default function KpiScoreManager() {
  const [scores, setScores] = useState<Record<number, string>>({});

  const handleChange = (id: number, value: string) => {
    setScores((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (id: number) => {
    const score = scores[id];
    if (!score) return;
    alert(`${employees.find((e) => e.id === id)?.name}'s KPI set to ${score}%`);
  };

  return (
    <div className="p-6 border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold">KPI Score Management</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Manually set KPI scores for each employee (separate from productivity
        score)
      </p>

      <div className="space-y-3">
        {employees.map((emp) => (
          <Card key={emp.id} className="border rounded-xl shadow-sm">
            <CardContent className="flex items-center justify-between px-4">
              <div className="flex items-center space-x-3">
                <User2Icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">{emp.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Current KPI Score:{" "}
                    {emp.currentScore !== null
                      ? `${emp.currentScore}%`
                      : "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center rounded-md px-2 py-1">
                  <Input
                    type="number"
                    placeholder="Enter score"
                    value={scores[emp.id] || ""}
                    onChange={(e) => handleChange(emp.id, e.target.value)}
                    className="w-25 text-sm mr-1"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => handleSave(emp.id)}
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
