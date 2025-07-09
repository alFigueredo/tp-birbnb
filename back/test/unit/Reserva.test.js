import {
  Alojamiento,
  Caracteristica,
  Moneda,
} from "../../models/entities/Alojamiento.js";
import { RangoFechas, Reserva } from "../../models/entities/Reserva.js";
import { TipoUsuario, Usuario } from "../../models/entities/Usuario.js";

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
const aloja2 = new Alojamiento(
  null,
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
const entre4 = new RangoFechas(new Date(2025, 5, 3), new Date(2025, 5, 6));
const entre5 = new RangoFechas(new Date(2025, 5, 2), new Date(2025, 5, 5));

const reser1 = new Reserva(usu1, 4, aloja1, entre1, 7000);
const reser2 = new Reserva(usu1, 4, carac1, entre1, 7000);
const reser3 = new Reserva(usu1, 4, aloja2, entre1, 7000);

describe("Test actualizarEstado", () => {
  test("El estado especificado existe", () => {
    reser3.actualizarEstado("CONFIRMADA");
    expect(reser3.estado).toBe("CONFIRMADA");
    reser3.actualizarEstado("PENDIENTE");
  });

  test("El estado especificado no existe", () => {
    expect(() => reser3.actualizarEstado("ACEPTADA")).toThrow(
      "El estado especificado no existe: ACEPTADA",
    );
  });
});

describe("Test obtenerUsuario", () => {
  test("Se obtiene el usuario a notificar", () => {
    expect(reser1.obtenerUsuario()).toBe(anfi1);
  });

  test("El método a llamar no existe", () => {
    expect(() => reser2.obtenerUsuario()).toThrow(
      "No hay registro del usuario para el estado: PENDIENTE",
    );
  });

  test("Se obtiene un objeto distinto a Usuario", () => {
    expect(() => reser3.obtenerUsuario()).toThrow(
      "No hay registro del usuario para el estado: PENDIENTE",
    );
  });
});

describe("Test RangoFechas", () => {
  test("Fecha inicial mayor que fecha final", () => {
    expect(
      () => new RangoFechas(new Date(2025, 5, 3), new Date(2025, 5, 2)),
    ).toThrow("Rango de fechas incorrecto");
  });
});

describe("Test entreFechas", () => {
  test("Las fechas se solapan", () => {
    expect(entre1.entreFechas(entre3)).toBeTruthy();
  });

  test("Las fechas no se solapan", () => {
    expect(entre2.entreFechas(entre3)).toBeFalsy();
    expect(entre2.entreFechas(entre1)).toBeFalsy();
  });
});

describe("Test cantidadDias", () => {
  test("Cantidad de días en un rango de fechas", () => {
    expect(entre1.cantidadDias()).toBe(2);
    expect(entre2.cantidadDias()).toBe(3);
  });
});

describe("Test equals", () => {
  test("Ambas fechas son iguales", () => {
    expect(entre1.equals(entre1)).toBeTruthy();
  });
  test("Ninguna fecha es igual", () => {
    expect(entre1.equals(entre2)).toBeFalsy();
  });
  test("Una de las fechas es igual", () => {
    expect(entre1.equals(entre4)).toBeFalsy();
    expect(entre1.equals(entre5)).toBeFalsy();
  });
});
