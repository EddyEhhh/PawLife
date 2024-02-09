import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    microchip_number: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: true
    }
});

export const Pet = mongoose.model('Pet',  petSchema)