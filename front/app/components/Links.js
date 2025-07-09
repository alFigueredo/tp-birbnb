import Link from "next/link";

export const links = [
  { name: "Alojamientos", href: "/alojamientos" },
  { name: "Reservas", href: "/reservas" },
];

export default function NavLinks({ setOpen }) {
  return (
    <>
      {links.map((link) => (
        <li key={link.name}>
          <Link
            className="text-black font-medium hover:text-neutral-100 transition-colors duration-200"
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </>
  );
}
