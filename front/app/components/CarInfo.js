import message from "@/app/mockData/autos.json";
import ComprarButton from "@/app/components/ComprarButton";
import Image from "next/image";

export default function CarInfo({ id }) {
  function cargarAuto(carid) {
    return message.find((auto) => auto.id === carid);
  }

  const auto = cargarAuto(id);
  const nombreAuto = `${auto.marca} ${auto.modelo}`;

  return (
    <div className="block lg:flex justify-center items-center py-10 mx-auto max-w-4/5 lg:max-w-auto rounded-md">
      <Image
        className="rounded-lg lg:w-[480px] h-[240px] lg:h-[320px] mx-auto lg:mx-0"
        width={480}
        height={320}
        src={auto.fotos[0]}
        alt={`Foto 1 ${nombreAuto}`}
      />
      <div className="p-5">
        <p className="font-bold text-4xl mb-2">{nombreAuto}</p>
        <p className="mb-2">{`${auto.kilometraje} Km`}</p>
        <p className="mb-2">{`Año: ${auto.anio}`}</p>
        <p className="mb-2">{`Localidad: ${auto.localidad}`}</p>
        <p className="mb-2">{`$${auto.precio}`}</p>
        <ComprarButton />
      </div>
    </div>
  );
}
