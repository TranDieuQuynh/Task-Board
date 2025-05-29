import { useState, useEffect } from 'react';

function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description || '');
  const [icon, setIcon] = useState(task.icon);
  const [status, setStatus] = useState(task.status);

  // Danh sách icon khả dụng
  const iconOptions = {
    'In Progress': ['🚀', '📋', '🔔', '📅'],
    'Completed': ['✅', '📋', '🔔', '📅'],
    "Won't do": ['❌', '📋', '🔔', '📅'],
  };

  // Icon mặc định dựa trên trạng thái
  const defaultIcons = {
    'In Progress': '🚀',
    'Completed': '✅',
    "Won't do": '❌',
  };

  // Cập nhật icon mặc định khi trạng thái thay đổi
  useEffect(() => {
    if (!isEditing) return; // Chỉ cập nhật khi đang chỉnh sửa
    // Nếu icon hiện tại không nằm trong danh sách icon của trạng thái mới, đặt về icon mặc định
    if (!iconOptions[status].includes(icon)) {
      setIcon(defaultIcons[status]);
    }
  }, [status, isEditing, icon]);

  const handleSave = () => {
    onUpdate(task.id, { name, description, icon, status });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            rows="3"
          />
          {/* Dropdown để chọn icon */}
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            {iconOptions[status].map((iconOption) => (
              <option key={iconOption} value={iconOption}>
                {iconOption}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Won't do">Won't do</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{task.icon}</span>
            <h3 className="text-lg font-semibold">{task.name}</h3>
          </div>
          <p className="text-gray-600 mt-2">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">Status: {task.status}</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;