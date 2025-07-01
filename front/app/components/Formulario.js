"use client";

import React, { useState } from "react";

export default function Formulario() {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);

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
          <h2 className="text-xl font-bold mb-4 text-gray-800">🥳Reserva tu estadía🥳</h2>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nombre completo"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="number"
              placeholder="Cantidad de huéspedes"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              min="1"
            />
            <label className="text-sm font-medium text-gray-600 mb-1">Fecha de entrada</label>
            <input type="date" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />

            <label className="text-sm font-medium text-gray-600 mb-1">Fecha de salida</label>
            <input type="date" className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button
              type="submit"
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
