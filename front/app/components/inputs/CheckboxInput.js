import Checkbox from "@/app/components/inputs/Checkbox";

export default function CheckboxInput({
  id,
  title,
  values,
  filtros,
  setFiltros,
}) {
  function incluyeFiltro(value) {
    return filtros[id].includes(value);
  }

  function setearFiltros(e) {
    setFiltros({
      ...filtros,
      [id]: incluyeFiltro(e.target.value)
        ? filtros[id].filter((v) => v !== e.target.value)
        : [...filtros[id], e.target.value],
    });
  }

  return (
    <div>
      <label id={id} className="block text-sm text-gray-700 mb-1">
        {title}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        {values.map((value) => (
          <Checkbox
            key={value.id}
            id={value.id}
            label={value.label}
            incluyeFiltro={incluyeFiltro}
            setearFiltros={setearFiltros}
          />
        ))}
      </div>
    </div>
  );
}
