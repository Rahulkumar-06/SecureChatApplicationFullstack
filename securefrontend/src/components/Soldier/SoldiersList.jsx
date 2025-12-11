import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SoldiersList.css";

export default function SoldiersList() {
  const [soldiers, setSoldiers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/soldier/allsoldier")
      .then((res) => setSoldiers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const openChat = (soldierUsername) => {
    navigate(`/chat/${soldierUsername}`);
  };

  return (
    <div className="soldier-container">
      
      
      <div className="soldier-header">
        <h2 className="title">Members</h2>
      </div>

      <div className="soldier-grid">
        {soldiers.map((s) => (
          <div
            key={s.id}
            className="soldier-card"
            onClick={() => openChat(s.username)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="avatar"
              alt="soldier"
            />
            <h5 className="soldier-name">@{s.username}</h5>
            <p className="soldier-role">{s.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
