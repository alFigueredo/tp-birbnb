import axios from "axios";

const server_hostname = process.env.NEXT_PUBLIC_SERVER_HOSTNAME || "localhost";
const server_port = process.env.NEXT_PUBLIC_SERVER_PORT || 4000;

const API_BASE_URL = `http://${server_hostname}:${server_port}`;

export const getUsuarios = async () => {
  const res = await axios.get(`${API_BASE_URL}/usuario`);
  return res;
};

export const getAlojamiento = async (alojaId) => {
  const res = await axios.get(`http://localhost:4000/alojamiento/${alojaId}`);
  return res;
};

export const postReserva = async (reserva) => {
  await axios.post("http://localhost:4000/reserva", reserva);
};

export const getNotificaciones = async (userId) => {
  const res = await axios.get(
    `http://localhost:4000/usuario/${userId}/notificacion`,
  );
  return res;
};

export const getReservas = async (usuarioId) => {
  const res = await axios.get(
    `http://localhost:4000/usuario/${usuarioId}/reserva`,
  );
  return res;
};

export const getReservasAnfitrion = async (usuarioId) => {
  const res = await axios.get(
    `http://localhost:4000/anfitrion/${usuarioId}/reserva`,
  );
  return res;
};

export const getAlojamientos = async (filtros) => {
  const queryString = new URLSearchParams(filtros).toString();
  const req = queryString
    ? `http://localhost:4000/alojamiento?${queryString}`
    : `http://localhost:4000/alojamiento`;
  const res = await axios.get(req);
  return res;
};

export const leerNotificacion = async (notiId) => {
  const res = await axios.put(
    `http://localhost:4000/notificacion/${notiId}/leer`,
  );
  return res;
};

export const putReserva = async (reserva) => {
  const res = await axios.put(
    `http://localhost:4000/reserva/${reserva._id}`,
    reserva,
  );
  return res;
};

export const cancelarReserva = async (reservaId) => {
  const res = await axios.put(
    `http://localhost:4000/reserva/${reservaId}/cancelar`,
  );
  return res;
};

export const confirmarReserva = async (reservaId) => {
  const res = await axios.put(
    `http://localhost:4000/reserva/${reservaId}/confirmar`,
  );
  return res;
};

export const rechazarReserva = async (reservaId) => {
  const res = await axios.put(
    `http://localhost:4000/reserva/${reservaId}/rechazar`,
  );
  return res;
};
