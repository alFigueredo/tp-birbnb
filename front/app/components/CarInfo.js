import message from "@/app/mockData/autos.json";
import ComprarButton from "@/app/components/ComprarButton";
import Image from "next/image";

export default function CarInfo({ id }) {
  function cargarAuto(carid) {
    return message.find((auto) => auto.id === carid);
  }

  const auto = cargarAuto(id);
  //const nombreAuto = `${auto.marca} ${auto.modelo}`;
  const nombreAuto = `${auto.marca}`;

  return (
    <div className="bg-stone-400 block lg:flex justify-center items-center py-10 mx-auto max-w-4/5 lg:max-w-auto rounded-md">
      <Image
        className="rounded-lg lg:w-[480px] h-[240px] lg:h-[320px] mx-auto lg:mx-0"
        width={480}
        height={320}
        src={auto.fotos[0]}
        alt={`Foto 1 ${nombreAuto}`}
      />
      <div className="font-bold text-black p-5">
        <p className="font-bold text-4xl mb-2">{nombreAuto}</p>
        <p className="mb-2">{`Ubicación: ${auto.localidad}`}</p>
        <p className="mb-2">{`Precio por noche: $${auto.precio}`}</p>
        <ComprarButton />
      </div>
    </div>
  );
}
