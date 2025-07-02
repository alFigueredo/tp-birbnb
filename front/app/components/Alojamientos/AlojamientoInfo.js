"use client";

import Formulario from "@/app/components/Formulario";
import { useState, useEffect } from "react";
import SkeletonInfo from "@/app/components/Alojamientos/SkeletonInfo";
import FotoCarrusel from "@/app/components/Alojamientos/FotoCarrusel";
import AlojamientoDatos from "@/app/components/Alojamientos/AlojamientoDatos";
import { getAlojamiento } from "@/app/services/api";

export default function AlojamientoInfo({ id }) {
  const [aloja, setAloja] = useState(null);

  async function cargarAlojamiento(alojaid) {
    try {
      const res = await getAlojamiento(alojaid);
      setAloja(res.data);
    } catch (err) {
      console.error("Error al cargar el alojamiento:", err);
    }
  }

  useEffect(() => {
    cargarAlojamiento(id);
  }, [id]);

  if (!aloja) return <SkeletonInfo />;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-fit md:max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8">
      <div className="relative w-80 md:w-96 h-48 md:h-64 mx-auto lg:mx-0">
        <FotoCarrusel fotos={aloja.fotos} />
      </div>

      <div className="w-full lg:w-1/2">
        <AlojamientoDatos aloj={aloja} />
        <div className="mt-4">
          <Formulario aloja={aloja} />
        </div>
      </div>
    </div>
  );
}
