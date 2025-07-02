"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUsuario } from "@/app/context/UserContext";
import ReservasCard from "../components/Reservas/ReservasCard";

export default function ReservasList() {
  const { usuarioActual } = useUsuario();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    if (!usuarioActual) return;

    axios
      .get(`http://localhost:4000/usuario/${usuarioActual._id}/reserva`)
      .then((res) => setReservas(res.data))
      .catch((err) => console.error(err));
  }, [usuarioActual]);

  return (
    <div className="min-h-screen bg-neutral-200 pt-21 pb-10 px-4">
      <h1 className="text-4xl font-bold text-center text-black mb-10">
        📅 Reservas 📅
      </h1>

      {reservas.length === 0 && (
        <p className="text-center text-gray-600 mb-8">
          Este ID no posee reservas❌.
        </p>
      )}

      {/* RESERVAS DEL USUARIO */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {reservas.map((reserva, index) => (
          <ReservasCard key={index} reserva={reserva} />
        ))}
      </div>
    </div>
  );
}
