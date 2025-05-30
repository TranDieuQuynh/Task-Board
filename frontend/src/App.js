import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskBoard from './components/TaskBoard';
import BoardList from './components/BoardList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/boards" element={<BoardList />} />
      <Route path="/board/:boardId" element={<TaskBoard />} />
    </Routes>
  );
}

export default App;