"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUsuario } from "@/app/context/UserContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { usuarios, usuarioActual, setUsuarioActual } = useUsuario();

  function buscar() {
    if (!query.trim()) return;
    router.push(`/alojamientos/buscar?nombre=${query}`);
    setQuery("");
  }

  const links = [
    { name: "Home", href: "/" },
    { name: "Alojamientos", href: "/alojamientos" },
    { name: "Reservas", href: "/reservas" },
    // { name: "Notificaciones", href: "/notificaciones" },
  ];

  function getLink(link) {
    return (
      <li className="flex items-center">
        <Link className="hover:text-neutral-200 my-auto" href={link.href}>
          {link.name}
        </Link>
      </li>
    );
  }

  return (
    <header className="w-full bg-stone-500 fixed z-50">
      <nav className="items-center flex gap-1 px-3 py-3 h-16">
        <ul className="flex gap-3 mr-auto p-0">
          <li className="flex items-center">
            <Link href="/">
              <Image
                src="/birbnb.svg"
                alt="birbnb logo"
                width={50}
                height={50}
              />
            </Link>
          </li>
          {...links.map((link) => getLink(link))}
        </ul>
        <div>
          <label className="mr-2">Usuario:</label>
          <select
            className="text-black px-2 py-1 rounded"
            value={usuarioActual?._id || ""}
            onChange={(e) => {
              const user = usuarios.find((u) => u._id === e.target.value);
              setUsuarioActual(user);
            }}
          >
            {usuarios.map((u) => (
              <option key={u._id} value={u._id}>
                {u.nombre}
              </option>
            ))}
          </select>
        </div>
        {/* <input */}
        {/*   className="bg-white text-gray-700 rounded-sm border-3 border-white focus:outline-3 focus:outline-black hidden lg:inline" */}
        {/*   type="text" */}
        {/*   placeholder="Buscar alojamientos..." */}
        {/*   value={query} */}
        {/*   onChange={(e) => setQuery(e.target.value)} */}
        {/*   onKeyDown={(e) => { */}
        {/*     if (e.key === "Enter") buscar(); */}
        {/*   }} */}
        {/* /> */}
        {/* <button */}
        {/*   className="px-1.5 py-1.5 ml-1 bg-stone-400 hover:bg-stone-600 rounded-sm border-1 border-gray-600 hidden lg:inline" */}
        {/*   name="search" */}
        {/*   onClick={buscar} */}
        {/* > */}
        {/*   <Image src="/search.svg" alt="Search button" width={21} height={14} /> */}
        {/* </button> */}
      </nav>
    </header>
  );
}
