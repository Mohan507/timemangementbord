"use client";
import React, { useState } from "react";

const days = ["Jan 21", "Jan 22", "Jan 23", "Jan 24", "Jan 25"];

interface Task {
  id: number;
  description: string;
  hours: number;
  project: string;
  type: string;
}

export default function WeeklyTimesheetPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      description: "Homepage Development",
      hours: 4,
      project: "Project Name",
      type: "Development",
    },
    {
      id: 2,
      description: "API Integration",
      hours: 3,
      project: "Project Name",
      type: "Development",
    },
    {
      id: 3,
      description: "Bug Fixes",
      hours: 2,
      project: "Project Name",
      type: "Bug Fix",
    },
  ]);

  const [newTask, setNewTask] = useState({
    description: "",
    hours: 1,
    project: "Project Name",
    type: "Bug fixes",
  });

  const addTask = () => {
    const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    setTasks([...tasks, { id, ...newTask }]);
    setIsOpen(false);
    setNewTask({
      description: "",
      hours: 1,
      project: "Project Name",
      type: "Bug fixes",
    });
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id: number) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (!taskToEdit) return;

    setNewTask({
      description: taskToEdit.description,
      hours: taskToEdit.hours,
      project: taskToEdit.project,
      type: taskToEdit.type,
    });
    setEditingTaskId(id); // mark that we are editing
    setIsOpen(true); // open modal
  };
  const saveTask = () => {
    if (editingTaskId !== null) {
      // update existing task
      setTasks(
        tasks.map((t) => (t.id === editingTaskId ? { ...t, ...newTask } : t)),
      );
    } else {
      // add new task
      const id = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
      setTasks([...tasks, { id, ...newTask }]);
    }

    // reset modal state
    setIsOpen(false);
    setNewTask({
      description: "",
      hours: 1,
      project: "Project Name",
      type: "Bug fixes",
    });
    setEditingTaskId(null);
  };
  const projects = [
    "Project Alpha",
    "Project Beta",
    "Project Gamma",
    "Project Delta",
  ];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full px-6 lg:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-semibold text-gray-800">ticktock</h1>
            <span className="hidden sm:block text-sm text-gray-500">
              Timesheets
            </span>
          </div>
          <div className="text-sm text-gray-600">John Doe ▾</div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  This week’s timesheet
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  21 - 25 January, 2024
                </p>
              </div>

              {/* Progress */}
              <div className="w-full sm:w-64">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>
                    {tasks.reduce((sum, t) => sum + t.hours, 0)}/40 hrs
                  </span>
                  <span>
                    {Math.min(
                      100,
                      Math.floor(
                        (tasks.reduce((sum, t) => sum + t.hours, 0) / 40) * 100,
                      ),
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (tasks.reduce((sum, t) => sum + t.hours, 0) / 40) * 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Days */}
            <div className="space-y-6">
              {days.map((day) => (
                <div key={day} className="flex flex-col sm:flex-row gap-4">
                  {/* Date Column */}
                  <div className="w-20 text-sm font-medium text-gray-700">
                    {day}
                  </div>

                  {/* Tasks */}
                  <div className="flex-1 space-y-3">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 hover:bg-gray-50 transition"
                      >
                        <div className="text-sm text-gray-700">
                          {task.description}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{task.hours} hrs</span>
                          <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
                            {task.project}
                          </span>
                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveMenu(
                                  activeMenu === task.id ? null : task.id,
                                )
                              }
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ⋯
                            </button>

                            {activeMenu === task.id && (
                              <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md z-20">
                                <button
                                  onClick={() => {
                                    editTask(task.id);
                                    setActiveMenu(null);
                                  }}
                                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    deleteTask(task.id);
                                    setActiveMenu(null);
                                  }}
                                  className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Task */}
                    <button
                      onClick={() => setIsOpen(true)}
                      className="w-full border border-dashed border-gray-300 rounded-md py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition"
                    >
                      + Add new task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm py-5 text-center">
              <p className="text-xs text-gray-400">
                © 2024 tentwenty. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Add New Entry
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Project *
                </label>
                <select
                  value={newTask.project}
                  onChange={(e) =>
                    setNewTask({ ...newTask, project: e.target.value })
                  }
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {projects.map((proj) => (
                    <option key={proj} value={proj}>
                      {proj}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type of Work *
                </label>
                <select
                  value={newTask.type}
                  onChange={(e) =>
                    setNewTask({ ...newTask, type: e.target.value })
                  }
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Bug fixes</option>
                  <option>Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Task description *
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Write text here ..."
                  className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hours *
                </label>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      setNewTask({
                        ...newTask,
                        hours: Math.max(1, newTask.hours - 1),
                      })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  >
                    –
                  </button>
                  <div className="px-6 py-2 border-t border-b border-gray-300 text-sm">
                    {newTask.hours}
                  </div>
                  <button
                    onClick={() =>
                      setNewTask({ ...newTask, hours: newTask.hours + 1 })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-4 px-6 py-5 border-t bg-gray-50">
              <button
                onClick={saveTask}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 text-sm font-medium transition"
              >
                {editingTaskId ? "Update entry" : "Add entry"}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-100 rounded-lg py-2.5 text-sm font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
