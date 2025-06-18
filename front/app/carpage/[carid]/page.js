import CarInfo from "@/app/components/CarInfo";

export default async function CarPage({ params }) {
  const { carid } = await params;
  return (
    <main className="bg-stone-300 flex-1">
      <section className="pt-25 pb-10">
        <CarInfo id={carid} />
      </section>
    </main>
  );
}
