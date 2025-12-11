import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./AdminDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BASE_URL = "http://localhost:8080/admin";

const api = axios.create({ baseURL: BASE_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function AdminDashboard() {
  const [me, setMe] = useState(null);
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatById, setChatById] = useState(null);
  const [chatIdQuery, setChatIdQuery] = useState("");

  const [privateChat, setPrivateChat] = useState([]);
  const [pcUser1, setPcUser1] = useState("");
  const [pcUser2, setPcUser2] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setMe(jwtDecode(token));
    } catch {}

    refreshAll();
  }, []);

  function refreshAll() {
    fetchUsers();
    fetchAllChats();
  }

  async function fetchUsers() {
    try {
      const res = await api.get("/getallusers");
      setUsers(res.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchAllChats() {
    try {
      const res = await api.get("/getallchat");
      setChats(res.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchChatById(e) {
    e.preventDefault();
    if (!chatIdQuery) return;

    try {
      const res = await api.get(`/getchat/${chatIdQuery}`);
      setChatById(res.data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchPrivateChat(e) {
    e.preventDefault();
    if (!pcUser1 || !pcUser2) return;

    try {
      const res = await api.get(
        `/getprivetchat?user1=${pcUser1}&user2=${pcUser2}`
      );
      setPrivateChat(res.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/deleteuser/${id}`);
      fetchUsers();
      alert("User deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  async function registerUser(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const payload = {
      username: form.get("username"),
      password: form.get("password"),
      role: form.get("roles"),
    };

    try {
      await api.post("/userregister", payload);
      fetchUsers();
      alert("User Registered Successfully!");
      e.target.reset();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="admin-dashboard-container">

      <div
        className="w-100 d-flex justify-content-between align-items-center px-3 py-3"
        style={{
          background: "#111827",
          borderBottom: "2px solid #1f2937",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <h4 className="m-0">Admin Dashboard</h4>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-light" onClick={refreshAll}>
            Refresh
          </button>

          <button
            className="btn btn-outline-warning"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/weaponmanager")}
          >
            Weapon Manager
          </button>
        </div>
      </div>

     
      <div className="container mt-4">

        <h3>Dashboard Overview</h3>
        {me?.sub && (
          <p className="text-muted">
            Logged in as: <strong>{me?.sub}</strong>
          </p>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

       
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h6>Total Users</h6>
              <h2>{users.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h6>Total Chats</h6>
              <h2>{chats.length}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h6>Admin</h6>
              <h2>{me?.sub || "Unknown"}</h2>
            </div>
          </div>
        </div>

        
        <div className="row g-4">

          
          <div className="col-lg-6">
            <div className="card shadow-sm p-3">
              <h4>Users</h4>
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.userId}>
                      <td>{u.userId}</td>
                      <td>{u.username}</td>
                      <td>{u.role}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteUser(u.userId)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        
          <div className="col-lg-6">
            <div className="card shadow-sm p-3">
              <h4>Register User</h4>

              <form onSubmit={registerUser} className="mt-2">
                <div className="mb-2">
                  <label className="form-label">Username</label>
                  <input className="form-control" name="username" required />
                </div>

                <div className="mb-2">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label">Roles</label>
                  <input
                    className="form-control"
                    name="roles"
                    placeholder="Admin,Soldier"
                  />
                </div>

                <button className="btn btn-primary w-100">
                  Register User
                </button>
              </form>
            </div>
          </div>
        </div>

        
        <div className="row g-4 mt-4">

         
          <div className="col-lg-6">
            <div className="card shadow-sm p-3">
              <h4>All Chats</h4>
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                {chats
                  .slice()
                  .reverse()
                  .map((c, i) => (
                    <div key={i} className="p-2 border rounded mb-2">
                      <strong>{c.sender}</strong> → {c.receiver}
                      <br />
                      <small>{c.content}</small>
                      <br />
                      <small className="text-muted">
                        {new Date(c.timestamp).toLocaleString()}
                      </small>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm p-3">

             
              <h4>Fetch Chat by ID</h4>
              <form onSubmit={fetchChatById} className="d-flex gap-2">
                <input
                  className="form-control"
                  placeholder="Chat ID"
                  value={chatIdQuery}
                  onChange={(e) => setChatIdQuery(e.target.value)}
                />
                <button className="btn btn-primary">Search</button>
              </form>

              {chatById && (
                <pre className="bg-light p-2 mt-3 rounded" style={{ maxHeight: "200px", overflow: "auto" }}>
                  {JSON.stringify(chatById, null, 2)}
                </pre>
              )}

              <hr />

             
              <h4>Private Chat</h4>
              <form onSubmit={fetchPrivateChat} className="row g-2">
                <div className="col-6">
                  <input
                    className="form-control"
                    placeholder="User 1"
                    value={pcUser1}
                    onChange={(e) => setPcUser1(e.target.value)}
                  />
                </div>

                <div className="col-6">
                  <input
                    className="form-control"
                    placeholder="User 2"
                    value={pcUser2}
                    onChange={(e) => setPcUser2(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <button className="btn btn-secondary w-100">
                    Load Private Chat
                  </button>
                </div>
              </form>

              <div className="mt-3" style={{ maxHeight: "200px", overflow: "auto" }}>
                {privateChat.map((msg, i) => (
                  <div key={i} className="p-2 border rounded mb-2">
                    <strong>{msg.sender}</strong>: {msg.content}
                    <br />
                    <small className="text-muted">
                      {new Date(msg.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
