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
    </div>
  );
}
