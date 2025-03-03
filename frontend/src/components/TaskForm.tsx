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

        <div className="mb-6">
          <label htmlFor="priority" className="block text-lg font-medium text-gray-700 mb-2">
            Priority
          </label>
          <input
            id="priority"
            type="number"
            placeholder="Lower number = higher priority"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
