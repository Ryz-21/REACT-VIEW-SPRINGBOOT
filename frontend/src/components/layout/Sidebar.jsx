import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  LogOut,
  Zap,
} from "lucide-react";
import SidebarItem from "../ui/SidebarItem";
import { useAuth } from "../../context/useAuth";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Departamentos",
      icon: Building2,
      path: "/departamentos",
    },
    {
      label: "Empleados",
      icon: Users,
      path: "/empleados",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col shadow-2xl border-r border-purple-500/30">
      
      {/* Header */}
      <div className="px-6 py-8 border-b border-purple-500/20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/40">
            <Zap size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Mi Sistema
            </h1>
            <p className="text-xs text-slate-400">Gestión Empresarial</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col flex-1 px-3 py-8 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">
          Menú Principal
        </p>

        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            label={item.label}
            icon={item.icon}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* Divider */}
      <div className="px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      </div>

      {/* Logout */}
      <div className="px-3 py-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-indigo-600/40 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/50"
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-purple-500/20 text-center bg-gradient-to-r from-slate-900 to-slate-800">
        <p className="text-xs text-slate-500">v1.0.0</p>
        <p className="text-xs text-purple-400/70 mt-1">
          ©2026 Mi Sistema
        </p>
      </div>
    </aside>
  );
}
