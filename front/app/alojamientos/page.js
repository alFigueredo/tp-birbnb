"use client";

import { useCallback, useEffect, useState } from "react";
import AlojamientoCard from "@/app/components/Alojamientos/AlojamientoCard";
import SkeletonCard from "@/app/components/Alojamientos/SkeletonCard";
import BarraLateral from "@/app/components/BarraLateral";
import { getAlojamientos } from "../services/api";
import Paginador from "../components/Alojamientos/Paginador";

export default function Alojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [pagina, setPagina] = useState({ page: 1 });
  const [filtros, setFiltros] = useState({
    caractPedidas: [],
  });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); //para el dezplazamiento al abrir filtros

  function limpiarFiltros(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([key, val]) => val && val.length !== 0 && key !== "cantPaginas",
      ),
    );
  }

  const buscarAlojamientos = useCallback(() => {
    const filtrosLimpios = limpiarFiltros({
      ...filtros,
      page: pagina.page,
    });
    setLoading(true);
    getAlojamientos(filtrosLimpios)
      .then((res) => {
        setAlojamientos(res.data.alojamientos || []);
        const cantPaginas = parseInt(res.data.total / res.data.limit) + 1 || 1;
        const nueva = {
          page: Math.min(res.data.page, cantPaginas) || 1,
          limit: res.data.limit || 12,
          total: res.data.total || 0,
          cantPaginas,
        };
        setPagina(nueva);
      })
      .catch((err) => console.error("Error al obtener alojamientos:", err))
      .finally(() => setLoading(false));
  }, [filtros, pagina.page]);

  useEffect(() => {
    buscarAlojamientos(filtros, pagina.page);
  }, [filtros, pagina.page, buscarAlojamientos]);

  return (
    <section className="min-h-screen bg-stone-100 pt-21 pb-10 px-4">
      <div className="relative min-h-250"> 
      <div className={`${sidebarOpen ? "md:ml-80" : "ml-0"} transition-all duration-300 px-4`}> 
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10 tracking-normal drop-shadow-sm hover:text-blue-800 transition-colors duration-300">
        🏡Listado de Alojamientos🏡
      </h1>

      <BarraLateral filtros={filtros} setFiltros={setFiltros} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      
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
        <Paginador pagina={pagina} setPagina={setPagina} />
      )}
    </div>
    </div>
    </section>
  );
}
