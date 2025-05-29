Task Board - Ứng Dụng Quản Lý Công Việc
Task Board là một ứng dụng web đơn giản giúp người dùng quản lý công việc cá nhân. Người dùng có thể đăng ký, đăng nhập, xem danh sách công việc (board), thêm, chỉnh sửa, xóa công việc, và quản lý board. Ứng dụng được xây dựng với React (front-end), Node.js/Express (back-end), và PostgreSQL làm cơ sở dữ liệu.
Tổng Quan
Ứng dụng bao gồm các tính năng chính:

Đăng ký tài khoản với email, username, và password.
Đăng nhập bằng username và password.
Xem board với 4 công việc mặc định (Task in Progress, Task to do, Task Completed, Task Won't Do).
Thêm, chỉnh sửa (tên, mô tả, icon, trạng thái), và xóa công việc.
Chỉnh sửa tên và mô tả board.
Board được truy cập bằng ID duy nhất (UUID).

Công Nghệ Sử Dụng

Front-end: React, Zustand (quản lý trạng thái), Tailwind CSS (giao diện).
Back-end: Node.js, Express, Sequelize (ORM).
Database: PostgreSQL.
Khác: UUID (tạo ID duy nhất), bcrypt (mã hóa mật khẩu).

Dưới đây là một số hình ảnh minh họa của ứng dụng:
Trang Đăng Nhập
![Login Page](./img_readme/login.png)


Trang Đăng Ký
![Login Page](./img_readme/sign-up.png)

Trang Board
![Login Page](./img_readme/board.png)

Chỉnh Sửa Task

Cài Đặt Và Chạy Ứng Dụng
Yêu Cầu Hệ Thống

Node.js: Phiên bản v22.16.0.
PostgreSQL: Phiên bản v17.
npm: Đi kèm với Node.js.

Cài Đặt
1. Cài Đặt PostgreSQL

Tải và cài đặt PostgreSQL từ https://www.postgresql.org/download/.
Tạo database task_board:psql -U postgres
CREATE DATABASE task_board;


Ghi chú username (postgres) và mật khẩu (mặc định trong code là 123456789).

2. Clone Dự Án
Clone dự án về máy:
git clone <https://github.com/TranDieuQuynh/Task-Board.git>
cd task-board

3. Cài Đặt Back-end

Di chuyển vào thư mục backend:cd backend


Cài đặt các dependency:npm install


Cấu hình kết nối database:
Mở file backend/config/database.js.
Cập nhật thông tin kết nối PostgreSQL (username, password, host, port):const sequelize = new Sequelize('task_board', 'postgres', 'your_password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false,
});




Chạy back-end:npm start

Back-end sẽ chạy trên http://localhost:5000.

4. Cài Đặt Front-end

Di chuyển vào thư mục frontend:cd frontend


Cài đặt các dependency:npm install


Chạy front-end:npm start

Front-end sẽ chạy trên http://localhost:3000.

Truy Cập Ứng Dụng

Mở trình duyệt và truy cập http://localhost:3000.
Đăng ký tài khoản tại /signup, sau đó đăng nhập để xem board.

Cấu Trúc Thư Mục
Back-end
backend/
├── config/
│   └── database.js        # Cấu hình kết nối PostgreSQL
├── models/
│   ├── User.js           # Model User
│   ├── Board.js          # Model Board
│   └── Task.js           # Model Task
├── routes/
│   ├── user.js           # API cho user (signup, login)
│   ├── board.js          # API cho board
│   └── task.js           # API cho task
├── server.js             # File chính của server
└── package.json          # Dependency và script

Front-end
frontend/
├── public/
│   └── index.html        # File HTML chính
├── src/
│   ├── components/
│   │   ├── Login.js      # Component đăng nhập
│   │   ├── Signup.js     # Component đăng ký
│   │   ├── TaskBoard.js  # Component hiển thị board
│   │   └── TaskCard.js   # Component hiển thị task
│   ├── store/
│   │   └── index.js      # Zustand store
│   ├── App.js            # Component chính
│   ├── index.js          # Điểm vào của React
│   └── index.css         # CSS chính
├── package.json          # Dependency và script
└── tailwind.config.js    # Cấu hình Tailwind CSS

API Endpoints
User

POST /api/user/signup: Đăng ký tài khoản.
Payload: {"email": "test@example.com", "password": "test123", "username": "testuser"}
Response: Status 201, trả về user và boardId.


POST /api/user/login: Đăng nhập.
Payload: {"username": "testuser", "password": "test123"}
Response: Status 200, trả về user và boardId.



Board

GET /api/boards/:board-id: Lấy thông tin board theo ID.
Response: Status 200, trả về board và tasks.


POST /api/boards: Tạo board mới.
Payload: {"name": "New Board", "UserId": "<userId>"}
Response: Status 201, trả về board.


PUT /api/boards/:board-id: Cập nhật board.
Payload: {"name": "Updated Board"}
Response: Status 200, trả về board đã cập nhật.


DELETE /api/boards/:board-id: Xóa board.
Response: Status 200, trả về {"message": "Board deleted"}.



Task

POST /api/tasks: Tạo task mới.
Payload: {"BoardId": "<boardId>", "name": "New Task", "status": "To Do", "icon": "📝"}
Response: Status 201, trả về task.


PUT /api/tasks/:task-id: Cập nhật task.
Payload: {"name": "Updated Task", "status": "Completed"}
Response: Status 200, trả về task đã cập nhật.


DELETE /api/tasks/:task-id: Xóa task.
Response: Status 200, trả về {"message": "Task deleted"}.



Tác Giả

Tên: Trần Diệu Quỳnh
Ngày hoàn thành: 29/05/2025

