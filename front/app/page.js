// "use client";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-1 mt-20 flex flex-col items-center justify-center text-center px-4">
      {/*LOGO*/}
      <div className="hover:scale-105 transition-transform duration-300">
        <Image
          src="/logobirbnb.png"
          alt="Logo Birbnb"
          width={320}
          height={320}
          className="mb-6"
        />
      </div>

      <h1 className="text-4xl font-extrabold mb-4 text-stone-800 transition-colors duration-300">
        ¡Bienvenid@ a Birbnb! 🏡
      </h1>
      <p className="text-lg max-w-xl">
        Si estás buscando un alojamiento ideal, ¡LO ENCONTRASTE! 💜 Explora
        dentro de nuestras opciones y encontrá el hospedaje perfecto para vos ✨
      </p>
    </main>
  );
}
