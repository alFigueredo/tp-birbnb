import { useState } from "react";

export default function NotificacionesLista({
  notificaciones,
  marcarComoLeida,
}) {
  const [expandida, setExpandida] = useState(null); //para que se expanda
  return (
    <div className="absolute right-0 mt-2 w-72 bg-white text-black border shadow rounded-md p-2 max-h-64 overflow-auto z-50">
      <h4 className="text-center font-bold mb-2">Notificaciones</h4>
      {notificaciones.length === 0 ? (
        <p className="text-center text-sm">No hay notificaciones.</p>
      ) : (
        notificaciones.map((n, i) => {
          const estaExpandida = expandida === i;
          const textoCorto =
            n.mensaje.length > 25 ? n.mensaje.slice(0, 25) + "..." : n.mensaje;

          return (
            <div
              key={i}
              onClick={() => {
                setExpandida(estaExpandida ? null : i);
                if (!n.leida) marcarComoLeida(n._id || n.id || i);
              }}
              className={`border-b py-2 px-3 text-sm rounded transition-all duration-200 cursor-pointer ${
                n.leida
                  ? "text-gray-500 bg-white"
                  : "bg-yellow-50 text-black font-semibold "
              }`}
            >
              <p>
                {!n.leida && <span className="mr-1">📩</span>}
                {estaExpandida ? n.mensaje : textoCorto}
              </p>
              {new Date(n.fechaAlta).toLocaleString("es-AR")}
            </div>
          );
        })
      )}
    </div>
  );
}
