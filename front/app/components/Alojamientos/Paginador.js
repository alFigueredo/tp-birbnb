export default function Paginador({ pagina, setPagina }) {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      {[...Array(pagina.cantPaginas)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => setPagina({ ...pagina, page })}
            className={`px-3 py-1 border rounded transition ${
              pagina.page === page
                ? "bg-blue-700 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
