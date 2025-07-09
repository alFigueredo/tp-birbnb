"use client";

import Filtros from "@/app/components/Filtros";

export default function BarraLateral({ filtros, setFiltros, sidebarOpen, setSidebarOpen  }) {
  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-0 left-2 lg:left-4 z-10 bg-stone-700 text-white px-3 py-2 rounded shadow hover:bg-stone-500"
      >
        Filtrar
      </button>

      <div
        className={`absolute top-0 left-0 w-80 bg-white z-40 shadow-lg transform transition-transform duration-300 ease-in-out rounded-lg ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onKeyDown={(e) => {
          if (e.key === "Escape") setSidebarOpen(false);
        }}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-3 right-3 p-1 text-gray-600 hover:text-black z-60"
        >
          ✕
        </button>

        <div className="p-4 mt-10 overflow-y-auto h-full rounded-lg">
          <Filtros filtros={filtros} setFiltros={setFiltros} />
        </div>
      </div>
    </>
  );
}
