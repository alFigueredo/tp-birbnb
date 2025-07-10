import { useUsuario } from "@/app/context/UserContext";
import {
  cancelarReserva,
  confirmarReserva,
  rechazarReserva,
} from "@/app/services/api";
import FormularioEditarReserva from "@/app/components/Reservas/FormularioEditarReserva";
import { useState } from "react";
import VentanaConfirmacion from "@/app/components/Reservas/VentanaConfirmacion";

export default function ReservasCard({ reserva, obtenerReservas }) {
  const { usuarioActual } = useUsuario();
  const [ventVisible, setVentVisible] = useState(false);
  const [loading, setLoading] = useState({
    cancelar: false,
    confirmar: false,
    rechazar: false,
  });

  function formatDate(fecha) {
    return fecha.split("T")[0].split("-").reverse().join("/");
  }

  function cancelar(motivo) {
    setLoading({ ...loading, cancelar: true });
    cancelarReserva(reserva._id, motivo)
      .then(() => {
        obtenerReservas();
      })
      .catch((err) => console.error("Error al cancelar la reserva", err))
      .finally(() => setLoading({ ...loading, cancelar: true }));
  }

  function confirmar(reservaId) {
    setLoading({ ...loading, confirmar: true });
    confirmarReserva(reservaId)
      .then(() => {
        obtenerReservas();
      })
      .catch((err) => console.error("Error al confirmar la reserva", err))
      .finally(() => setLoading({ ...loading, confirmar: true }));
  }

  function rechazar(reservaId) {
    setLoading({ ...loading, rechazar: true });
    rechazarReserva(reservaId)
      .then(() => {
        obtenerReservas();
      })
      .catch((err) => console.error("Error al rechazar la reserva", err))
      .finally(() => setLoading({ ...loading, rechazar: true }));
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
        Desde: {formatDate(reserva.rangoFechas.fechaInicio)}
      </p>
      <p className="text-sm text-gray-600">
        Hasta: {formatDate(reserva.rangoFechas.fechaFin)}
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Alta: {new Date(reserva.fechaAlta).toLocaleString("es-AR")}
      </p>
      <div className="flex justify-end gap-2 mt-4">
        {usuarioActual.tipo === "HUESPED" &&
          (reserva.estado === "PENDIENTE" ||
            reserva.estado === "CONFIRMADA") && (
            <FormularioEditarReserva
              reserva={reserva}
              obtenerReservas={obtenerReservas}
            />
          )}
        {usuarioActual.tipo === "HUESPED" &&
          (reserva.estado === "PENDIENTE" ||
            reserva.estado === "CONFIRMADA") && (
            <button
              className={`text-white text-sm font-medium px-4 py-1.5 rounded ${loading.cancelar ? "bg-gray-800 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 transition duration-300"}`}
              onClick={() => setVentVisible(true)}
              disabled={loading.cancelar}
            >
              {loading.cancelar ? "Cancelando..." : "Cancelar"}
            </button>
          )}
        {usuarioActual.tipo === "ANFITRION" &&
          reserva.estado === "PENDIENTE" && (
            <button
              className={`text-white text-sm font-medium px-4 py-1.5 rounded ${loading.confirmar ? "bg-gray-800 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transition duration-300"}`}
              onClick={() => confirmar(reserva._id)}
              disabled={loading.confirmar}
            >
              {loading.confirmar ? "Confirmando..." : "Confirmar"}
            </button>
          )}
        {usuarioActual.tipo === "ANFITRION" &&
          reserva.estado === "PENDIENTE" && (
            <button
              className={`text-white text-sm font-medium px-4 py-1.5 rounded ${loading.rechazar ? "bg-gray-800 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 transition duration-300"}`}
              onClick={() => rechazar(reserva._id)}
              disabled={loading.rechazar}
            >
              {loading.rechazar ? "Rechazando..." : "Rechazar"}
            </button>
          )}
      </div>
      <VentanaConfirmacion
        visible={ventVisible}
        onClose={() => setVentVisible(false)}
        onConfirm={cancelar}
      />
    </div>
  );
}
