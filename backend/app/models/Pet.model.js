import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the primary vet for the appointment
        required: true,
        index: true,
    },
    health: {
        medical_history: {
            allergies: [{
                type: {
                    type: String,
                    required: false
                }, // "medication" or "food"
                description: {
                    type: String,
                    required: false
                }
            }],
            previous_conditions: [{
                condition: String,
                notes: String
            }],
            previous_surgeries: [{
                surgery_name: String,
                surgery_date: String,
                notes: String
            }]
        },
        existing_conditions: [{  // Renamed for clarity
            condition: String,
            notes: String
        }],
        medications: [{
            medication_name: String,
            dosage: String,
            frequency: String,  // e.g., "daily", "twice a day"
            notes: String
        }],
        vaccinations: [{
            vaccine_name: String,
            date_administered: String,
            notes: String
        }],
        extra_notes: {
            type: String
        }
    }
});

export const Pet = mongoose.model('Pet',  petSchema)