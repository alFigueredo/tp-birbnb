"use client";

import { useEffect, useState } from "react";
import TextInput from "@/app/components/inputs/TextInput";
import NumberInput from "@/app/components/inputs/NumberInput";
import CheckboxInput from "@/app/components/inputs/CheckboxInput";

export default function Filtros({ onFilter }) {
  const [filtros, setFiltros] = useState({
    caractPedidas: [],
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      onFilter(filtros);
    }, 300);
    return () => clearTimeout(delay);
  }, [filtros, onFilter]);

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-black mb-10">
        🌟Filtros🌟
      </h1>
      <div className="p-4 mb-7 mx-auto bg-white shadow rounded-md space-y-3">
        <TextInput
          id="nombre"
          label="Nombre del alojamiento"
          filtros={filtros}
          setFiltros={setFiltros}
        />
        <TextInput
          id="ciudad"
          label="Ciudad"
          filtros={filtros}
          setFiltros={setFiltros}
        />
        <TextInput
          id="pais"
          label="Pais"
          filtros={filtros}
          setFiltros={setFiltros}
        />
        <NumberInput
          id="precioGt"
          label="Precio mínimo"
          step="1000"
          filtros={filtros}
          setFiltros={setFiltros}
        />
        <NumberInput
          id="precioLt"
          label="Precio máximo"
          step="1000"
          filtros={filtros}
          setFiltros={setFiltros}
        />
        <NumberInput
          id="cantHuespedes"
          label="Cantidad de huéspedes"
          step="1"
          filtros={filtros}
          setFiltros={setFiltros}
        />
        <div className="bg-gray-50 border border-gray-400 p-4 rounded space-y-2">
          <TextInput
            id="lat"
            label="Latitud"
            filtros={filtros}
            setFiltros={setFiltros}
          />
          <TextInput
            id="long"
            label="Longitud"
            filtros={filtros}
            setFiltros={setFiltros}
          />
          {(filtros.lat && !filtros.long) || (!filtros.lat && filtros.long) ? (
            <p className="text-sm text-red-600">
              Completá ambos campos de coordenadas
            </p>
          ) : null}
        </div>
        <CheckboxInput
          id="caractPedidas"
          title="Características"
          filtros={filtros}
          setFiltros={setFiltros}
          values={[
            { id: "WIFI", label: "Wi-Fi" },
            { id: "PISCINA", label: "Piscina" },
            { id: "ESTACIONAMIENTO", label: "Estacionamiento" },
            { id: "MASCOTAS_PERMITIDAS", label: "Mascotas permitidas" },
          ]}
        />
      </div>
    </div>
  );
}
