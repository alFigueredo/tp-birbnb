export default function TextInput({ id, label, filtros, setFiltros }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-gray-700 mb-1">
        {label}
      </label>
      <input
        className="bg-white w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2"
        id={id}
        type="text"
        placeholder={`${label}...`}
        value={filtros[id] || ""}
        onChange={(e) => setFiltros({ ...filtros, [id]: e.target.value })}
      />
    </div>
  );
}
