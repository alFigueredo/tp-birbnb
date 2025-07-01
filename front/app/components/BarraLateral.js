"use client";

import { useState } from "react";
import Filtros from "@/app/components/Filtros";

export default function BarraLateral({ onFilter }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Botón para abrir */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-24 left-4 z-50 bg-stone-700 text-white px-3 py-2 rounded shadow hover:bg-stone-500"
      >
        Filtrar
      </button>

      {/* Fondo oscuro (opcional) */}
      {/* {sidebarOpen && ( */}
      {/*   <div */}
      {/*     className="fixed inset-0 bg-black bg-opacity-30 z-40" */}
      {/*     onClick={() => setSidebarOpen(false)} */}
      {/*   /> */}
      {/* )} */}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Botón para cerrar */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {/* Contenido del sidebar */}
        <div className="p-4 mt-10 overflow-y-auto h-full">
          <Filtros onFilter={onFilter} />
        </div>
      </div>
    </>
  );
}
