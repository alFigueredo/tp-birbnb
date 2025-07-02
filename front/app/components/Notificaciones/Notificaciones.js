"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import NotificacionesLista from "@/app/components/Notificaciones/NotificacionesLista";

export default function Notificaciones({ userId }) {
  const [mostrarNotis, setMostrarNotis] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [expandida, setExpandida] = useState(null); //para que se expanda

  function toggleCampanita() {
    setMostrarNotis((prev) => !prev);
    if (!mostrarNotis) cargarNotificaciones();
  }

  function cargarNotificaciones() {
    axios
      .get(`http://localhost:4000/usuario/${userId}/notificacion`)
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setNotificaciones(data);
        } else if (Array.isArray(data.notificaciones)) {
          setNotificaciones(data.notificaciones);
        } else {
          setNotificaciones([]);
        }
      })
      .catch((err) => console.error("Error al cargar notificaciones", err));
  }

  // useEffect(() => {
  //   setExpandida(null);
  //   if (userId) cargarNotificaciones();
  // }, [userId]);

  useEffect(() => {
    if (!userId) return;

    setExpandida(null);

    const intervalo = setInterval(() => cargarNotificaciones(), 1000);

    return () => clearInterval(intervalo);
  }, [userId]);

  function marcarComoLeida(idNoti) {
    axios
      .put(`http://localhost:4000/notificacion/${idNoti}/leer`)
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
    <div className="relative px-1">
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
          expandida={expandida}
          setExpandida={setExpandida}
          marcarComoLeida={marcarComoLeida}
        />
      )}
    </div>
  );
}
