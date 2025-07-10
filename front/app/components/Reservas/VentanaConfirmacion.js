"use client";

import { useState } from "react";

export default function VentanaConfirmacion({ loading, onConfirm }) {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

  function confirmarAccion() {
    setShowForm(false);
    onConfirm();
  }

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className={`text-white text-sm font-medium px-4 py-1.5 rounded ${loading ? "bg-gray-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transition duration-300"}`}
        disabled={loading}
      >
        {loading ? "Confirmando..." : "Confirmar"}
      </button>

      {showForm && (
        <div
          className="absolute top-1/4 -translate-y-3/4 lg:top-1/2 lg:-translate-y-1/2 left-1/2 -translate-x-1/2 bg-white p-5 rounded-xl shadow-xl border w-80 z-10"
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowForm(false);
          }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            ¿Confirmar reserva?
          </h2>
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            ✕
          </button>
          <div className="flex flex-col gap-3">
            <button
              className={`mt-2 text-white py-2 px-4 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 transition duration-300`}
              onClick={confirmarAccion}
            >
              Confirmar reserva
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
