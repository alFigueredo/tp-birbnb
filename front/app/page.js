"use client";

import message from "@/app/mockData/autos.json";
import Car from "@/app/components/Car";
import { useEffect, useState } from "react";

export default function Home() {
  const [autos, setAutos] = useState([]);

  async function cargarAutos() {
    const autosCargados = await Promise.resolve(message);
    setAutos(autosCargados);
  }

  useEffect(() => {
    cargarAutos();
  }, []);

  return (
    <main className="flex-1">
      <section className="grid grid-cols-1 lg:grid-cols-3 justify-around pt-25 pb-10">
        {autos.map((auto) => (
          <Car auto={auto} key={auto.id} />
        ))}
      </section>
    </main>
  );
}
