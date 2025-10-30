import React from 'react'
import TaskCard from './overdue-task.card'

  const tasks = [
    {
      id: 1,
      title: "Monday Messages",
      description: "Send weekly Monday messages to all team members",
      assignee: "John Doe",
      priority: "high",
      dueDate: "Oct 19, 2025",
      priorityColor: "bg-red-100 text-red-700",
    },
    {
      id: 2,
      title: "5 referral a week",
      description: "Collect and process 5 referrals this week",
      assignee: "John Doe",
      priority: "medium",
      dueDate: "Oct 23, 2025",
      priorityColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: 3,
      title: "Assignment Flyer",
      description: "Design and create assignment flyer for distribution",
      assignee: "John Doe",
      priority: "high",
      dueDate: "Oct 21, 2025",
      priorityColor: "bg-red-100 text-red-700",
    },
    {
      id: 4,
      title: "Team Meeting Prep",
      description: "Prepare agenda and materials for weekly team meeting",
      assignee: "John Doe",
      priority: "high",
      dueDate: "Oct 20, 2025",
      priorityColor: "bg-red-100 text-red-700",
    },
    {
      id: 5,
      title: "Client Presentation",
      description: "Create and finalize client presentation slides",
      assignee: "John Doe",
      priority: "medium",
      dueDate: "Oct 22, 2025",
      priorityColor: "bg-yellow-100 text-yellow-700",
    },
  ]

const OverdueTasks = () => {
  return (
   <div className="rounded-xl border border-gray-200 p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold text-foreground">Overdue Tasks</h1>
            <div className=" font-semibold bg-gray-200 text-sm rounded-full px-2.5 py-1">{tasks.length}</div>
          </div>

          {/* Scrollable Cards Section */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-overlay">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
  )
}

export default OverdueTasks