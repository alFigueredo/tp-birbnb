"use client";


import React, { useState } from "react";

export default function Formulario() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="relative">
      <button
        onClick={toggleForm}
        className="py-1.5 px-3 my-3 bg-neutral-200 rounded-md hover:bg-gray-300"
      >
        Reservar
      </button>

      {showForm && (
        <div className="absolute top-14 left-0 bg-white p-4 rounded shadow-md border w-80 z-10">
          <h2 className="text-lg font-semibold mb-2">Formulario de reserva</h2>
          <form className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Nombre"
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Cantidad de huespedes"
              className="border p-2 rounded"
              min = "0"
            />
            <label className="text-sm font-bold mt-2">Fecha de entrada</label>
            <input
              type="date"
              className="border p-2 rounded"
            />

            <label className="text-sm font-bold">Fecha de salida</label>
            <input
              type="date"
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
