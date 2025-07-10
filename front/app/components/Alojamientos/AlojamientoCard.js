import Link from "next/link";
import FotoCarrusel from "./FotoCarrusel";
import AlojamientoDatos from "./AlojamientoDatos";

export default function AlojamientoCard({ aloj }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-300 p-4 w-full max-w-sm mx-auto">
      <Link href={`/alojamientos/${aloj._id}`}>
        <div className="relative w-full h-48 mb-3" data-cy="aloja-info-link">
          <FotoCarrusel fotos={aloj.fotos} />
        </div>
      </Link>
      <AlojamientoDatos aloj={aloj} />
    </div>
  );
}
