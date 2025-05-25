import {ReservaModel} from "../schemas/ReservaSchema.js";

export class ReservaRepository {
    constructor() {
        this.model = ReservaModel;
    }

    async findAll(){
        const reservas = await this.model.find();
        return reservas
    }

    async findById(id){
        const reserva = await this.model.findById(id)
        return reserva
    }

    async findByName(nombre){
        const reserva = await this.model.findByName(nombre)
    }

    async save(reserva){
        if (reserva.id){
            const reservaActualizada = await this.model.findByIdAndUpdate(reserva.id, reserva,{new: true, runValidators: true});
        return reservaActualizada;
        }
        else{
            
        }

    }

}

