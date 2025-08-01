import {
  Alojamiento,
  Caracteristica,
} from "../../models/entities/Alojamiento.js";
import { Usuario, TipoUsuario } from "../../models/entities/Usuario.js";
import { Moneda } from "../../models/entities/Alojamiento.js";
import { Reserva, RangoFechas } from "../../models/entities/Reserva.js";

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
  "14:00",
  "10:00",
  "",
  5,
  carac1,
  "",
);

const usu1 = new Usuario("John Doe", "johndoe@gmail.con", TipoUsuario.HUESPED);

const entre1 = new RangoFechas(new Date(2025, 5, 3), new Date(2025, 5, 5));
const entre2 = new RangoFechas(new Date(2025, 5, 6), new Date(2025, 5, 9));
const entre3 = new RangoFechas(new Date(2025, 5, 4), new Date(2025, 5, 6));
const entre4 = new RangoFechas(new Date(2025, 5, 1), new Date(2025, 5, 3));

class GenId {
  constructor(_id) {
    this._id = _id;
  }

  equals(_id) {
    return this._id === _id;
  }
}

const reser1 = new Reserva(usu1, 4, aloja1, entre1, 7000);
reser1._id = new GenId("1");
aloja1.agregarReserva(reser1);
const reser2 = new Reserva(usu1, 4, aloja1, entre2, 7000);
reser2._id = new GenId("2");
aloja1.agregarReserva(reser2);

describe("Test estasDisponibleEn", () => {
  test("El alojamiento no tiene disponibilidad en esas fechas", () => {
    expect(aloja1.estasDisponibleEn(entre3)).toBeFalsy();
  });
  test("El alojamiento tiene disponibilidad en esas fechas", () => {
    expect(aloja1.estasDisponibleEn(entre4)).toBeTruthy();
  });
  test("Una de las reservas fue cancelada, asi que hay disponibilidad", () => {
    aloja1.reservas[0].actualizarEstado("CANCELADA");
    expect(aloja1.estasDisponibleEn(entre3)).toBeTruthy();
    aloja1.reservas[0].actualizarEstado("PENDIENTE");
  });
});

describe("Test tuPrecioEstaDentroDe", () => {
  test("El precio está dentro de los valores establecidos", () => {
    expect(aloja1.tuPrecioEstaDentroDe(6000, 8000)).toBeTruthy();
  });

  test("El precio no está dentro de los valores establecidos", () => {
    expect(aloja1.tuPrecioEstaDentroDe(6000, 6999)).toBeFalsy();
    expect(aloja1.tuPrecioEstaDentroDe(7001, 8000)).toBeFalsy();
  });

  test("El precio apenas está dentro de los valores establecidos", () => {
    expect(aloja1.tuPrecioEstaDentroDe(6000, 7000)).toBeTruthy();
    expect(aloja1.tuPrecioEstaDentroDe(7000, 8000)).toBeTruthy();
  });
});

describe("Test tenesCaracteristica", () => {
  test("El alojamiento tiene la característica", () => {
    expect(aloja1.tenesCaracteristica(Caracteristica.WIFI)).toBeTruthy();
  });

  test("El alojamiento no tiene la característica", () => {
    expect(
      aloja1.tenesCaracteristica(Caracteristica.MASCOTAS_PERMITIDAS),
    ).toBeFalsy();
  });
});

describe("Test puedenAlojarse", () => {
  test("El alojamiento permite la cantidad de huéspedes", () => {
    expect(aloja1.puedenAlojarse(3)).toBeTruthy();
    expect(aloja1.puedenAlojarse(5)).toBeTruthy();
  });

  test("El alojamiento no permite la cantidad de huéspedes", () => {
    expect(aloja1.puedenAlojarse(6)).toBeFalsy();
    expect(aloja1.puedenAlojarse(7)).toBeFalsy();
  });
});
