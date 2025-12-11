import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function AdminWeaponManager() {
  const [weapons, setWeapons] = useState([]);
  const [formMode, setFormMode] = useState("add");
  const [weaponId, setWeaponId] = useState(null);
  const [weaponName, setWeaponName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080/admin";

  useEffect(() => {
    fetchWeapons();
  }, []);

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchWeapons = () => {
    axios
      .get("http://localhost:8080/public/weapons")
      .then((res) => setWeapons(res.data))
      .catch(() => Swal.fire("Error", "Failed to load weapons", "error"));
  };

  const resetForm = () => {
    setFormMode("add");
    setWeaponId(null);
    setWeaponName("");
    setDescription("");
    setPicture(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("weaponName", weaponName);
    formData.append("description", description);
    if (picture) formData.append("picture", picture);

    if (formMode === "add") {
      axios
        .post(`${BASE_URL}/addweapon`, formData, axiosConfig)
        .then(() => {
          Swal.fire("Success", "Weapon added!", "success");
          resetForm();
          fetchWeapons();
        })
        .catch(() => Swal.fire("Error", "Could not add weapon", "error"));
    } else {
      axios
        .put(`${BASE_URL}/updateweapon/${weaponId}`, formData, axiosConfig)
        .then(() => {
          Swal.fire("Success", "Weapon updated!", "success");
          resetForm();
          fetchWeapons();
        })
        .catch(() => Swal.fire("Error", "Could not update weapon", "error"));
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This weapon will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/deleteweapon/${id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then(() => {
            Swal.fire("Deleted!", "Weapon removed.", "success");
            fetchWeapons();
          })
          .catch(() => Swal.fire("Error", "Could not delete weapon", "error"));
      }
    });
  };

  const handleEdit = (item) => {
    setFormMode("update");
    setWeaponId(item.weaponId || item.id);
    setWeaponName(item.weaponName);
    setDescription(item.description);
    setPreview(item.picture ? `data:image/jpeg;base64,${item.picture}` : null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPicture(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", paddingBottom: "40px" }}>

      
      <div
        className="w-100 d-flex justify-content-between align-items-center px-3 py-3"
        style={{
          background: "#1e293b",
          borderBottom: "2px solid #334155",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <h4 className="m-0">Weapon Manager</h4>

        <button className="btn btn-outline-light" onClick={() => navigate("/admindashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="container mt-4">

        <h2 className="fw-bold text-white mb-4 text-center">Admin Weapon Manager</h2>

        <div className="row g-4">

         
          <div className="col-12 col-md-5">
            <div
              className="p-3 rounded"
              style={{
                background: "#1e293b",
                color: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              }}
            >
              <h4 className="fw-bold mb-3 text-info">
                {formMode === "add" ? "Add New Weapon" : "Update Weapon"}
              </h4>

              <form onSubmit={handleSubmit}>
                <label className="form-label fw-semibold">Weapon Name</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={weaponName}
                  onChange={(e) => setWeaponName(e.target.value)}
                  required
                />

                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                <label className="form-label fw-semibold">Picture</label>
                <input type="file" className="form-control" onChange={handleImageChange} />

                {preview && (
                  <img
                    src={preview}
                    className="img-fluid rounded mt-3"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                )}

                <button className="btn btn-primary w-100 mt-3">
                  {formMode === "add" ? "Add Weapon" : "Update Weapon"}
                </button>

                {formMode === "update" && (
                  <button className="btn btn-secondary w-100 mt-2" type="button" onClick={resetForm}>
                    Cancel Update
                  </button>
                )}
              </form>
            </div>
          </div>

          
          <div className="col-12 col-md-7">
            <h4 className="fw-bold mb-3 text-white">All Weapons</h4>

            <div className="row g-3">
              {weapons.map((item) => (
                <div className="col-12 col-sm-6" key={item.weaponId || item.id}>
                  <div
                    className="rounded shadow-sm h-100"
                    style={{ background: "#1e293b", color: "white" }}
                  >
                    {item.picture ? (
                      <img
                        src={`data:image/jpeg;base64,${item.picture}`}
                        style={{ height: "180px", width: "100%", objectFit: "cover", borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}
                      />
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center bg-dark"
                        style={{ height: "180px", color: "#999" }}
                      >
                        No Image
                      </div>
                    )}

                    <div className="p-3">
                      <h6 className="fw-bold text-info">{item.weaponName}</h6>

                      <p className="text-light opacity-75" style={{ fontSize: "0.85rem" }}>
                        {item.description?.substring(0, 80)}...
                      </p>

                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.weaponId || item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
