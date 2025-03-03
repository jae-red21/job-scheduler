import React from "react";

const AgentDashboard = () => {
  return (
    <div>
      <div>
        <h1>Welcome</h1>
        <button type="submit">Add Task</button>
      </div>
      <div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentDashboard;
