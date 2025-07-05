import { useUsuario } from "@/app/context/UserContext";
import {
  cancelarReserva,
  confirmarReserva,
  rechazarReserva,
} from "@/app/services/api";
import FormularioEditarReserva from "@/app/components/Reservas/FormularioEditarReserva";

export default function ReservasCard({ reserva, obtenerReservas }) {
  const { usuarioActual } = useUsuario();

  function cancelar(reservaId) {
    cancelarReserva(reservaId)
      .then(() => {
        obtenerReservas();
      })
      .catch((err) => console.error("Error al cancelar la reserva", err));
  }

  function confirmar(reservaId) {
    confirmarReserva(reservaId)
      .then(() => {
        obtenerReservas();
      })
      .catch((err) => console.error("Error al confirmar la reserva", err));
  }

  function rechazar(reservaId) {
    rechazarReserva(reservaId)
      .then(() => {
        obtenerReservas();
      })
      .catch((err) => console.error("Error al rechazar la reserva", err));
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <p className="text-lg text-gray-800">
        Alojamiento: {reserva.alojamiento.nombre}
      </p>
      <p className="text-lg text-gray-800">
        {usuarioActual.tipo === "HUESPED"
          ? `Anfitrión: ${reserva.alojamiento.anfitrion.nombre}`
          : `Huésped: ${reserva.huespedReservador.nombre}`}
      </p>
      <p className="text-lg text-gray-800">Estado: {reserva.estado}</p>
      <p className="text-md text-gray-700">
        Cantidad de huéspedes: {reserva.cantHuespedes}
      </p>
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
        {/* {usuarioActual.tipo === "HUESPED" && */}
        {/*   (reserva.estado === "PENDIENTE" || */}
        {/*     reserva.estado === "CONFIRMADA") && ( */}
        {/*     <FormularioEditarReserva reserva={reserva} /> */}
        {/*   )} */}
        {usuarioActual.tipo === "HUESPED" &&
          (reserva.estado === "PENDIENTE" ||
            reserva.estado === "CONFIRMADA") && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded"
              onClick={() => cancelar(reserva._id)}
            >
              Cancelar
            </button>
          )}
        {usuarioActual.tipo === "ANFITRION" &&
          reserva.estado === "PENDIENTE" && (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-1.5 rounded"
              onClick={() => confirmar(reserva._id)}
            >
              Confirmar
            </button>
          )}
        {usuarioActual.tipo === "ANFITRION" &&
          reserva.estado === "PENDIENTE" && (
            <button
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded"
              onClick={() => rechazar(reserva._id)}
            >
              Rechazar
            </button>
          )}
      </div>
    </div>
  );
}
