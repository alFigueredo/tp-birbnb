"use client";

import { useState } from "react";
import axios from "axios";
import { useUsuario } from "@/app/context/UserContext";

export default function Formulario({ aloja }) {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  const { usuarioActual } = useUsuario();
  const [detallesReserva, setDetallesReserva] = useState({});
  const [mensaje, setMensaje] = useState("");

  async function reservar(e) {
    e.preventDefault();
    setMensaje("");

    if (!usuarioActual) {
      setMensaje("Debés seleccionar un usuario.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/reserva", {
        huespedReservador: usuarioActual._id,
        cantHuespedes: detallesReserva.cantHuespedes,
        alojamiento: aloja._id,
        rangoFechas: {
          fechaInicio: new Date(detallesReserva.fechaInicio),
          fechaFin: new Date(detallesReserva.fechaFin),
        },
        precioPorNoche: aloja.precioPorNoche,
      });

      setMensaje("✅ ¡Reserva creada con éxito!");
      setDetallesReserva({
        ...detallesReserva,
        fechaInicio: "",
        fechaFin: "",
      });
    } catch (err) {
      console.error("Error al crear la reserva:", err);
      setMensaje("❌ Ocurrió un error al reservar.");
    }
  }

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
      >
        Reservar
      </button>

      {showForm && (
        <div className="absolute top-14 left-0 bg-white p-5 rounded-xl shadow-xl border w-80 z-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            🥳Reserva tu estadía🥳
          </h2>
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
              required
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
              required
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
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
            >
              Enviar
            </button>
            {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
