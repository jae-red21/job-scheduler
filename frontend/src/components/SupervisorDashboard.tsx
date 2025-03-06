import React from "react";
import { task } from "../types/task";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

type Props = {
  tasks: task[];
};

const SupervisorDashboard = ({ tasks }: Props) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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

  const theadStyle = "py-2 px-4 border-b font-semibold text-left";

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Welcome, {user?.username}
        </h1>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className={`${theadStyle}`}>Title</th>
              <th className={`${theadStyle} hidden md:table-cell`}>Priority</th>
              <th className={`${theadStyle} hidden md:table-cell`}>Created At</th>
              <th className={`${theadStyle} hidden md:table-cell`}>Is-Assigned</th>
              <th className={`${theadStyle}`}>Status</th>
              <th className={`${theadStyle} hidden md:table-cell`}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800">
                  <NavLink
                    to="/supervisor-dashboard/task-detail"
                    className="hover:text-blue-400"
                  >
                    {task.name}
                  </NavLink>
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800 hidden md:table-cell">
                  {task.priority}
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800 hidden md:table-cell">
                  {formatDate(task.createdAt)}{" "}
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800 hidden md:table-cell">
                  {task.isAssigned ? "Assigned" : "Not Yet"}
                </td>
                <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-800">
                  {task.isCompleted ? "Completed" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupervisorDashboard;