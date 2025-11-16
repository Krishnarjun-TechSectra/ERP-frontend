"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import clsx from "clsx";
import { useCreateKpi } from "@/lib/hooks/kpi/use-createkpi";
import { CreateKpiDto } from "@erp/shared-schema";
import { toast } from "react-toastify";

export default function CreateKpiDialog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { mutate: createKPI, isPending } = useCreateKpi();

  const colors = [
    "#2563eb", // blue
    "#ef4444", // red
    "#22c55e", // green
    "#f59e0b", // orange
    "#8b5cf6", // purple
    "#ec4899", // pink
  ];

  const handleSubmit = async () => {
    const result = CreateKpiDto.safeParse({
      title,
      description,
      colorCode: selectedColor,
    });

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Invalid input";
      toast.error(message);
      return;
    }
    createKPI(result.data, {
      onSettled: () => {
        setTitle("");
        setDescription("");
        setSelectedColor("");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create KPI
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Create New KPI</DialogTitle>
          <DialogDescription>
            Define a new KPI with title, description, and color tag.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium mb-1 block">KPI Title</label>
            <Input
              placeholder="Enter KPI title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Description
            </label>
            <Textarea
              placeholder="Describe the KPI in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Color</label>
            <div className="flex space-x-3">
              {colors.map((color) => (
                <button
                  key={color}
                  className={clsx(
                    "w-8 h-8 rounded-md border-2 transition-all",
                    selectedColor === color
                      ? "border-black scale-105"
                      : "border-transparent hover:scale-105",
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating..." : "Create KPI"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
