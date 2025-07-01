export default function Checkbox({ id, label, incluyeFiltro, setearFiltros }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor={id} className="flex text-sm items-center gap-2">
        {label}
      </label>
      <input
        type="checkbox"
        checked={incluyeFiltro(id) || false}
        id={id}
        value={id}
        onChange={(e) => setearFiltros(e)}
      />
    </div>
  );
}
