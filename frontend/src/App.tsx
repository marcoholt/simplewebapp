import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface ApiStatus {
  message: string;
  version: string;
  environment: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statusResponse, usersResponse] = await Promise.all([
        axios.get('/api/status'),
        axios.get('/api/users')
      ]);
      
      setApiStatus(statusResponse.data);
      setUsers(usersResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data from backend');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ name: '', email: '', role: 'user' });
    } catch (err) {
      setError('Failed to create user');
      console.error('Error creating user:', err);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Deployment Test App v2.0</h1>
        <p>Testing CI/CD, Terraform, Docker, and Kubernetes Skills - Updated via GitHub Actions!</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error">
            ⚠️ {error}
            <button onClick={fetchData}>Retry</button>
          </div>
        )}

        {apiStatus && (
          <section className="status-section">
            <h2>📊 Backend Status</h2>
            <div className="status-card">
              <p><strong>Message:</strong> {apiStatus.message}</p>
              <p><strong>Version:</strong> {apiStatus.version}</p>
              <p><strong>Environment:</strong> {apiStatus.environment}</p>
              <p><strong>Timestamp:</strong> {new Date(apiStatus.timestamp).toLocaleString()}</p>
            </div>
          </section>
        )}

        <section className="users-section">
          <h2>👥 Users Management</h2>
          
          <div className="user-form">
            <h3>Add New User</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit">Add User</button>
            </form>
          </div>

          <div className="users-list">
            <h3>Current Users ({users.length})</h3>
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <h4>{user.name}</h4>
                  <p>📧 {user.email}</p>
                  <p>🔑 {user.role}</p>
                  <span className="user-id">ID: {user.id}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>Built for testing deployment and infrastructure skills</p>
        <p>Frontend: React + TypeScript | Backend: Express.js</p>
      </footer>
    </div>
  );
};

export default App;
