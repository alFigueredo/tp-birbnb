"use client";

import { useState } from "react";
import axios from "axios";
import AlojamientoCard from "@/app/components/AlojamientoCard";
import SkeletonCard from "@/app/components/SkeletonCard";
import BarraLateral from "@/app/components/BarraLateral";

export default function Alojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [pagina, setPagina] = useState({});
  const [loading, setLoading] = useState(true);

  function limpiarFiltros(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([key, val]) => val && val.length !== 0 && key !== "cantPaginas",
      ),
    );
  }

  // Cambiar la api a un lugar aparte
  function buscarAlojamientos(filtros) {
    const filtrosLimpios = limpiarFiltros({ ...filtros, ...pagina });
    const queryString = new URLSearchParams(filtrosLimpios).toString();
    const req = queryString
      ? `http://localhost:4000/alojamiento?${queryString}`
      : `http://localhost:4000/alojamiento`;
    // console.debug(req);
    axios
      .get(req)
      .then((res) => {
        setAlojamientos(res.data.alojamientos || []);
        setPagina({
          page: res.data.page || 1,
          limit: res.data.limit || 12,
          total: res.data.total || 0,
          cantPaginas: parseInt(res.data.total / res.data.limit) + 1 || 1,
        });
      })
      .catch((err) => console.error("Error al obtener alojamientos:", err))
      .finally(() => setLoading(false));
  }

  return (
    <section className="min-h-screen bg-stone-100 pt-21 pb-10 px-4">
      <BarraLateral onFilter={buscarAlojamientos} />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 tracking-normal drop-shadow-sm hover:text-blue-800 transition-colors duration-300">
        🏡Listado de Alojamientos🏡
      </h1>

      {/* Contenedor de tarjetas */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : alojamientos.map((aloj) => (
              <AlojamientoCard key={aloj._id} aloj={aloj} />
            ))}
      </div>

      {/* Paginador */}
      {pagina.cantPaginas > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(pagina.cantPaginas)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setPagina({ ...pagina, page })}
                className={`px-3 py-1 border rounded transition ${
                  pagina.page === page
                    ? "bg-blue-700 text-white"
                    : "bg-white hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
