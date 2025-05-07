export class Usuario {
  constructor(nombre, email, tipo) {
    this.nombre = nombre;
    this.email = email;
    this.tipo = tipo; // TipoUsuario
  }
}

export const TipoUsuario = {
  HUESPED: "HUESPED",
  ANFITRION: "ANFITRION",
};
