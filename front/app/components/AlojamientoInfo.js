"use client";

import Formulario from "@/app/components/Formulario";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import SkeletonInfo from "@/app/components/SkeletonInfo";
import FotoCarrusel from "./FotoCarrusel";
import AlojamientoDatos from "./AlojamientoDatos";

export default function AlojamientoInfo({ id }) {
  const [aloja, setAloja] = useState(null);

  async function cargarAlojamiento(alojaid) {
    try {
      const res = await axios.get(
        `http://localhost:4000/alojamiento/${alojaid}`,
      );
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
    <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8">
     <div className="relative w-96 h-64 mx-auto lg:mx-0">
        <FotoCarrusel fotos={aloja.fotos} />
      </div>
      
       <div className="w-full lg:w-1/2">
    <AlojamientoDatos aloj={aloja} />
    <div className="mt-4">
      <Formulario />
    </div>
  </div>
</div>
  );
}
