export default function NumberInput({ id, label, step, filtros, setFiltros }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min="0"
        step={step}
        value={filtros[id] || ""}
        onChange={(e) => setFiltros({ ...filtros, [id]: e.target.value })}
        className="bg-white w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2"
      />
    </div>
  );
}
