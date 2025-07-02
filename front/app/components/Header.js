"use client";

import Image from "next/image";
import Link from "next/link";
import Notificaciones from "@/app/components/Notificaciones/Notificaciones";
import NavLinks from "@/app/components/Links";
import { useState } from "react";
import { useUsuario } from "@/app/context/UserContext";
import SetUsuario from "./inputs/SetUsuario";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { usuarios, usuarioActual, setUsuarioActual } = useUsuario();

  return (
    <header className="w-full bg-stone-400 backdrop-blur-md bg-opacity-80 shadow-md fixed z-50">
      <nav className="items-center flex gap-1 px-3 py-3 h-16">
        <div className="pl-2 pr-6">
          <Link href="/">
            <Image src="/birbnb.svg" alt="birbnb logo" width={42} height={42} />
          </Link>
        </div>
        <button
          className="sm:hidden text-xl ml-auto mr-5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <ul className="hidden sm:flex items-center gap-6 mr-auto">
          <NavLinks setOpen={setOpen} />
        </ul>
        <div className="hidden sm:flex items-center">
          <SetUsuario
            usuarios={usuarios}
            usuarioActual={usuarioActual}
            setUsuarioActual={setUsuarioActual}
          />
        </div>
        <div className="flex items-center mr-1">
          <Notificaciones userId={usuarioActual?._id || ""} />
        </div>
      </nav>
      {open && (
        <ul className="sm:hidden bg-stone-400 w-full px-4 py-4 space-y-3 animate-fade-in-down z-20">
          <NavLinks setOpen={setOpen} />
          <SetUsuario
            usuarios={usuarios}
            usuarioActual={usuarioActual}
            setUsuarioActual={setUsuarioActual}
          />
        </ul>
      )}
    </header>
  );
}
