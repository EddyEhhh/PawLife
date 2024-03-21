import mongoose from "mongoose";
import {getEpochInSecondsNow} from "../utils/Time.util.js";

const emergencyAppointmentSchema = mongoose.Schema({
                created_at: {
                    type: Number,
                    default: Math.floor(getEpochInSecondsNow()), // Automatic timestamp upon creation
                },
                modified_at: {
                    type: Number,
                    default: Date.now, // Automatic timestamp upon modification
                },
                start_at: {
                    type: Number, // Timestamp in UNIX format (Second since epoch)
                    required: true,
                },
                duration: {
                    type: Number, // Duration in minutes, required
                    required: true,
                },
                end_at: {
                    type: Number,
                    required: true,
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
                is_emergency: {
                    type: Boolean,
                    default: false, // EmergencyAppointment active by default
                },
                description: {
                    type: String, // Optional description of the appointment
                }
});

export const EmergencyAppointment = mongoose.model('EmergencyEmergencyAppointment',  emergencyAppointmentSchema)
