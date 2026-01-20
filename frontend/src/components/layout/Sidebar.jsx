import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "../../styless/Sidebar.css";

export default function Sidebar({ onSectionChange }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
    if (onSectionChange) {
      onSectionChange(section);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Botón para cerrar/abrir */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Header del Sidebar */}
      {isOpen && (
        <div className="sidebar-header">
          <h2>Menu</h2>
          <p className="user-info">Usuario: {user?.username}</p>
        </div>
      )}

      {/* Navegación */}
      <nav className="sidebar-nav">
        <div
          className={`nav-item ${activeSection === "dashboard" ? "active" : ""}`}
          onClick={() => handleSectionClick("dashboard")}
        >
          <span className="nav-icon">📊</span>
          {isOpen && <span>Dashboard</span>}
        </div>

        <div
          className={`nav-item ${activeSection === "departamentos" ? "active" : ""}`}
          onClick={() => handleSectionClick("departamentos")}
        >
          <span className="nav-icon">🏢</span>
          {isOpen && <span>Departamentos</span>}
        </div>

        <div
          className={`nav-item ${activeSection === "empleados" ? "active" : ""}`}
          onClick={() => handleSectionClick("empleados")}
        >
          <span className="nav-icon">👥</span>
          {isOpen && <span>Empleados</span>}
        </div>
      </nav>

      {/* Logout */}
      {isOpen && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
