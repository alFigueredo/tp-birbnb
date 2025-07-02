"use client";

import Image from "next/image";
import Link from "next/link";
import Notificaciones from "./Notificaciones";
import NavLinks from "./Links";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUsuario } from "@/app/context/UserContext";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { usuarios, usuarioActual, setUsuarioActual } = useUsuario();

  return (
    <header className="w-full bg-stone-400 backdrop-blur-md bg-opacity-80 shadow-md fixed z-50">
      <nav className="items-center flex gap-1 px-3 py-3 h-16">
        <ul className="flex items-center gap-6">
          <li className="flex items-center">
            <Link href="/">
              <Image src="/birbnb.svg" alt="birbnb logo" width={42} height={42} />
            </Link>
           </li>
          <NavLinks /> 
        </ul>
        <div className = "ml-auto">
        <Notificaciones userId={usuarioActual?._id || ""} />
        </div>
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
      </nav>
    </header>
  );
}
