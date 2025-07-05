"use client";

import { useState } from "react";
import Filtros from "@/app/components/Filtros";

export default function BarraLateral({ onFilter }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-18 lg:top-21 left-4 z-10 bg-stone-700 text-white px-3 py-2 rounded shadow hover:bg-stone-500"
      >
        Filtrar
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-3 right-3 p-1 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <div className="p-4 mt-10 overflow-y-auto h-full">
          <Filtros onFilter={onFilter} />
        </div>
      </div>
    </>
  );
}
