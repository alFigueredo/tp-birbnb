import Image from "next/image";
import Link from "next/link";
import FotoCarrusel from "./FotoCarrusel";
import AlojamientoDatos from "./AlojamientoDatos";

export default function AlojamientoCard({ aloj }) {
  return (
    // <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg dark:hover:bg-gray-900 transition duration-400 p-6 border border-gray-500">
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-300 p-4 w-full max-w-sm mx-auto">
      <Link href={`/alojamientos/${aloj._id}`}>
        <div className="relative w-full h-48 mb-3">
          <FotoCarrusel fotos={aloj.fotos} />
        </div>
      </Link>
       <AlojamientoDatos aloj={aloj} />
    </div>
  );
}
