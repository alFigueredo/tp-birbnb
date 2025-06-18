import Image from "next/image";
import Link from "next/link";

export default function Car({ auto }) {
  //const nombreAuto = `${auto.marca} ${auto.modelo}`;
  const nombreAuto = `${auto.marca}`;
  return (
    <div className="font-bold mx-auto max-w-4/5 lg:max-w-auto rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 border border-gray-200">
      <Link href={`/carpage/${auto.id}`}>
        <Image
          className="rounded-lg h-48 object-cover mx-auto"
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
