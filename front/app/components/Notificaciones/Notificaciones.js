"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import NotificacionesLista from "@/app/components/Notificaciones/NotificacionesLista";
import { getNotificaciones, leerNotificacion } from "@/app/services/api";

export default function Notificaciones({ userId }) {
  const [mostrarNotis, setMostrarNotis] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);

  function toggleCampanita() {
    setMostrarNotis((prev) => !prev);
    if (!mostrarNotis) cargarNotificaciones();
  }

  function sortCriteria(a, b) {
    if (a.fechaAlta < b.fechaAlta) return 1;
    if (a.fechaAlta > b.fechaAlta) return -1;
    return 0;
  }

  const cargarNotificaciones = useCallback(() => {
    getNotificaciones(userId)
      .then(({ data }) =>
        setNotificaciones(data.length > 0 ? data.sort(sortCriteria) : []),
      )
      .catch((err) => console.error("Error al cargar notificaciones", err));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    cargarNotificaciones();
  }, [userId, cargarNotificaciones]);

  useEffect(() => {
    if (!userId) return;
    const intervalo = setInterval(() => cargarNotificaciones(), 1000);
    return () => clearInterval(intervalo);
  });

  function marcarComoLeida(idNoti) {
    leerNotificacion(idNoti)
      .then(() => {
        setNotificaciones((prev) =>
          prev.map((n) =>
            n._id === idNoti || n.id === idNoti ? { ...n, leida: true } : n,
          ),
        );
      })
      .catch((err) =>
        console.error("Error al marcar como leída la notificación", err),
      );
  }

  const sinLeerCount = notificaciones.filter((n) => !n.leida).length;

  return (
    <div className="relative px-1 mx-2">
      <button onClick={toggleCampanita} className="relative">
        <Image
          src="/noti.svg"
          alt="Notificaciones"
          width={24}
          height={24}
          className={`hover:opacity-80 ${sinLeerCount > 0 ? "animate-pulse" : ""}`}
        />
        {sinLeerCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
            {sinLeerCount}
          </span>
        )}
      </button>

      {mostrarNotis && (
        <NotificacionesLista
          notificaciones={notificaciones}
          marcarComoLeida={marcarComoLeida}
        />
      )}
    </div>
  );
}
