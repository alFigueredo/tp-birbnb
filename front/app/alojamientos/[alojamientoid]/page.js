import AlojamientoInfo from "@/app/components/AlojamientoInfo";

export default async function AlojamientoPage({ params }) {
  const { alojamientoid } = await params;
  return (
    <main className="bg-stone-300 flex-1">
      <section className="pt-25 pb-10">
        <AlojamientoInfo id={alojamientoid} />
      </section>
    </main>
  );
}
