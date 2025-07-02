"use client";

import Image from "next/image";
import Link from "next/link";
import Notificaciones from "./Notificaciones";
import NavLinks from "./Links";

export default function Header() {
  
  const userId = "6648e38f9c40bca4c25e74a9";  //AGREGAR EL ID DEL USER POSTA

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
        <Notificaciones userId={userId} />
        </div>
      </nav>
    </header>
  );
}
