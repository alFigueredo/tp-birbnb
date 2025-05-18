import { AlojamientoModel } from "../schemas/AlojamientoSchema.js";

//como accedo a la datos usando Mongoose

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel; 
  }

  async findAll(filters = {}) {
    const query = {}

    //Filtro por Rango de precios
    if(filters.precioGt){
        query.precioPorNoche = {$gt: Number(filters.precioGt)};   //mayor que x precio
    }
    if(filters.precioLt){
        query.precioPorNoche = {$lt: Number(filters.precioLt)};  //menor que x precio
    }

    //Filtro por cantidad de huespedes permitidos
    if(filters.cantHuespedes) {
        query.cantHuespedesMax = {$gte: Number(filters.cantHuespedes)}; //mayor o igual..
    }

    //Filtro por caracteristicas especiales
    if(filters.caractPedidas){
        query.caracteristicas = {$all: filters.caractPedidas} //Los que tengan TODAS esas caracteristicas
    }

    //Filtro por ubicacion
    








    return this.model.find(query).populate("Alojamiento"); 
  } 

   async findById(id) {
    return this.model.findById(id); // Buscar alojamiento por ID
  } 

  async deleteById(id){
    const resultado= await this.model.findByIdAndDelete(id);
    return resultado !== null; //true: si borramos algo   false: no encontramos el id
  }

}
