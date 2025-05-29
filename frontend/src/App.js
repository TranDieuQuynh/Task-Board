import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskBoard from './components/TaskBoard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/board/:boardId" element={<TaskBoard />} />
    </Routes>
  );
}

export default App;