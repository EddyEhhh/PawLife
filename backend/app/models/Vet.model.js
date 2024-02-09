import mongoose from "mongoose";

const locationSchema = mongoose.Schema({
        street: { type: String,
            required: true
        },
        city: { type: String,
            required: true
        },
        state: { type: String,
            required: true
        },
        postal_code: { type: String,
            required: true
        },
        country: { type: String,
            required: true
        },
        floor: { type: String,
            required: false
        },
        unit: { type: String,
            required: false
        },
        building_name: { type: String,
            required: false
        }
    });

const vetSchema = mongoose.Schema({
        name: { type: String,
            required: true
        },
        image_url: { type: String,
            required: true
        },
        specialties: [String],
        // next_available_appointment: {},
        // distance: { type: Number,
        //     required: true
        // },
        // travel_time_in_min: { type: Number,
        //     required: true
        // },
        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Location',
            required: true,
        },
        opening_hours: {
            type: Map,
            required: true,
            default: {
                is_24_7: false,
                monday: {
                    open: [

                    ]
                },
                tuesday: {
                    open: [

                    ]
                },
                wednesday: {
                    open: [

                    ]
                },
                thursday: {
                    open: [

                    ]
                },
                friday: {
                    open: [

                    ]
                },
                saturday: {
                    open: [

                    ]
                },
                sunday: {
                    open: [

                    ]
                }
            }
        }
    });

export const Vet = mongoose.model('Vet',  vetSchema)
export const Location = mongoose.model('Location',  locationSchema)
