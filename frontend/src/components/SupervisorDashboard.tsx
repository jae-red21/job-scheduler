import React from 'react'

const SupervisorDashboard = () => {
    const theadStyle ="py-2 px-4 border-b font-semibold text-left"
    const tdStyle="py-2 px-4 border-b"
  return (
    <div>
      <div>
        <h1>Welcome</h1>
        <button type="submit">Add Task</button>
      </div>
      <div>
        <table className="min-w-full bg-white border border-gray-300">
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
            <tbody>
                
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default SupervisorDashboard