import React from 'react';
import { task } from '../types/task';
import { NavLink } from 'react-router-dom';

type Props = {
    tasks: task[]
}

const SupervisorDashboard = ( {tasks}: Props) => {
  const theadStyle = "py-2 px-4 border-b font-semibold text-left";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
        <NavLink
          to="/supervisor-dashboard/new-task"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Task
        </NavLink>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className={`${theadStyle}`}>Title</th>
              <th className={`${theadStyle}`}>Priority</th>
              <th className={`${theadStyle}`}>Created At</th>
              <th className={`${theadStyle}`}>Is-Assigned</th>
              <th className={`${theadStyle}`}>Status</th>
              <th className={`${theadStyle}`}></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {task.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {task.priority}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {task.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {task.isAssigned ? "Assigned" : "Not Yet"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
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