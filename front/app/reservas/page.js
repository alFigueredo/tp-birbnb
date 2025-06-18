'use client';

import{useEffect, useState} from 'react';
import axios from 'axios';

export default function ReservasList({ userId }){
    const[reservas,setReservas] = useState([]);

    useEffect(() => {
    axios
      .get("http://localhost:4000/reserva")
      .then((res) => setReservas(res.data || []))
      .catch((err) => console.error("Error al obtener reservas: ", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-21 pb-10 px-4">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-10">
        📅 Reservas 📅
        </h1>
     <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {reservas.map((reserva) => (
        <div
          key={reserva._id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <p className="text-lg text-gray-800 dark:text-gray-200">
            Estado: {reserva.estado}
          </p>
        </div>
      ))}
    </div>
  </div>
);
}