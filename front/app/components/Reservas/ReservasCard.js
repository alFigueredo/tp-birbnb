import { useUsuario } from "@/app/context/UserContext";
import {
  cancelarReserva,
  confirmarReserva,
  rechazarReserva,
} from "@/app/services/api";
import FormularioEditarReserva from "@/app/components/Reservas/FormularioEditarReserva";
import { useState } from "react";
import VentanaCancelacion from "@/app/components/Reservas/VentanaCancelacion";
import VentanaConfirmacion from "@/app/components/Reservas/VentanaConfirmacion";
import VentanaRechazo from "@/app/components/Reservas/VentanaRechazo";

export default function ReservasCard({ reserva, obtenerReservas }) {
  const { usuarioActual } = useUsuario();
  // const [ventVisible, setVentVisible] = useState(false);
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

  function confirmar() {
    setLoading({ ...loading, confirmar: true });
    confirmarReserva(reserva._id)
      .then(() => {
        obtenerReservas();
      })
      .catch((err) => console.error("Error al confirmar la reserva", err))
      .finally(() => setLoading({ ...loading, confirmar: true }));
  }

  function rechazar(motivo) {
    setLoading({ ...loading, rechazar: true });
    rechazarReserva(reserva._id, motivo)
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
            <VentanaCancelacion
              loading={loading.cancelar}
              onConfirm={cancelar}
            />
          )}
        {usuarioActual.tipo === "ANFITRION" &&
          reserva.estado === "PENDIENTE" && (
            <VentanaConfirmacion
              loading={loading.confirmar}
              onConfirm={confirmar}
            />
          )}
        {usuarioActual.tipo === "ANFITRION" &&
          reserva.estado === "PENDIENTE" && (
            <VentanaRechazo loading={loading.rechazar} onConfirm={rechazar} />
          )}
      </div>
    </div>
  );
}
