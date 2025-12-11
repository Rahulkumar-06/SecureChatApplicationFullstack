import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Weapon.css";

export default function Weapon() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/public/weapons")
      .then((res) => {
        setWeapons(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={`loader-container ${darkMode ? "dark" : ""}`}>
        <h3>Loading Weapons...</h3>
      </div>
    );
  }

  return (
    <div className={`weapon-page ${darkMode ? "dark" : ""}`}>
      <div className="container">
     
        <div className="header">
          <h2>All Indian Weapons</h2>
          <div className="buttons">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>

        <div className="grid">
          {weapons.map((item) => (
            <div className="card" key={item.id}>
              {item.picture ? (
                <img
                  src={`data:image/jpeg;base64,${item.picture}`}
                  alt={item.weaponName}
                  className="card-image"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <div className="card-body">
                <h5>{item.weaponName}</h5>
                <p>{item.description || "No description available."}</p>
              </div>
              <div className="card-footer">Weapon • Public Gallery</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
