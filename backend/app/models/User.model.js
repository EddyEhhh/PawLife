import mongoose from "mongoose";
import {Pet} from "./Pet.model.js";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    pets: {
        type: [
            { type: mongoose.Schema.Types.ObjectId
                , ref: 'Pet'
            }], // Array of embedded pet schemas
        // validate: {
        //     validator: (val) => val.length <= 10,
        //     message: "Maximum 10 pets allowed.",
        // },
    },
});


export const User = mongoose.model('User',  userSchema)