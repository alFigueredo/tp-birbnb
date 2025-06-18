import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const links = [
    { name: "Home", href: "/" },
    { name: "Alojamientos", href: "/alojamientos" },
    { name: "Reservas", href: "/reservas" },
    { name: "Notificaciones", href: "/notificaciones" },
  ];

  function getLink(link) {
    return (
      <li>
        <Link className="hover:text-neutral-200" href={link.href}>
          {link.name}
        </Link>
      </li>
    );
  }

  return (
    <header className="w-full bg-stone-500 fixed">
      <nav className="items-center flex gap-1 px-3 py-3">
        <ul className="flex gap-3 mr-auto p-0">
          <li className="flex items-center">
            <Link href="/">
              <Image src="/next.svg" alt="Next logo" width={72} height={24} />
            </Link>
          </li>
          {...links.map((link) => getLink(link))}
        </ul>
        <input
          className="bg-white text-gray-700 rounded-sm border-3 border-white focus:outline-3 focus:outline-black hidden lg:inline"
          type="text"
          placeholder="Search..."
        />
      </nav>
    </header>
  );
}
