"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Alojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    axios
      // .get("http://localhost:4000/alojamiento")
      .get("http://localhost:4000/alojamiento?limit=20")
      .then((res) => setAlojamientos(res.data.alojamientos || []))
      .catch((err) => console.error("Error al obtener alojamientos:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-21 pb-10 px-4">
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-10">
        🏡Listado de Alojamientos🏡
      </h1>

      

      {/* Contenedor de tarjetas */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {/* Cada alojamiento individual */}
        {alojamientos.map((aloj) => (
          <div
            key={aloj._id}
            className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:hover:bg-gray-900 transition duration-400 p-6 border border-gray-500"
          >
            {/*MOSTRAMOS las fotos */}
            {aloj.fotos && aloj.fotos.length > 0 && (
              <div className="mb-4">
                {aloj.fotos.map((foto, index) => (
                  <Link key={foto._id} href={`/alojamientos/${aloj._id}`}>
                    <Image
                      key={index}
                      width={320}
                      height={240}
                      src={foto.path}
                      alt={`Foto de ${aloj.nombre} - ${
                        foto.descripcion || index + 1
                      }`}
                      className="h-48 object-cover rounded-md mb-2"
                    />
                  </Link>
                ))}
              </div>
            )}

            {/* Nombre del alojamiento */}
            <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
              {aloj.nombre}
            </h2>

            {/* Descripción */}
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              {aloj.descripcion}
            </p>

            {/* Precio */}
            <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">
              ${aloj.precioPorNoche.toLocaleString()} por noche
            </p>

            {/* Dirección */}
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              📍 {aloj.direccion.calle} {aloj.direccion.altura}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
