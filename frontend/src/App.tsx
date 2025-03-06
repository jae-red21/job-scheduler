import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorDashboard from "./components/SupervisorDashboard";
import TaskForm from "./components/TaskForm";
import tasks from "./tasks.json";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AgentDashboard from "./components/AgentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SupervisorDashboard tasks={tasks} />} />
        <Route path="/supervisor-dashboard" element={<SupervisorDashboard tasks={tasks} />}  />
        <Route path='/login' element={<Login />} />
        <Route path="/supervisor-dashboard/new-task" element={<TaskForm />} /> 
        <Route path='/agent-dashboard' element={<AgentDashboard tasks={tasks} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
