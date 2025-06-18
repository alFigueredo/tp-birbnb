import Image from "next/image";
import Link from "next/link";

export default function Car({ auto }) {
  //const nombreAuto = `${auto.marca} ${auto.modelo}`;
  const nombreAuto = `${auto.marca}`;
  return (
    <div className="mb-7 mx-auto max-w-4/5 lg:max-w-auto rounded-md">
      <Link href={`/carpage/${auto.id}`}>
        <Image
          className="rounded-lg lg:w-[320px] h-[240px]"
          width={320}
          height={240}
          src={auto.fotos[0]}
          alt={`Foto 1 ${nombreAuto}`}
        />
      </Link>
      <div className="my-3">
        <p className="font-bold">{nombreAuto}</p>
        <p className="">{`$${auto.precio}`}</p>
      </div>
    </div>
  );
}
