"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Notificaciones({ userId }) {
  const [mostrarNotis, setMostrarNotis] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [expandida, setExpandida] = useState(null);    //para que se expanda

  function toggleCampanita() {
    setMostrarNotis((prev) => !prev);
    if (!mostrarNotis) cargarNotificaciones();
  }

  function cargarNotificaciones() {
    fetch(`http://localhost:4000/usuario/${userId}/notificacion`)
      .then((res) => res.json())
      .then((data) => {
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

   useEffect(() => {
    if (userId) cargarNotificaciones();
   }, [userId]);

  function marcarComoLeida(idNoti) {
    fetch(`http://localhost:4000/notificacion/leer/${idNoti}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => {
      setNotificaciones((prev) =>
          prev.map((n) =>
            n._id === idNoti || n.id === idNoti ? { ...n, leida: true } : n
          )
        );
      })
      .catch((err) =>
        console.error("Error al marcar como leída la notificación", err)
      );
  }

  const sinLeerCount = notificaciones.filter((n) => !n.leida).length;

  return (
    <div className="relative">
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
        <div className="absolute right-0 mt-2 w-72 bg-white text-black border shadow rounded-md p-2 max-h-64 overflow-auto z-50">
          <h4 className="text-center font-bold mb-2">Notificaciones</h4>
          {notificaciones.length === 0 ? (
            <p className="text-center text-sm">No hay notificaciones.</p>
          ) : (
            notificaciones.map((n, i) => {
              const estaExpandida = expandida === i;
              const textoCorto =
                n.mensaje.length > 25
                  ? n.mensaje.slice(0, 25) + "..."
                  : n.mensaje;

              return (
                <div
                  key={i}
                  onClick={() => {
                    setExpandida(estaExpandida ? null : i); 
                    if (!n.leida) marcarComoLeida(n._id || n.id || i);
                  }}
                  className={`border-b py-2 px-3 text-sm rounded transition-all duration-200 cursor-pointer ${
                    n.leida
                      ? "text-gray-500 bg-white"
                      : "bg-yellow-50 text-black font-semibold "
                  }`}
                >
                  {!n.leida && <span className="mr-1">📩</span>}
                  {estaExpandida ? n.mensaje : textoCorto}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}