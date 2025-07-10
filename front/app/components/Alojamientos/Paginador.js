export default function Paginador({ pagina, setPagina }) {
  console.debug(pagina.cantPaginas);
  function cambiarPagina(nueva) {
    if (nueva >= 1 && nueva <= pagina.cantPaginas && nueva !== pagina.page)
      setPagina({ ...pagina, page: nueva });
  }

  function getPaginasVisibles() {
    let start = Math.max(pagina.page - 2, 1);
    let end = Math.min(start + 4, pagina.cantPaginas);

    if (end - start < 4) start = Math.max(end - 4, 1);

    const paginas = [];
    for (let i = start; i <= end; i++) paginas.push(i);

    return paginas;
  }

  const paginas = getPaginasVisibles();

  return (
    <div className="flex justify-center mt-6 space-x-1.5">
      <button
        onClick={() => cambiarPagina(pagina.page - 1)}
        className={`px-3 py-1 border rounded transition ${
          pagina.page === 1 ? "hidden" : "bg-white hover:bg-gray-200"
        }`}
      >
        «
      </button>

      {paginas.map((page) => (
        <button
          key={page}
          onClick={() => cambiarPagina(page)}
          className={`px-3 py-1 border rounded transition ${
            pagina.page === page
              ? "bg-blue-700 text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => cambiarPagina(pagina.page + 1)}
        className={`px-3 py-1 border rounded transition ${
          pagina.page === pagina.cantPaginas
            ? "hidden"
            : "bg-white hover:bg-gray-200"
        }`}
      >
        »
      </button>
    </div>
  );
}
