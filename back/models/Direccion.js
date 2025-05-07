export class Direccion {
  constructor(calle, altura, ciudad, lat, long) {
    this.calle = calle;
    this.altura = altura;
    this.ciudad = ciudad; // Ciudad
    this.lat = lat;
    this.long = long;
  }
}

export class Ciudad {
  constructor(nombre, pais) {
    this.nombre = nombre;
    this.pais = pais;
  }
}

export class Pais {
  constructor(nombre) {
    this.nombre = nombre;
  }
}
