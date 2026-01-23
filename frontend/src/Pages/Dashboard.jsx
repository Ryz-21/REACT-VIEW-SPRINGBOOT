import React from "react";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-slate-600">
        Bienvenido, <span className="font-semibold">{user?.username}</span>
      </p>
    </div>
  );
}
