"use client";

import { useCallback, useEffect, useState } from "react";
import { useUsuario } from "@/app/context/UserContext";
import ReservasCard from "@/app/components/Reservas/ReservasCard";
import SkeletonCard from "@/app/components/Reservas/SkeletonCard";
import { getReservas, getReservasAnfitrion } from "@/app/services/api";

export default function ReservasList() {
  const { usuarioActual } = useUsuario();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  function sortCriteria(a, b) {
    if (a.fechaAlta < b.fechaAlta) return 1;
    if (a.fechaAlta > b.fechaAlta) return -1;
    return 0;
  }

  const obtenerReservas = useCallback(() => {
    if (usuarioActual.tipo === "HUESPED")
      getReservas(usuarioActual._id)
        .then((res) => setReservas(res.data.sort(sortCriteria)))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    else
      getReservasAnfitrion(usuarioActual._id)
        .then((res) => setReservas(res.data.sort(sortCriteria)))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
  }, [usuarioActual]);

  useEffect(() => {
    if (!usuarioActual) return;
    obtenerReservas(usuarioActual);
  }, [usuarioActual, obtenerReservas]);

  return (
    <div className="min-h-screen bg-neutral-200 pt-21 pb-10 px-4">
      <h1 className="text-4xl font-bold text-center text-black mb-10">
        📅 Reservas 📅
      </h1>

      {!loading && reservas.length === 0 && (
        <p className="text-center text-gray-600 mb-8">
          Este ID no posee reservas❌.
        </p>
      )}

      {/* RESERVAS DEL USUARIO */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : reservas.map((reserva, index) => (
              <ReservasCard
                key={index}
                reserva={reserva}
                obtenerReservas={obtenerReservas}
              />
            ))}
      </div>
    </div>
  );
}
