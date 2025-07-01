export default function AlojamientoDatos({ aloj }) {
  return (
    <div className="space-y-3 text-left">
      {/* Nombre del alojamiento */}
      {/* <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-2"> */}
     <h2 className="text-3xl font-bold text-blue-800">{aloj.nombre}</h2>

      {/* Descripción */}
      {/* <p className="text-gray-700 dark:text-gray-300 mb-3"> */}
     <p className="text-gray-800">{aloj.descripcion}</p>

      {/* Precio */}
      {/* <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-2"> */}
      <p className="text-green-600 font-bold text-lg">
        💸${aloj.precioPorNoche.toLocaleString()} por noche
      </p>

      {/* Cantidad de huéspedes */}
      <p className="text-gray-700">
        🧑‍🤝‍🧑 <strong>Cantidad máxima:</strong> {aloj.cantHuespedesMax} huéspedes
      </p>

      {/* Dirección */}
      {/* <p className="text-sm text-gray-600 dark:text-gray-400 italic"> */}
      <p className="text-gray-600 italic">
        📍 {aloj.direccion.calle} {aloj.direccion.altura}
      </p>
    </div>
  );
}