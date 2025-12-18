import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./SoldiersList.css";

export default function SoldiersList() {
  const [soldiers, setSoldiers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("No token found");
      return;
    }

  
    const decodedToken = jwtDecode(token);
    const loggedInUsername =
      decodedToken.username || decodedToken.sub; 

    console.log("Logged-in username from token:", loggedInUsername);

    axios
      .get("http://localhost:8080/soldier/allsoldier", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("All soldiers:", res.data);

       
        const filteredSoldiers = res.data.filter(
          (s) =>
            s.username.trim().toLowerCase() !==
            loggedInUsername.trim().toLowerCase()
        );

        setSoldiers(filteredSoldiers);
      })
      .catch((err) => {
        console.error("Failed to load soldiers:", err);
      });
  }, [token]);

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
            key={s.userId}
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
