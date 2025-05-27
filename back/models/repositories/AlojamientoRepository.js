import {AlojamientoModel} from "../schemas/AlojamientoSchema.js";
import {DireccionModel, CiudadModel, PaisModel} from "../schemas/DireccionSchema.js";


export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel; 
  }



  async findAll(filters = {}) {
    const query = {}

    //Filtro por Rango de precios
    if (filters.precioGt || filters.precioLt){
      query.precioPorNoche = {}; // creo el objeto
      if (filters.precioGt) query.precioPorNoche.$gte = Number(filters.precioGt);//mayor que x precio
      if (filters.precioLt) query.precioPorNoche.$lte = Number(filters.precioLt);//menor que x precio
    }

    //Filtro por cantidad de huespedes permitidos
    if(filters.cantHuespedes) {
        query.cantHuespedesMax = {$gte: Number(filters.cantHuespedes)}; //mayor o igual..
    }

    //Filtro por caracteristicas especiales
    if(filters.caractPedidas){
        query.caracteristicas = {$all: filters.caractPedidas}; //Los que tengan TODAS esas caracteristicas
    }

    let direccionIds = [];
    //Filtro por ciudad
    if (filters.ciudad) {
      const ciudad = await CiudadModel.findOne({ nombre: filters.ciudad });
      if (ciudad) {
        const direcciones = await DireccionModel.find({ ciudad: ciudad._id });
        direccionIds.push(...direcciones.map((d) => d._id));
      }
    }
    //Filtro por pais
    if (filters.pais) {
      const pais = await PaisModel.findOne({ nombre: filters.pais });
      if (pais) {
        const ciudades = await CiudadModel.find({ pais: pais._id });
        const ciudadIds = ciudades.map((c) => c._id);
        const direcciones = await DireccionModel.find({ ciudad: { $in: ciudadIds } });
        direccionIds.push(...direcciones.map((d) => d._id));
      }
    }
    //Filtro por coordenadas
    if (filters.lat && filters.long) {
      const direcciones = await DireccionModel.find({
        lat: filters.lat,
        long: filters.long,
      });
      direccionIds.push(...direcciones.map((d) => d._id));
    }

    //Saco los duplicados por si realizo ambos filtros
    if (direccionIds.length > 0) {
      const sinDuplicados = [...new Set(direccionIds)];
      query.direccion = { $in: sinDuplicados };
    }

    // solo muestro el nombre, precio, calle y altura.
    return this.model.find(query).select("nombre precioPorNoche direccion").populate({
    path: "direccion",
    select: "calle altura", 
    });

  }

  async findById(id) {
    return this.model.findById(id); 
  } 

  async deleteById(id){
    const resultado= await this.model.findByIdAndDelete(id);
    return resultado !== null; //true: si borramos algo   false: no encontramos el id
  }

}
