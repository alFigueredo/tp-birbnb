import { AlojamientoModel } from "../schemas/AlojamientoSchema.js";
import { CiudadModel, PaisModel } from "../schemas/DireccionSchema.js";

export class AlojamientoRepository {
  constructor() {
    this.model = AlojamientoModel;
  }

  async findAll(filters = {}) {
    const query = {};

    if (filters.nombre) {
      query.nombre = { $regex: filters.nombre, $options: "i" };
    }

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
      const caractPedidas = filters.caractPedidas?.split(",") || [];
      query.caracteristicas = { $all: caractPedidas }; //Los que tengan TODAS esas caracteristicas
    }

    // let direccionIds = [];
    //Filtro por ciudad
    if (filters.ciudad) {
      const ciudad = await CiudadModel.findOne({
        nombre: {
          $regex: filters.ciudad,
          $options: "i",
        },
      });
      if (ciudad) {
        query["direccion.ciudad"] = ciudad._id;
      } else {
        return {
          alojamientos: [],
        };
      }
    }

    //Filtro por pais
    if (filters.pais) {
      const pais = await PaisModel.findOne({
        nombre: {
          $regex: filters.pais,
          $options: "i",
        },
      });
      if (pais) {
        const ciudades = await CiudadModel.find({ pais: pais._id });
        const ciudadIds = ciudades.map((c) => c._id);
        query["direccion.ciudad"] = { $in: ciudadIds };
      } else {
        return {
          alojamientos: [],
        };
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
    const limit = parseInt(filters.limit) || 12;
    const skip = (page - 1) * limit; //los alojamientos que tengo que saltear

    const alojamientos = await this.model
      .find(query)
      .select("nombre descripcion precioPorNoche direccion fotos cantHuespedesMax")
      .populate({
        path: "direccion",
        select: "calle altura",
      })
      .populate("fotos")
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
    return this.model
      .findById(id)
      .populate("reservas")
      .populate("anfitrion")
      .populate({
        path: "direccion",
        select: "calle altura",
      })
      .populate("fotos"); // Buscar alojamiento por ID
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
