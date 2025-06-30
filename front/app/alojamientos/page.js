"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AlojamientoCard from "@/app/components/AlojamientoCard";
import Filtros from "@/app/components/Filtros";

export default function Alojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);

  function buscarAlojamientos(req) {
    axios
      .get(req)
      .then((res) => setAlojamientos(res.data.alojamientos || []))
      .catch((err) => console.error("Error al obtener alojamientos:", err));
  }

  // mover a un servicio aparte
  useEffect(() => {
    // const req = nombre
    const req = "http://localhost:4000/alojamiento?limit=20";
    buscarAlojamientos(req);
  }, []);

  return (
    // <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-21 pb-10 px-4">
    <section className="min-h-screen bg-neutral-300 pt-21 pb-10 px-4">
      {/* Título principal */}
      {/* <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-10"> */}
      <Filtros onFilter={buscarAlojamientos} />
      <h1 className="text-4xl font-bold text-center text-black mb-10">
        🏡Listado de Alojamientos🏡
      </h1>

      {/* Contenedor de tarjetas */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {/* Cada alojamiento individual */}
        {alojamientos.map((aloj) => (
          <AlojamientoCard aloj={aloj} key={aloj._id} />
        ))}
      </div>
    </section>
  );
}
