import React, { useState } from "react";
import { task } from "../types/task";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

type AgentProps = {
  tasks: task[];
};

const AgentDashboard = ({ tasks }: AgentProps) => {
  const [taskList, setTaskList] = useState<task[]>(tasks);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    navigate("/login");
  }

  const handleMarkComplete = (id: number) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );
  };

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Welcome, {user?.username}
        </h1>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Task
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {taskList.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                  <NavLink
                    to="/agent-dashboard/task-detail"
                    className="hover:text-blue-400"
                  >
                    {task.name}
                  </NavLink>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 hidden md:table-cell">
                  {task.priority}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 hidden md:table-cell">
                  {formatDate(task.createdAt)}{" "}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleMarkComplete(task.id)}
                    className="bg-green-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentDashboard;