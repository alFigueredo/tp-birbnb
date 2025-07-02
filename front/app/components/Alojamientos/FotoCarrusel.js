"use client";
import { useState } from "react";
import Image from "next/image";

export default function FotoCarrusel({ fotos }) {
  const [fotoIndex, setFotoIndex] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    setFotoIndex((prev) => (prev + 1) % fotos.length);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setFotoIndex((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden">
      <Image
        src={fotos[fotoIndex]?.path}
        alt={fotos[fotoIndex]?.descripcion || "Imagen de alojamiento"}
        fill
        className="object-cover rounded-md"
        priority
      />

      {fotos.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 text-xl z-10"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-2 text-xl z-10"
          >
            ›
          </button>
        </>
      )}

      {fotos.length > 1 && (
        <div className="absolute bottom-2 w-full flex justify-center gap-1">
          {fotos.map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i === fotoIndex ? "text-black" : "text-gray-400"
              }`}
            >
              {i === fotoIndex ? "●" : "○"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
