# Security Audit Log Dashboard (Full-Stack)

A high-performance full-stack security operations and audit telemetry tracking application designed to ingest, filter, sort, search, and paginate thousands of system log records seamlessly.

---

## 🚀 Live Links
* **Frontend Application (Vercel):** [https://security-audit-log-dashboard-five.vercel.app](https://security-audit-log-dashboard-five.vercel.app)
* **Backend API (Render):** [https://security-audit-log-dashboard.onrender.com](https://security-audit-log-dashboard.onrender.com)
* **GitHub Repository:** [https://github.com/pRIYa25S/security-audit-log-dashboard](https://github.com/pRIYa25S/security-audit-log-dashboard)

---

## 🛠️ Tech Stack
* **Frontend:** React.js, Custom CSS (Responsive Grid & Flexbox)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose ODM
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## 📦 Local Setup Instructions

### Prerequisites
* Node.js installed on your machine
* MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone the Repository
```bash
git clone [https://github.com/pRIYa25S/security-audit-log-dashboard.git](https://github.com/pRIYa25S/security-audit-log-dashboard.git)
cd security-audit-log-dashboard

### 2. Configure and Run the Backend
cd backend
npm install
Create a .env file inside the backend folder with the following configuration:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
Start the Server:
node server.js

### 3. Configure and Run the Frontend
Open a new terminal window, navigate to the frontend folder, and start the development server:
cd frontend
npm install
npm start

