"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AlojamientoCard from "@/app/components/AlojamientoCard";
import { useSearchParams } from "next/navigation";

// Dividir más en componentes

export default function Buscar() {
  const [alojamientos, setAlojamientos] = useState([]);
  const searchParams = useSearchParams();
  const [filtros, setFiltros] = useState({
    nombre: searchParams.get("nombre"),
  });
  const router = useRouter();

  function limpiarFiltros(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, val]) => val));
  }

  // function handleChange(campo, valor) {
  //   setFiltros((prev) => ({
  //     ...prev,
  //     [campo]: valor,
  //   }));
  // }

  // useEffect(() => {
  //   setFiltros({ ...filtros, nombre: searchParams.get("nombre") });
  //   setFiltros({
  //     ...filtros,
  //     cantHuespedes: searchParams.get("cantHuespedes"),
  //   });
  // }, []);

  useEffect(() => {
    const filtrosLimpios = limpiarFiltros(filtros);
    const queryString = new URLSearchParams(filtrosLimpios).toString();
    const req = queryString
      ? `http://localhost:4000/alojamiento?${queryString}&limit=20`
      : "http://localhost:4000/alojamiento?limit=20";
    axios
      .get(req)
      .then((res) => setAlojamientos(res.data.alojamientos || []))
      .catch((err) => console.error("Error al obtener alojamientos:", err));
  }, [filtros]);

  // function aplicarFiltros() {
  //   const filtrosLimpios = limpiarFiltros(filtros);
  //   const queryString = new URLSearchParams(filtros).toString();
  //   const link = queryString
  //     ? `/alojamientos/buscar?${queryString}&limit=20`
  //     : "/alojamientos/buscar?limit=20";

  //   // axios
  //   //   .get(req)
  //   //   .then((res) => setAlojamientos(res.data.alojamientos || []))
  //   //   .catch((err) => console.error("Error al obtener alojamientos:", err));

  //   router.push(link);
  // }

  return (
    // <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-21 pb-10 px-4">
    <div className="min-h-screen bg-gray-100 pt-21 pb-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-black mb-10">
        🏡Filtros🏡
      </h1>
      <div className="p-4 mb-7 bg-white shadow rounded-md space-y-3">
        <label htmlFor="nombre" className="block text-sm text-gray-700 mb-1">
          Nombre del alojamiento
        </label>
        <input
          className="bg-white w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2"
          id="nombre"
          type="text"
          placeholder="Buscar alojamientos..."
          value={filtros.nombre || ""}
          onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
        />
        <label htmlFor="ciudad" className="block text-sm text-gray-700 mb-1">
          Ciudad
        </label>
        <input
          className="bg-white w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2"
          id="ciudad"
          type="text"
          placeholder="Buscar por ciudad..."
          value={filtros.ciudad || ""}
          onChange={(e) => setFiltros({ ...filtros, ciudad: e.target.value })}
        />
        <label htmlFor="pais" className="block text-sm text-gray-700 mb-1">
          Pais
        </label>
        <input
          className="bg-white w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2"
          id="pais"
          type="text"
          placeholder="Buscar por pais..."
          value={filtros.pais || ""}
          onChange={(e) => setFiltros({ ...filtros, pais: e.target.value })}
        />

        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={wifi}
            onChange={(e) => setWifi(e.target.checked)}
          />
          <label>WiFi</label>
        </div> */}
        <label
          htmlFor="precioMinimo"
          className="block text-sm text-gray-700 mb-1"
        >
          Precio mínimo
        </label>
        <input
          id="precioMinimo"
          type="number"
          value={filtros.precioGt || 0}
          onChange={(e) => setFiltros({ ...filtros, precioGt: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <label
          htmlFor="precioMaximo"
          className="block text-sm text-gray-700 mb-1"
        >
          Precio máximo
        </label>
        <input
          id="precioMaximo"
          type="number"
          value={filtros.precioLt || 0}
          onChange={(e) => setFiltros({ ...filtros, precioLt: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <label
          htmlFor="cantHuespedes"
          className="block text-sm text-gray-700 mb-1"
        >
          Cantidad de huéspedes
        </label>
        <input
          id="cantHuespedes"
          type="number"
          value={filtros.cantHuespedes || 0}
          onChange={(e) =>
            setFiltros({ ...filtros, cantHuespedes: e.target.value })
          }
          className="w-full border px-3 py-2 rounded"
        />

        {/* <select */}
        {/*   value={tipo} */}
        {/*   onChange={(e) => setTipo(e.target.value)} */}
        {/*   className="w-full border px-3 py-2 rounded" */}
        {/* > */}
        {/*   <option value="">Tipo de alojamiento</option> */}
        {/*   <option value="cabaña">Cabaña</option> */}
        {/*   <option value="hotel">Hotel</option> */}
        {/*   <option value="hostel">Hostel</option> */}
        {/* </select> */}

        {/* <button
          onClick={aplicarFiltros}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Aplicar filtros
        </button> */}
      </div>
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center text-black mb-10">
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
