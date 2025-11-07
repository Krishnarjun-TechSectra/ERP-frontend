import { formatDateString } from "@/lib/utils/date-parser";
import { useDraggable } from "@dnd-kit/core";
import { TaskSchemaType } from "@erp/shared-schema";
import { Calendar } from "lucide-react";
import { useState } from "react";

export const TaskCard = ({
  task,
  onClick,
}: {
  task: TaskSchemaType;
  onClick: (task: TaskSchemaType) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => setDragging(false);
  const handleMouseMove = () => setDragging(true);
  const handleMouseUp = () => {
    if (!dragging) onClick(task); // open modal only if not dragged
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="bg-white px-4 py-6 rounded-lg shadow cursor-grab hover:shadow-md transition"
    >
      <h3 className="font-medium text-base text-black">{task.title}</h3>
      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
        <Calendar size={12} /> {formatDateString(task.deadline)}
      </div>
    </div>
  );
};
