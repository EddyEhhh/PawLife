import mongoose from "mongoose";
import {getEpochInSecondsNow} from "../utils/Time.util.js";

const bookingRangeSchema = mongoose.Schema({
                created_at: {
                    type: Number,
                    default: Math.floor(getEpochInSecondsNow()), // Automatic timestamp upon creation
                },
                modified_at: {
                    type: Number,
                    default: Date.now, // Automatic timestamp upon modification
                },
                pet_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Pet', // Reference to the associated pet model
                    required: true,
                    index: true,
                },
                vet_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Vet', // Reference to the primary vet for the appointment
                    required: true,
                    index: true,
                },
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User', // Reference to the primary vet for the appointment
                    required: true,
                    index: true,
                },
                preferred_booking:  [{
                        start: {
                            type: Number,
                            required: false
                        }, // "medication" or "food"
                        end: {
                            type: Number,
                            required: false
                        }
                    }],
                is_booked: {
                    type: Boolean,
                    default: false, // Appointment active by default
                },
                is_remove: {
                    type: Boolean,
                    default: false, // Appointment active by default
                },
                description: {
                    type: String, // Optional description of the appointment
                }
});

export const BookingRange = mongoose.model('BookingRange',  bookingRangeSchema)
