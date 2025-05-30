import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store';
import { SERVER } from '../constants';

function BoardList() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchBoards();
  }, [user, navigate]);

//   `${SERVER}/api/user/login`
  const fetchBoards = async () => {
    try {
      const response = await fetch(`${SERVER}/api/user/${user.id}/boards`);
      const data = await response.json();
      setBoards(data.boards);
    } catch (error) {
      console.error('Fetch boards error:', error);
    }
  };

  const createBoard = async (e) => {
    e.preventDefault();
    if (!newBoardName.trim()) {
      alert('Please enter a board name');
      return;
    }
    try {
      const response = await fetch(`${SERVER}/api/boards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newBoardName,
          UserId: user.id 
        }),
      });
      const newBoard = await response.json();
      setBoards([...boards, newBoard]);
      setNewBoardName('');
    } catch (error) {
      console.error('Create board error:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Boards</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <form onSubmit={createBoard} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name"
              className="flex-1 p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
            >
              Create New Board
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boards.map((board) => (
            <div
              key={board.id}
              onClick={() => navigate(`/board/${board.id}`)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold mb-2">{board.name}</h2>
              {board.description && (
                <p className="text-gray-600">{board.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoardList; 