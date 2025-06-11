import { AlojamientoModel } from "../schemas/AlojamientoSchema.js";
import { CiudadModel, PaisModel } from "../schemas/DireccionSchema.js";

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel;
  }

  async findAll(filters = {}) {
    const query = {};

    //Filtro por Rango de precios
    if (filters.precioGt || filters.precioLt) {
      query.precioPorNoche = {}; // creo el objeto
      if (filters.precioGt)
        query.precioPorNoche.$gte = Number(filters.precioGt); //mayor que x precio
      if (filters.precioLt)
        query.precioPorNoche.$lte = Number(filters.precioLt); //menor que x precio
    }

    //Filtro por cantidad de huespedes permitidos
    if (filters.cantHuespedes) {
      query.cantHuespedesMax = { $gte: Number(filters.cantHuespedes) }; //mayor o igual..
    }

    //Filtro por caracteristicas especiales
    if (filters.caractPedidas) {
      query.caracteristicas = { $all: filters.caractPedidas }; //Los que tengan TODAS esas caracteristicas
    }

    // let direccionIds = [];
    //Filtro por ciudad
    if (filters.ciudad) {
      const ciudad = await CiudadModel.findOne({ nombre: filters.ciudad });
      if (ciudad) {
        query["direccion.ciudad"] = ciudad._id;
      }
    }
    //Filtro por pais
    if (filters.pais) {
      const pais = await PaisModel.findOne({ nombre: filters.pais });
      if (pais) {
        const ciudades = await CiudadModel.find({ pais: pais._id });
        const ciudadIds = ciudades.map((c) => c._id);
        query["direccion.ciudad"] = {$in: ciudadIds}
      }
    }
    
    //Filtro por coordenadas
    if (filters.lat && filters.long) {
      query["direccion.lat"] = filters.lat;
      query["direccion.long"] = filters.long;
    }

    //PAGINACION
    const total = await this.model.countDocuments(query);
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const skip = (page - 1) * limit; //los alojamientos que tengo que saltear

    const alojamientos = await this.model
      .find(query)
      .select("nombre descripcion precioPorNoche direccion")
      .populate({
        path: "direccion",
        select: "calle altura",
      })
      .skip(skip)
      .limit(limit);

    return {
      page,
      limit,
      total,
      alojamientos,
    };
  }

  async findById(id) {
    return this.model.findById(id).populate("reservas").populate("anfitrion"); // Buscar alojamiento por ID
  }

  async save(alojamiento) {
    if (alojamiento.id) {
      //actualizacion
      const alojamientoActualizado = await this.model
        .findByIdAndUpdate(alojamiento.id, alojamiento, { new: true })
        .populate("anfitrion");
      return alojamientoActualizado;
    } else {
      const nuevoAlojamiento = new this.model(alojamiento);
      const alojamientoGuardado = await nuevoAlojamiento.save();
      return alojamientoGuardado;
    }
  }
}
