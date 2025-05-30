import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../store';
import TaskCard from './TaskCard';
import { SERVER } from '../constants';

function TaskBoard() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { user, board, tasks, setBoard, setTasks, setUser } = useStore();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`${SERVER}/api/boards/${boardId}`);
        const data = await response.json();
        setBoard(data.board);
        setTasks(data.tasks);
        setBoardName(data.board.name);
        setBoardDesc(data.board.description || '');
      } catch (error) {
        console.error('Fetch board error:', error);
      }
    };
    if (user) {
      fetchBoard();
    }
  }, [boardId, setBoard, setTasks, user]);

  const [boardName, setBoardName] = useState('');
  const [boardDesc, setBoardDesc] = useState('');

  const updateBoard = async () => {
    try {
      await fetch(`${SERVER}/api/boards/${boardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: boardName, description: boardDesc }),
      });
    } catch (error) {
      console.error('Update board error:', error);
    }
  };

  const addTask = async () => {
  try {
    // Đặt icon mặc định dựa trên trạng thái
    const defaultIcon = '🚀'; 
    const response = await fetch(`http://localhost:5000/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ BoardId: boardId, name: 'New Task', status: 'In Progress', icon: defaultIcon }),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  } catch (error) {
    console.error('Add task error:', error);
  }
};

  const updateTask = async (taskId, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      console.error('Update task error:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Delete task error:', error);
    }
  };

  const handleLogout = () => {
    setUser(null); // Xóa user khỏi Zustand và localStorage
    navigate('/');
  };

  const columns = {
    'In Progress': tasks.filter((task) => task.status === 'In Progress'),
    'Completed': tasks.filter((task) => task.status === 'Completed'),
    "Won't do": tasks.filter((task) => task.status === "Won't do"),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            onBlur={updateBoard}
            className="text-2xl font-bold p-2 rounded w-full"
          />
          <textarea
            value={boardDesc}
            onChange={(e) => setBoardDesc(e.target.value)}
            onBlur={updateBoard}
            className="w-full p-2 mt-2 border rounded"
            placeholder="Board description"
            rows="3"
          />
        </div>
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded mb-8 hover:bg-blue-600"
        >
          Add New Task
        </button>
        <div className="grid grid-cols-3 gap-4">
          {Object.keys(columns).map((status) => (
            <div key={status} className="bg-gray-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{status}</h2>
              {columns[status].map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;