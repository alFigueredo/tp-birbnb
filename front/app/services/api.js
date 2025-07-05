import axios from "axios";

const server_hostname = process.env.NEXT_PUBLIC_SERVER_HOSTNAME || "localhost";
const server_port = process.env.NEXT_PUBLIC_SERVER_PORT || 4000;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  `http://${server_hostname}:${server_port}`;

export const getUsuarios = async () => {
  const res = await axios.get(`${API_BASE_URL}/usuario`);
  return res;
};

export const getAlojamiento = async (alojaId) => {
  const res = await axios.get(`${API_BASE_URL}/alojamiento/${alojaId}`);
  return res;
};

export const postReserva = async (reserva) => {
  await axios.post(`${API_BASE_URL}/reserva`, reserva);
};

export const getNotificaciones = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/usuario/${userId}/notificacion`);
  return res;
};

export const getReservas = async (usuarioId) => {
  const res = await axios.get(`${API_BASE_URL}/usuario/${usuarioId}/reserva`);
  return res;
};

export const getReservasAnfitrion = async (usuarioId) => {
  const res = await axios.get(`${API_BASE_URL}/anfitrion/${usuarioId}/reserva`);
  return res;
};

export const getAlojamientos = async (filtros) => {
  const queryString = new URLSearchParams(filtros).toString();
  const req = `${API_BASE_URL}/alojamiento${queryString ? `?${queryString}` : ""}`;
  const res = await axios.get(req);
  return res;
};

export const leerNotificacion = async (notiId) => {
  const res = await axios.put(`${API_BASE_URL}/notificacion/${notiId}/leer`);
  return res;
};

export const putReserva = async (reserva) => {
  const res = await axios.put(
    `${API_BASE_URL}/reserva/${reserva._id}`,
    reserva,
  );
  return res;
};

export const cancelarReserva = async (reservaId) => {
  const res = await axios.put(`${API_BASE_URL}/reserva/${reservaId}/cancelar`);
  return res;
};

export const confirmarReserva = async (reservaId) => {
  const res = await axios.put(`${API_BASE_URL}/reserva/${reservaId}/confirmar`);
  return res;
};

export const rechazarReserva = async (reservaId) => {
  const res = await axios.put(`${API_BASE_URL}/reserva/${reservaId}/rechazar`);
  return res;
};
