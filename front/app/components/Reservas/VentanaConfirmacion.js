"use client";

import { useState } from "react";

export default function VentanaConfirmacion({ visible, onClose, onConfirm }) {
  const [motivo, setMotivo] = useState("");

  if (!visible) return null;

  function confirmar(motivo) {
    onClose();
    onConfirm(motivo);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-md rounded-lg sm:rounded-xl shadow-lg p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
          ¿Estás seguro de cancelar la reserva?
        </h2>

        <label
          htmlFor="motivoCancelacion"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Motivo de cancelación
        </label>
        <textarea
          id="motivoCancelacion"
          className="w-full p-2 border border-gray-300 rounded mb-4 resize-none"
          rows="3"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Especificá un motivo si lo deseás..."
        />

        <div className="flex justify-end gap-2 flex-wrap">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancelar
          </button>
          <button
            onClick={() => confirmar(motivo)}
            className="flex-1 sm:flex-none px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
