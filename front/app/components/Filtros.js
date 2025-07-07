"use client";

import { useEffect, useState } from "react";
import TextInput from "@/app/components/inputs/TextInput";
import NumberInput from "@/app/components/inputs/NumberInput";
import CheckboxInput from "@/app/components/inputs/CheckboxInput";

export default function Filtros({ filtros, setFiltros }) {
  const [filter, setFilter] = useState(filtros);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFiltros(filter);
    }, 700);
    return () => clearTimeout(delay);
  }, [filter, setFiltros]);

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-black mb-10">
        🌟Filtros🌟
      </h1>
      <div className="p-4 mb-7 mx-auto bg-white shadow rounded-md space-y-3">
        <TextInput
          id="nombre"
          label="Nombre del alojamiento"
          filtros={filter}
          setFiltros={setFilter}
        />
        <TextInput
          id="ciudad"
          label="Ciudad"
          filtros={filter}
          setFiltros={setFilter}
        />
        <TextInput
          id="pais"
          label="Pais"
          filtros={filter}
          setFiltros={setFilter}
        />
        <NumberInput
          id="precioGt"
          label="Precio mínimo"
          step="1000"
          filtros={filter}
          setFiltros={setFilter}
        />
        <NumberInput
          id="precioLt"
          label="Precio máximo"
          step="1000"
          filtros={filter}
          setFiltros={setFilter}
        />
        <NumberInput
          id="cantHuespedes"
          label="Cantidad de huéspedes"
          step="1"
          filtros={filter}
          setFiltros={setFilter}
        />
        <div className="bg-gray-50 border border-gray-400 p-4 rounded space-y-2">
          <TextInput
            id="lat"
            label="Latitud"
            filtros={filter}
            setFiltros={setFilter}
          />
          <TextInput
            id="long"
            label="Longitud"
            filtros={filter}
            setFiltros={setFilter}
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
          filtros={filter}
          setFiltros={setFilter}
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
