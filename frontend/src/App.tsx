import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorDashboard from "./components/SupervisorDashboard";
import TaskForm from "./components/TaskForm";
import tasks from "./tasks.json";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        
        <Route path="/" element={<SupervisorDashboard tasks={tasks} />} />

        <Route path="/supervisor-dashboard/new-task" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
