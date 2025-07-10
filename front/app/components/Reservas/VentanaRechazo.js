"use client";

import { useState } from "react";

export default function VentanaRechazo({ loading, onConfirm }) {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  const [motivo, setMotivo] = useState("");

  function confirmarAccion() {
    setShowForm(false);
    onConfirm(motivo);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className={`text-white text-sm font-medium px-4 py-1.5 rounded ${loading ? "bg-gray-800 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 transition duration-300"}`}
        disabled={loading}
      >
        {loading ? "Rechazando..." : "Rechazar"}
      </button>

      {showForm && (
        <div
          className="absolute top-1/4 -translate-y-3/4 lg:top-1/2 lg:-translate-y-1/2 left-0 -translate-x-2/3 bg-white p-5 rounded-xl shadow-xl border w-80 z-10"
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowForm(false);
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            ¿Confirmar rechazo?
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✕
          </button>
          <div className="flex flex-col gap-3">
            <label
              htmlFor="motivoRechazo"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Motivo de rechazo
            </label>
            <textarea
              id="motivoRechazo"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows="3"
              value={motivo || ""}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Especificá un motivo si lo deseás..."
            />
            <button
              className={`mt-2 text-white py-2 px-4 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 transition duration-300`}
              onClick={confirmarAccion}
            >
              Rechazar reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
