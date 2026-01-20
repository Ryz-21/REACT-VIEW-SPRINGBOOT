import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import DepartamentosList from "../components/departamentos/DepartamentosList.jsx";
import EmpleadosList from "../components/empleados/EmpleadosList.jsx";
import "../styless/Home.css";

export default function Home() {
    const [activeSection, setActiveSection] = useState("dashboard");

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="home-container">
            <Sidebar onSectionChange={handleSectionChange} />
            <div className="main-content">
                {activeSection === "dashboard" && <Dashboard />}
                {activeSection === "departamentos" && <DepartamentosList />}
                {activeSection === "empleados" && <EmpleadosList />}
            </div>
        </div>
    );
}