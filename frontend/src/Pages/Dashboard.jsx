import React from "react";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Bienvenido, {user?.username}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}