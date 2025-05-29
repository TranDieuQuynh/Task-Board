import { create } from 'zustand';

// Khôi phục user từ localStorage (nếu có)
const persistedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const useStore = create((set) => ({
  user: persistedUser, 
  board: null,
  tasks: [],
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); 
    } else {
      localStorage.removeItem('user'); // Xóa user khỏi localStorage khi đăng xuất
    }
  },
  setBoard: (board) => set({ board }),
  setTasks: (tasks) => set({ tasks }),
}));

export default useStore;