import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated() ? <Navigate to="/home" /> : <Login />} />
      <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;