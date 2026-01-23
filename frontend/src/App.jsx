import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Ruta login */}
      <Route path="/login" element={<Login />} />
      
      {/* Rutas autenticadas con MainLayout */}
      <Route
        path="/home"
        element={
          isAuthenticated() ? (
            <MainLayout>
              <Home />
            </MainLayout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? (
            <MainLayout>
              <div>Dashboard</div>
            </MainLayout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/departamentos"
        element={
          isAuthenticated() ? (
            <MainLayout>
              <div>Departamentos</div>
            </MainLayout>
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/empleados"
        element={
          isAuthenticated() ? (
            <MainLayout>
              <div>Empleados</div>
            </MainLayout>
          ) : (
            <Login />
          )
        }
      />
      
      {/* Ruta raíz - por defecto muestra login */}
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
