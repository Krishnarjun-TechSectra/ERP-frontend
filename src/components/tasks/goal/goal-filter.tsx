"use client";

import React, { useState } from "react";
import {
  ViewTypeEnum,
  TaskStatusEnum,
} from "@erp/shared-schema";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { ChevronDownIcon, CalendarRange, X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUsers } from "@/lib/hooks/users/use-user";

interface GoalFilterDtoType {
  viewType?: ViewTypeEnum;
  selectedDate?: string; // ISO 'yyyy-mm-dd' or 'sv-SE' style string as you used
  assignedUserId?: string;
  status?: TaskStatusEnum | string;
  weightageLevel?: number;
}

interface GoalFilterProps {
  initialFilters?: Partial<GoalFilterDtoType>;
  onFilterChange: (filters: GoalFilterDtoType) => void;
  showDate?: boolean;
  showStatus?: boolean;
  showUser?: boolean;
  showWeightage?: boolean;
  className?: string;
}

const GoalFilter: React.FC<GoalFilterProps> = ({
  initialFilters = {},
  onFilterChange,
  showDate = true,
  showStatus = false,
  showUser = false,
  showWeightage = false,
  className = "",
}) => {
  const [filters, setFilters] = useState<GoalFilterDtoType>({
    viewType: initialFilters.viewType ?? ViewTypeEnum.DAILY,
    ...initialFilters,
  });

  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isYearSelectorOpen, setYearSelectorOpen] = useState(false);

  const { data: users = [], isLoading: usersLoading } = useUsers();

  const handleDateChange = (selectedDate?: Date) => {
    const updated: GoalFilterDtoType = {
      ...filters,
      selectedDate: selectedDate
        ? selectedDate.toLocaleDateString("sv-SE")
        : undefined,
    };
    setFilters(updated);
    onFilterChange(updated);
    setCalendarOpen(false);
  };

  const handleViewTypeChange = (viewType: ViewTypeEnum | string) => {
    if (!viewType || viewType === "") return;
    const updated: GoalFilterDtoType = {
      ...filters,
      viewType: viewType as ViewTypeEnum,
    };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleStatusChange = (status: TaskStatusEnum | string) => {
    const updated: GoalFilterDtoType = { ...filters, status };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleUserChange = (userId: string) => {
    const updated: GoalFilterDtoType = {
      ...filters,
      assignedUserId: userId === "all" ? undefined : userId,
    };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleWeightageChange = (val: string) => {
    const num = Number(val);
    const updated: GoalFilterDtoType = {
      ...filters,
      weightageLevel: Number.isNaN(num) ? undefined : num,
    };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleYearChange = (year: string) => {
    const selected = new Date(`${year}-01-01`);
    handleDateChange(selected);
    setYearSelectorOpen(false);
  };

  const handleClear = () => {
    const cleared: GoalFilterDtoType = {
      viewType: ViewTypeEnum.DAILY,
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const selectedDate = filters.selectedDate
    ? new Date(filters.selectedDate)
    : null;

  const years = Array.from({ length: 8 }, (_, i) => 2023 + i);

  return (
    <div
      className={`p-4 md:p-6 border border-gray-300 rounded-lg flex flex-wrap items-center gap-4 mb-4 shadow-sm ${className}`}
    >
      {/* Assignee */}
      {showUser && (
        <div className="flex items-center gap-2">
          <Label
            htmlFor="assignedUser"
            className="text-sm font-medium text-gray-600"
          >
            Assignee:
          </Label>
          <Select
            value={filters.assignedUserId ?? ""}
            onValueChange={handleUserChange}
            disabled={usersLoading}
          >
            <SelectTrigger className="w-48 text-sm">
              <SelectValue
                placeholder={usersLoading ? "Loading users..." : "Select assignee"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user: any) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* View Type */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-gray-600">View:</Label>
          <Select
            value={filters.viewType || ViewTypeEnum.DAILY}
            onValueChange={(value) => handleViewTypeChange(value as ViewTypeEnum)}
          >
            <SelectTrigger className="w-40 text-sm">
              <SelectValue placeholder="Select view type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ViewTypeEnum).map((view) => (
                <SelectItem key={view} value={view} className="capitalize">
                  {view.charAt(0) + view.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Date Filter */}
      {showDate && (
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-gray-600">
            {filters.viewType === ViewTypeEnum.DAILY
              ? "Select Date:"
              : filters.viewType === ViewTypeEnum.WEEKLY
                ? "Select Week Start:"
                : filters.viewType === ViewTypeEnum.MONTHLY
                  ? "Select Month:"
                  : "Select Year:"}
          </Label>

          {(filters.viewType === ViewTypeEnum.DAILY ||
            filters.viewType === ViewTypeEnum.WEEKLY ||
            filters.viewType === ViewTypeEnum.MONTHLY) && (
            <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-48 justify-between font-normal text-sm"
                >
                  <div className="flex items-center gap-2">
                    <CalendarRange className="w-4 h-4 text-gray-600" />
                    {selectedDate
                      ? filters.viewType === ViewTypeEnum.MONTHLY
                        ? selectedDate.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                          })
                        : selectedDate.toLocaleDateString()
                      : filters.viewType === ViewTypeEnum.MONTHLY
                        ? "Select month"
                        : "Select date"}
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate ?? undefined}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (filters.viewType === ViewTypeEnum.MONTHLY && date) {
                      const normalized = new Date(date.getFullYear(), date.getMonth(), 1);
                      handleDateChange(normalized);
                    } else {
                      handleDateChange(date);
                    }
                  }}
                  defaultMonth={selectedDate ?? new Date()}
                />
              </PopoverContent>
            </Popover>
          )}

          {filters.viewType === ViewTypeEnum.YEARLY && (
            <Select
              open={isYearSelectorOpen}
              onOpenChange={setYearSelectorOpen}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="w-40 text-sm">
                <SelectValue
                  placeholder={
                    selectedDate ? selectedDate.getFullYear().toString() : "Select year"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}

      {/* Status */}
      {showStatus && (
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-gray-600">Status:</Label>
          <Select
            value={(filters.status as string) ?? ""}
            onValueChange={(val) => handleStatusChange(val as TaskStatusEnum)}
          >
            <SelectTrigger className="w-40 text-sm">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              {Object.values(TaskStatusEnum).map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Weightage */}
      {showWeightage && (
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-gray-600">Weightage:</Label>
          <Select
            value={filters.weightageLevel ? String(filters.weightageLevel) : ""}
            onValueChange={handleWeightageChange}
          >
            <SelectTrigger className="w-32 text-sm">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any</SelectItem>
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Clear */}
      {Object.keys(filters).length > 0 && (
        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex items-center gap-1 text-gray-700 hover:text-red-500 text-sm"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalFilter;
