import Link from "next/link";

export default function AlojamientoDatos({ aloj }) {
  return (
    <div data-cy="aloja-info" className="space-y-3 text-left">
      <h2 className="text-3xl font-bold text-blue-800 hover:text-blue-950">
        <Link href={`/alojamientos/${aloj._id}`}>{aloj.nombre}</Link>
      </h2>

      <p className="text-gray-800">{aloj.descripcion}</p>

      <p className="text-green-600 font-bold text-lg">
        💸${aloj.precioPorNoche.toLocaleString()} por noche
      </p>

      <p className="text-gray-700">
        🧑‍🤝‍🧑 <strong>Cantidad máxima:</strong> {aloj.cantHuespedesMax} huéspedes
      </p>

      <p className="text-gray-600 italic">
        📍 {aloj.direccion.calle} {aloj.direccion.altura}
      </p>
    </div>
  );
}
