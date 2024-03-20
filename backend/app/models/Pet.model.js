import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image_url: {
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
                surgery_date: Date,
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
            date_administered: Date,
            notes: String
        }],
        extra_notes: {
            type: String
        }
    }
});

export const Pet = mongoose.model('Pet',  petSchema)