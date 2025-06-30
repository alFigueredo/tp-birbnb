"use client";

import Formulario from "@/app/components/Formulario";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";

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

  if (!aloja) return <p>Cargando...</p>;

  return (
    <div className="bg-stone-400 block lg:flex justify-center items-center py-10 mx-auto max-w-4/5 lg:max-w-auto rounded-md">
      <Image
        className="rounded-lg h-44 lg:h-88 mx-auto lg:mx-0"
        width={480}
        height={360}
        src={aloja.fotos[0].path}
        alt={`${aloja.fotos[0].path} - ${aloja.nombre}`}
      />
      <div className="font-bold text-black p-5">
        <p className="font-bold text-4xl mb-2">{aloja.nombre}</p>
        <p className="mb-2">{`Ubicación: ${aloja.descripcion}`}</p>
        <p className="mb-2">{`Precio por noche: $${aloja.precioPorNoche}`}</p>
        <p className="mb-2">{`Cantidad de huéspedes máxima: ${aloja.cantHuespedesMax}`}</p>
        <p className="mb-2">{`Dirección: ${aloja.direccion.calle} ${aloja.direccion.altura}`}</p>
        <Formulario />
      </div>
    </div>
  );
}
