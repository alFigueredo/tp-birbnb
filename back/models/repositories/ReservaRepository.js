import {ReservaModel} from "../schemas/ReservaSchema.js";

export class ReservaRepository {
    constructor() {
        //este model representa una coleccion de reservas
        this.model = ReservaModel;
    }

    async findAll(query = {}){
        return this.model.find(query).populate('usuario');
    }

    async findById(id){
        return this.model.findById(id).populate('usuario')
    }

    //para crear un doc en la base y para updatear (actualizar la reserva)
    async save(reserva){
        //return await this.model.findByIdAndUpdate(reserva.id, reserva,{new: true, runValidators: true});
        if (reserva.id) {
            //actualizacion
            const reservaActualizada = this.model.findByIdAndUpdate(reserva.id, reserva);
            return reservaActualizada;
        }
        else {
            const nuevaReserva = new this.model(reserva);
            const reservaGuardada = await nuevaReserva.save();
            return reservaGuardada;
        }
    }

    async deleteById(id){

    }

}

