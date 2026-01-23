import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import DepartamentosList from "./components/departamentos/DepartamentosList";
import EmpleadosList from "./components/empleados/EmpleadosList";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departamentos" element={<DepartamentosList />} />
        <Route path="/empleados" element={<EmpleadosList />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
