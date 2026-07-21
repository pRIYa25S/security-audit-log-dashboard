import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  
  const [stats, setStats] = useState({ total: 0, high: 0, resolved: 0, unresolved: 0 });
  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [page, severity, status, search, sortBy, order]);

  const fetchLogs = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/logs?page=${page}&limit=10&severity=${severity}&status=${status}&search=${search}&sortBy=${sortBy}&order=${order}`
      );
      const data = await response.json();
      setLogs(data.logs || []);
      setTotalPages(data.totalPages || 1);
      setTotalLogs(data.totalLogs || 0);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(
  `https://security-audit-log-dashboard.onrender.com/api/logs?page=${page}&limit=10&severity=${severity}&status=${status}&search=${search}&sortBy=${sortBy}&order=${order}`
);
          if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
     
    }
  };

  const handleBulkUploadMock = async () => {
    const bulkLogs = [];
    for (let i = 1; i <= 1000; i++) {
      bulkLogs.push({
        action: i % 2 === 0 ? "DELETE USER" : "LOGIN",
        actor: `user${i}@company.com`,
        role: i % 5 === 0 ? "admin" : "engineer",
        resource: `/api/resources/${i}`,
        ipAddress: `192.168.1.${i % 255}`,
        region: "ap-south-1",
        severity: i % 3 === 0 ? "HIGH" : "INFO",
        status: i % 4 === 0 ? "Resolved" : "Unresolved",
        timestamp: new Date(Date.now() - i * 1000).toISOString()
      });
    }

    try {
      const res = await fetch('http://localhost:5000/api/logs/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bulkLogs)
      });
      if (res.ok) {
        alert("Bulk upload successful!");
        fetchLogs();
      }
    } catch (err) {
      console.error("Bulk upload failed", err);
    }
  };

  const startIdx = totalLogs === 0 ? 0 : (page - 1) * 10 + 1;
  const endIdx = Math.min(page * 10, totalLogs);

  return (
    <div className="dashboard-container">
      {/* Header with Bulk Upload Action */}
      <header className="dashboard-header">
        <div>
          <h1>System Logs Dashboard</h1>
          <p>Security operations and audit telemetry tracking</p>
        </div>
        <button onClick={handleBulkUploadMock} className="btn-upload">
          ⚡ Bulk Upload (1k Logs)
        </button>
      </header>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Logs</span>
          <span className="stat-value">{totalLogs}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">High Severity</span>
          <span className="stat-value text-red">
            {logs.filter(l => l.severity === 'HIGH').length || '—'}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Resolved</span>
          <span className="stat-value text-green">
            {logs.filter(l => l.status === 'Resolved').length || '—'}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Unresolved</span>
          <span className="stat-value text-orange">
            {logs.filter(l => l.status === 'Unresolved').length || '—'}
          </span>
        </div>
      </div>

      {/* Controls Card */}
      <div className="controls-card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search action, actor, resource..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <div className="filters-group">
          <select value={severity} onChange={(e) => { setSeverity(e.target.value); setPage(1); }}>
            <option value="">All Severities</option>
            <option value="INFO">INFO</option>
            <option value="HIGH">HIGH</option>
          </select>

          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="">All Statuses</option>
            <option value="Resolved">Resolved</option>
            <option value="Unresolved">Unresolved</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="timestamp">Sort by Time</option>
            <option value="severity">Sort by Severity</option>
          </select>

          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table Card with Sticky Header */}
      <div className="table-card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Severity</th>
                <th>Action</th>
                <th>Actor</th>
                <th>Role</th>
                <th>Resource</th>
                <th>IP Address</th>
                <th>Region</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id}>
                    <td className="text-muted">{new Date(log.timestamp).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${log.severity === 'HIGH' ? 'badge-high' : 'badge-info'}`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="fw-bold">{log.action}</td>
                    <td>{log.actor}</td>
                    <td><span className="badge-role">{log.role || 'engineer'}</span></td>
                    <td className="font-code">{log.resource}</td>
                    <td className="font-code">{log.ipAddress}</td>
                    <td>{log.region || 'ap-south-1'}</td>
                    <td>
                      <span className={`status-dot ${log.status === 'Resolved' ? 'status-resolved' : 'status-unresolved'}`}></span>
                      {log.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">No logs found matching criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls with "Showing X-Y of Z" */}
        <div className="pagination-footer">
          <span className="page-indicator">
            Showing <strong>{startIdx}–{endIdx}</strong> of <strong>{totalLogs}</strong> records
          </span>
          <div className="pagination-buttons">
            <button 
              onClick={() => setPage(p => Math.max(p - 1, 1))} 
              disabled={page === 1}
              className="btn-page"
            >
              Previous
            </button>
            <span className="page-current">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(p + 1, totalPages))} 
              disabled={page >= totalPages}
              className="btn-page"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;