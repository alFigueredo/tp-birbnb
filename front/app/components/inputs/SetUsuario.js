export default function SetUsuario({
  usuarios,
  usuarioActual,
  setUsuarioActual,
}) {
  return (
    <>
      <label className="mr-2" htmlFor="usuario">
        Usuario:
      </label>
      <select
        id="usuario"
        className={`${usuarioActual ? "text-black" : "text-gray-500"} px-2 py-1 rounded`}
        value={usuarioActual?._id || ""}
        onChange={(e) => {
          const user = usuarios.find((u) => u._id === e.target.value);
          setUsuarioActual(user);
        }}
      >
        {usuarios.map((u) => (
          <option key={u._id} value={u._id}>
            {u.nombre}
          </option>
        ))}
      </select>
    </>
  );
}
