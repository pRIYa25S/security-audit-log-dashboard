# Security Audit Log Dashboard (Full-Stack)

A high-performance full-stack security operations and audit telemetry tracking application designed to ingest, filter, sort, search, and paginate thousands of system log records seamlessly.

---

## 🚀 Live Links
* **Frontend Application (Vercel):** [https://security-audit-log-dashboard-five.vercel.app](https://security-audit-log-dashboard-five.vercel.app)
* **Backend API (Render):** [https://security-audit-log-dashboard.onrender.com](https://security-audit-log-dashboard.onrender.com)
* **GitHub Repository:** [https://github.com/pRIYa25S/security-audit-log-dashboard](https://github.com/pRIYa25S/security-audit-log-dashboard)

---

## 🛠️ Tech Stack & Architecture Overview

| Component | Technology | Technical Decision & Rationale |
| :--- | :--- | :--- |
| **Frontend** | React.js, Custom CSS | Built with a modular component architecture and responsive design, utilizing server-driven states for instant filters and sorting feedback. |
| **Backend** | Node.js, Express.js | Structured with dedicated RESTful API routes handling heavy query parsing before hitting the database layer. |
| **Database** | MongoDB Atlas, Mongoose | Uses indexed collections to ensure lightning-fast text searching and sorting over massive log datasets. |
| **Deployment** | Vercel & Render | Separated frontend and backend deployment pipelines to optimize cold-start performance and CI/CD reliability. |

---

## 📦 Local Setup Instructions

### Prerequisites
* Node.js installed on your machine
* MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone the Repository

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


### Key Engineering Decisions

1.Server-Side Pagination & Filtering:

Pagination, sorting (sortBy, order), search queries (search), and severity/status filters are handled directly on the backend via Mongoose queries to ensure extreme scalability.

2.Bulk Upload Simulation (/api/logs/upload):

Implemented a bulk insertion endpoint handling batch mock generation (1,000+ records) via InsertMany for quick stress-testing and database seeding.

3.Monorepo Separation of Concerns:

Maintained explicit frontend/ and backend/ directories to support distinct build pipelines on Vercel and Render respectively.

