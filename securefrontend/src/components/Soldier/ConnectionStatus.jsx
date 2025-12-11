import React from "react";

export default function ConnectionStatus({ connected }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-3 py-2"
      style={{
        borderBottom: "1px solid #222",
        background: "#0d0d0d",   
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <h5 className="mb-0" style={{ color: "#fff", fontWeight: 600 }}>
        Secure Military Chat
      </h5>

      
    </div>
  );
}
