import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
                created_at: {
                    type: Number,
                    default: Math.floor(new Date().getTime() / 1000), // Automatic timestamp upon creation
                },
                modified_at: {
                    type: Number,
                    default: Date.now, // Automatic timestamp upon modification
                },
                start_at: {
                    type: Number, // Timestamp in UNIX format (milliseconds since epoch)
                    required: true,
                },
                duration: {
                    type: Number, // Duration in minutes, required
                    required: true,
                },
                pet_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Pet', // Reference to the associated pet model
                    required: true,
                },
                vet_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Vet', // Reference to the primary vet for the appointment
                    required: true,
                },
                is_active: {
                    type: Boolean,
                    default: true, // Appointment active by default
                },
                description: {
                    type: String, // Optional description of the appointment
                }
});

export const Appointment = mongoose.model('Appointment',  appointmentSchema)
