import { useState } from "react";
import SidebarItem from "../ui/SidebarItem";

export default function Sidebar({ onSectionChange }) {
    const [active, setActive] = useState("dashboard");

    const handleClick = (section) => {
        setActive(section);
        onSectionChange(section);
    };

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
            
            {/* Logo / título */}
            <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
                Mi Sistema
            </div>

            {/* Menú */}
            <nav className="flex-1 px-3 py-4 space-y-2">
                <SidebarItem
                    icon="📊"
                    label="Dashboard"
                    active={active === "dashboard"}
                    onClick={() => handleClick("dashboard")}
                />
                <SidebarItem
                    icon="🏢"
                    label="Departamentos"
                    active={active === "departamentos"}
                    onClick={() => handleClick("departamentos")}
                />
                <SidebarItem
                    icon="👥"
                    label="Empleados"
                    active={active === "empleados"}
                    onClick={() => handleClick("empleados")}
                />
            </nav>

        </aside>
    );
}
