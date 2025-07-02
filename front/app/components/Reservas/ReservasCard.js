export default function ReservasCard({ reserva }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <p className="text-lg text-gray-800">
        Alojamiento: {reserva.alojamiento.nombre}
      </p>
      <p className="text-lg text-gray-800">Estado: {reserva.estado}</p>
      <p className="text-sm text-gray-600">
        Desde:{" "}
        {new Date(reserva.rangoFechas.fechaInicio).toLocaleDateString("es-AR")}
      </p>
      <p className="text-sm text-gray-600">
        Hasta:{" "}
        {new Date(reserva.rangoFechas.fechaFin).toLocaleDateString("es-AR")}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Alta: {new Date(reserva.fechaAlta).toLocaleString("es-AR")}
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded"
          onClick={() => console.log("Editar reserva", reserva._id)}
        >
          Editar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded"
          onClick={() => console.log("Cancelar reserva", reserva._id)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
