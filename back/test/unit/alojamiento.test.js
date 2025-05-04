import { Alojamiento } from "../../clases/Alojamiento.js";
import { Usuario } from "../../clases/Usuario.js";
import { Caracteristica, Moneda, TipoUsuario } from "../../enumeraciones.js";

const anfi1 = new Usuario(
  "John Doe",
  "johndoe@gmail.com",
  TipoUsuario.ANFITRION,
);
const carac1 = [
  Caracteristica.WIFI,
  Caracteristica.ESTACIONAMIENTO,
  Caracteristica.PISCINA,
];
const aloja1 = new Alojamiento(
  anfi1,
  "El Bolson",
  "Un lindo lugar",
  7000,
  Moneda.PESO_ARG,
  "21:00",
  "11:00",
  "",
  5,
  carac1,
  [],
  "",
);

describe("Test Alojamiento", () => {
  test("tuPrecioEstaDentroDe", () => {
    expect(aloja1.tuPrecioEstaDentroDe(6000, 8000)).toBeTruthy();
  });
});
