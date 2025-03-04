import React from "react";

const TaskForm = () => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Task</h2>
      <form>
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add 
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
