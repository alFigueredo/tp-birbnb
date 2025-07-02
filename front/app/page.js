
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex-1 mt-20 flex flex-col items-center justify-center text-center px-4 py-10"
      style={{
        backgroundImage: "linear-gradient(to bottom, #f9f9f9, #e5e5e5)",
      }}
    >
      {/*LOGO*/}
      <div className="hover:scale-105 transition-transform duration-300">
        <Image
          src="/logobirbnb.png"
          alt="Logo Birbnb"
          width={220}
          height={220}
          className="mb-4"
        />
      </div>

      <h1 className="text-4xl font-extrabold mb-4 text-stone-800">
        ¡Bienvenid@ a Birbnb! 🗺️
      </h1>

      <p className="text-lg max-w-xl text-gray-700">
        Si estás buscando un alojamiento ideal, <strong>¡LO ENCONTRASTE!</strong> 💜  
        Explorá nuestras opciones y encontrá el hospedaje perfecto para vos ✨
      </p>

       <Link href="/alojamientos">
        <button className="mt-6 px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold shadow">
          Explorar alojamientos
        </button>
      </Link>
    </main>
  );
}
