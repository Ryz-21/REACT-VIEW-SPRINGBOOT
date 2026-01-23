import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import DepartamentosList from "../components/departamentos/DepartamentosList.jsx";
import EmpleadosList from "../components/empleados/EmpleadosList.jsx";

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar onSectionChange={setActiveSection} />

      <main className="flex-1 p-6 overflow-y-auto">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "departamentos" && <DepartamentosList />}
        {activeSection === "empleados" && <EmpleadosList />}
      </main>
    </div>
  );
}
