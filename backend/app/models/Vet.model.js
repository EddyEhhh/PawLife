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
        imageUrl: { type: String,
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
        openingHours: {
            type: Object,
            required: true,
            default: {
                is_24_7: false,
                monday: {
                    open: "", // String representing opening time (e.g., "09:00")
                    close: "",
                    breaks: [
                        { start: "", end: "" },
                        { start: "", end: "" }
                    ]
                },
                tuesday: {
                    open: "",
                    close: "",
                    breaks: [
                        { start: "", end: "" },
                        { start: "", end: "" }
                    ]
                },
                wednesday: {
                    open: "",
                    close: "",
                    breaks: [
                        { start: "", end: "" },
                        { start: "", end: "" }
                    ]
                },
                thursday: {
                    open: "",
                    close: "",
                    breaks: [
                        { start: "", end: "" },
                    ]
                },
                friday: {
                    open: "",
                    close: "",
                    breaks: [
                        { start: "", end: "" },
                    ]
                },
                saturday: {
                    open: "",
                    close: "",
                    breaks: [
                        { start: "", end: "" },
                    ]
                },
                sunday: {
                    open: "",
                    close: "",
                    breaks: [
                        { start: "", end: "" },
                    ]
                }
            }
        }
    });

export const Vet = mongoose.model('Vet',  vetSchema)
export const Location = mongoose.model('Location',  locationSchema)
