import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorDashboard from "./components/SupervisorDashboard";
import TaskForm from "./components/TaskForm";
import tasks from "./tasks.json";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<SupervisorDashboard tasks={tasks} />} />

        <Route path="/supervisor-dashboard/new-task" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
