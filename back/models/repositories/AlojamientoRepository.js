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

    let direccionIds = [];
    //Filtro por ciudad
    if (filters.ciudad) {
      const ciudad = await CiudadModel.findOne({ nombre: filters.ciudad });
      if (ciudad) {
        const direcciones = await model.find({
          "direccion.ciudad": ciudad._id,
        });
        direccionIds.push(...direcciones.map((d) => d._id));
      }
    }
    //Filtro por pais
    if (filters.pais) {
      const pais = await PaisModel.findOne({ nombre: filters.pais });
      if (pais) {
        const ciudades = await CiudadModel.find({ pais: pais._id });
        const ciudadIds = ciudades.map((c) => c._id);
        const direcciones = await this.model.find({
          "direccion.ciudad": { $in: ciudadIds },
        });
        direccionIds.push(...direcciones.map((d) => d._id));
      }
    }
    //Filtro por coordenadas
    if (filters.lat && filters.long) {
      const direcciones = await this.model.find({
        "direccion.lat": filters.lat,
        "direccion.long": filters.long,
      });
      direccionIds.push(...direcciones.map((d) => d._id));
    }

    //Saco los duplicados por si realizo varios filtros
    if (direccionIds.length > 0) {
      const sinDuplicados = [...new Set(direccionIds)];
      query.direccion = { $in: sinDuplicados };
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

  async findByPage(page, limit) {
    const skip = (page - 1) * limit;
    const total = await this.model.countDocuments();

    const alojamientos = await this.model
      .find()
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
    return this.model.findById(id);
  }

  async deleteById(id) {
    const resultado = await this.model.findByIdAndDelete(id);
    return resultado !== null; //true: si borramos algo   false: no encontramos el id
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

  async deleteById(id) {
    const resultado = await this.model.findByIdAndDelete(id);
    return resultado !== null; //true: si borramos algo   false: no encontramos el id
  }
}
