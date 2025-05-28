import { AlojamientoService } from "../services/AlojamientoService.js";

export class AlojamientoController {
    constructor(alojamientoService = new AlojamientoService()) {
        this.alojamientoService = alojamientoService;
    }
    
    async findAll(req, res, next) {
        try {
        const filtros = req.query;                          // Tomamos los filtros desde query
        const alojamientos = await this.alojamientoService.findAll(filtros);
        res.json(alojamientos);
        } catch (error) {
        next(error);
        }
    }
    
    async findByPage(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const resultado = await this.alojamientoService.findByPage(page, limit);
            res.json(resultado);
        } catch (error) {
        next(error);
        }
    }

    async findById(req, res, next) {
        try {
        const alojamiento = await this.alojamientoService.findById(req.params.id);
        if (alojamiento) {
            res.json(alojamiento);
        } else {
            res.status(404).json({ mensaje: "Alojamiento no encontrado" });
        }
        } catch (error) {
        next(error);
        }
    }

    async delete(req, res, next) {
        try {
        const borrado = await this.alojamientoService.delete(req.params.id);
        if (borrado) {
            res.status(204).send();                             // Se borro exitosamente!!
        } else {
            res.status(404).json({ mensaje: "Alojamiento no encontrado" });
        }
        } catch (error) {
        next(error);
        }
    }

}