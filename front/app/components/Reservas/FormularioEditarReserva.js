"use client";

import { useState } from "react";
import { useUsuario } from "@/app/context/UserContext";
import { putReserva } from "@/app/services/api";

export default function FormularioEditarReserva({ reserva, obtenerReservas }) {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  const { usuarioActual } = useUsuario();
  const [detallesReserva, setDetallesReserva] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [loadingReserva, setLoadingReserva] = useState(false);

  function parseDateAsLocal(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return new Date(+year, +month - 1, +day); // new Date(year, monthIndex, day)
  }

  async function reservar(e) {
    e.preventDefault();
    setMensaje("");
    setLoadingReserva(true);

    if (!usuarioActual) {
      setMensaje("Debés seleccionar un usuario.");
      return;
    }

    const reservaEditada = {
      _id: reserva._id,
      cantHuespedes: detallesReserva.cantHuespedes || reserva.cantHuespedes,
      rangoFechas: {
        fechaInicio: detallesReserva.fechaInicio
          ? parseDateAsLocal(detallesReserva.fechaInicio)
          : reserva.rangoFechas.fechaInicio,
        fechaFin: detallesReserva.fechaFin
          ? parseDateAsLocal(detallesReserva.fechaFin)
          : reserva.rangoFechas.fechaFin,
      },
    };

    try {
      await putReserva(reservaEditada);

      setMensaje("✅ ¡Reserva editada con éxito!");
      obtenerReservas();
      setDetallesReserva({
        ...detallesReserva,
        fechaInicio: "",
        fechaFin: "",
      });
    } catch (err) {
      console.error("Error al editar la reserva:", err);
      setMensaje("❌ " + err.response.data.message);
    } finally {
      setLoadingReserva(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded"
      >
        Editar
      </button>

      {showForm && (
        <div
          className="absolute top-1/4 -translate-y-3/4 lg:top-1/2 lg:-translate-y-1/2 left-1/2 -translate-x-1/2 bg-white p-5 rounded-xl shadow-xl border w-80 z-10"
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowForm(false);
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            🥳Editá tu reserva🥳
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✕
          </button>
          <form onSubmit={reservar} className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Cantidad de huéspedes"
              value={detallesReserva.cantHuespedes || ""}
              onChange={(e) =>
                setDetallesReserva({
                  ...detallesReserva,
                  cantHuespedes: e.target.value,
                })
              }
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              min="1"
            />
            <label className="text-sm font-medium text-gray-600 mb-1">
              Fecha de entrada
            </label>
            <input
              type="date"
              value={detallesReserva.fechaInicio || ""}
              onChange={(e) =>
                setDetallesReserva({
                  ...detallesReserva,
                  fechaInicio: e.target.value,
                })
              }
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <label className="text-sm font-medium text-gray-600 mb-1">
              Fecha de salida
            </label>
            <input
              type="date"
              value={detallesReserva.fechaFin || ""}
              onChange={(e) =>
                setDetallesReserva({
                  ...detallesReserva,
                  fechaFin: e.target.value,
                })
              }
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className={`mt-2 text-white py-2 px-4 rounded-lg font-medium ${loadingReserva ? "bg-gray-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transition duration-300"}`}
              disabled={loadingReserva}
            >
              {loadingReserva ? "Enviando..." : "Enviar"}
            </button>
            {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
            {loadingReserva && (
              <span className="ml-2 animate-spin h-5 w-5">⏳</span>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
