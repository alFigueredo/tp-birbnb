import { Alojamiento, Caracteristica } from "../../back/models/Alojamiento.js";
import { Usuario, TipoUsuario } from "../../back/models/Usuario.js";
import { Moneda } from "../../back/models/Alojamiento.js";

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

/*describe("Test Alojamiento", () => {
  test("tenesCaracteristica", () => {
    expect(aloja1.tenesCaracteristica(carac1)).toBeTruthy();
  });
});*/
