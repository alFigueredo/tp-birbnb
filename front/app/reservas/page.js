"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUsuario } from "@/app/context/UserContext";

export default function ReservasList() {
  const { usuarioActual } = useUsuario();
  const [reservas, setReservas] = useState([]);
  // const [searchId, setSearchId] = useState("");
  // const [reservasFiltradas, setReservasFiltradas] = useState([]);
  // const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  /*useEffect(() => {
    axios
      .get("http://localhost:4000/reserva")
      .then((res) => setReservas(res.data || []))
      .catch((err) => console.error("Error al obtener reservas: ", err));
  }, []);*/

  //EJEMPLOS DE RESERVAS
  // useEffect(() => {
  //   setTimeout(() => {
  //     setReservas([
  //       {
  //         _id: "1",
  //         alojamiento: { nombre: "Departamento Rio de Janeiro" },
  //         cantHuespedes: 2,
  //         rangoFechas: { fechaInicio: "2025-07-01", fechaFin: "2025-07-03" },
  //         estado: "CONFIRMADA",
  //       },
  //       {
  //         _id: "1",
  //         alojamiento: { nombre: "Miravida SOHO" },
  //         cantHuespedes: 2,
  //         rangoFechas: { fechaInicio: "2025-08-01", fechaFin: "2025-08-20" },
  //         estado: "PENDIENTE",
  //       },
  //       {
  //         _id: "2",
  //         alojamiento: { nombre: "Hilton Puerto Madero" },
  //         cantHuespedes: 3,
  //         rangoFechas: { fechaInicio: "2025-08-10", fechaFin: "2025-08-12" },
  //         estado: "PENDIENTE",
  //       },
  //       {
  //         _id: "3",
  //         alojamiento: { nombre: "Ayres de Recoleta Plaza" },
  //         cantHuespedes: 3,
  //         rangoFechas: { fechaInicio: "2025-10-01", fechaFin: "2025-10-20" },
  //         estado: "CONFIRMADA",
  //       },
  //     ]);
  //   }, 1000);
  // }, []);

  useEffect(() => {
    if (!usuarioActual) return;

    axios
      .get(`http://localhost:4000/usuario/${usuarioActual._id}/reserva`)
      .then((res) => setReservas(res.data))
      .catch((err) => console.error(err));
  }, [usuarioActual]);

  // const buscarReserva = () => {
  //   const encontradas = reservas.filter((r) => r._id === searchId);
  //   setReservasFiltradas(encontradas);
  //   setBusquedaRealizada(true);
  // };

  return (
    <div className="min-h-screen bg-neutral-200 pt-21 pb-10 px-4">
      <h1 className="text-4xl font-bold text-center text-black mb-10">
        📅 Reservas 📅
      </h1>

      {/* BARRA DE BUSQUEDA */}
      {/* <div className="font-bold flex justify-center items-center mb-8 gap-2"> */}
      {/*   <input */}
      {/*     type="text" */}
      {/*     placeholder="Buscar reserva por ID de usuario" */}
      {/*     value={searchId} */}
      {/*     onChange={(e) => setSearchId(e.target.value)} */}
      {/*     onKeyDown={(e) => { */}
      {/*       if (e.key === "Enter") buscarReserva(); */}
      {/*     }} */}
      {/*     className="border border-black rounded px-4 py-2 w-64 text-sm" */}
      {/*   /> */}
      {/*   <button */}
      {/*     onClick={buscarReserva} */}
      {/*     className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-green-500" */}
      {/*   > */}
      {/*     Buscar */}
      {/*   </button> */}
      {/* </div> */}

      {/* USUARIO SIN RESERVAS*/}
      {/* {busquedaRealizada && reservasFiltradas.length === 0 && ( */}
      {reservas.length === 0 && (
        <p className="text-center text-gray-600 mb-8">
          Este ID no posee reservas❌.
        </p>
      )}

      {/* RESERVAS DEL USUARIO */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {reservas.map((reserva, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
          >
            <p className="text-lg text-gray-800">
              Alojamiento: {reserva.alojamiento.nombre}
            </p>
            <p className="text-lg text-gray-800">Estado: {reserva.estado}</p>
            <p className="text-sm text-gray-600">
              Desde: {reserva.rangoFechas.fechaInicio}
            </p>
            <p className="text-sm text-gray-600">
              Hasta: {reserva.rangoFechas.fechaFin}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
