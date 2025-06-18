"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AlojamientoCard from "@/app/components/AlojamientoCard";
import { useSearchParams } from "next/navigation";

export default function Alojamientos() {
  const searchParams = useSearchParams();
  const nombre = searchParams.get("nombre");
  const [alojamientos, setAlojamientos] = useState([]);
  console.debug("nombre: ", nombre);

  useEffect(() => {
    const req = nombre
      ? `http://localhost:4000/alojamiento/buscar?nombre=${encodeURIComponent(
          nombre
        )}&limit=20`
      : "http://localhost:4000/alojamiento/buscar?limit=20";
    console.debug("req: ", req);
    axios
      // .get("http://localhost:4000/alojamiento")
      .get(req)
      .then((res) => setAlojamientos(res.data.alojamientos || []))
      .catch((err) => console.error("Error al obtener alojamientos:", err));
  }, [nombre]);

  return (
    // <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-21 pb-10 px-4">
    <div className="min-h-screen bg-gray-100 pt-21 pb-10 px-4">
      <div className="p-4 bg-white shadow rounded-md space-y-3">
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Tipo de alojamiento</option>
          <option value="cabaña">Cabaña</option>
          <option value="hotel">Hotel</option>
          <option value="hostel">Hostel</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={wifi}
            onChange={(e) => setWifi(e.target.checked)}
          />
          <label>WiFi</label>
        </div>

        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={aplicarFiltros}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Aplicar filtros
        </button>
      </div>
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-10">
        🏡Listado de Alojamientos🏡
      </h1>

      {/* Contenedor de tarjetas */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {/* Cada alojamiento individual */}
        {alojamientos.map((aloj) => (
          <AlojamientoCard aloj={aloj} key={aloj._id} />
        ))}
      </div>
    </div>
  );
}
