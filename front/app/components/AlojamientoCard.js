import Image from "next/image";
import Link from "next/link";
import FotoCarrusel from "./FotoCarrusel";

export default function AlojamientoCard({ aloj }) {
  return (
    // <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:hover:bg-gray-900 transition duration-400 p-6 border border-gray-500">
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-300 p-4 w-full max-w-sm mx-auto">
      <Link href={`/alojamientos/${aloj._id}`}>
        <div className="relative w-full h-48 mb-3">
          <FotoCarrusel fotos={aloj.fotos} />
        </div>
      </Link>

      {/* Nombre del alojamiento */}
      {/* <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-2"> */}
      <h2 className="text-2xl font-semibold text-black mb-2">{aloj.nombre}</h2>

      {/* Descripción */}
      {/* <p className="text-gray-700 dark:text-gray-300 mb-3"> */}
      <p className="text-gray-700 mb-3">{aloj.descripcion}</p>

      {/* Precio */}
      {/* <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-2"> */}
      <p className="text-green-600 font-bold text-lg mb-2">
        ${aloj.precioPorNoche.toLocaleString()} por noche
      </p>

      {/* Dirección */}
      {/* <p className="text-sm text-gray-600 dark:text-gray-400 italic"> */}
      <p className="text-sm text-gray-600 italic">
        📍 {aloj.direccion.calle} {aloj.direccion.altura}
      </p>
    </div>
  );
}
