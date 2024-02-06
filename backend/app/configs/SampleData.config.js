import mongoose from "mongoose";
import dotenv from 'dotenv';
import {Vet, Location} from "../models/Vet.model.js";

dotenv.config({ path: './config/db.config.env' });

// Connect to your MongoDB database
mongoose.connect(process.env.MONGODBURL)
    .then(() => console.log("Connected to MongoDB: Populate DB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Define the location data for each vet
const locationsData = [
    {
        street: "112 East Coast Road",
        city: "Singapore",
        state: "Singapore",
        postal_code: "428802",
        country: "Singapore"
    },
    {
        street: "434 Joo Chiat Road",
        city: "Singapore",
        state: "Singapore",
        postal_code: "427654",
        country: "Singapore"
    },
    {
        street: "75 Bedok North Street 4",
        city: "Singapore",
        state: "Singapore",
        postal_code: "469662",
        country: "Singapore",
        floor: "01",
        unit: "577",
        building_name: "Stepping Stones Education Centre"
    },
    {
        street: "100 Pasir Panjang Road",
        city: "Singapore",
        state: "Singapore",
        postal_code: "118518",
        country: "Singapore"
    },
    {
        street: "21 Bedok North Street 1",
        city: "Singapore",
        state: "Singapore",
        postal_code: "469651",
        country: "Singapore"
    }
];


// Define the vet data
const vetsData = [
    {
        name: "Brighton Katong",
        imageUrl: "https://example.com/brighton-katong.jpg",
        specialties: ["Dogs", "Cats", "Gerbilss", "Mice", "Hamsters", "Guinea pigs", "Rabbits", "Chinchillas"],
        openingHours: {
            monday: {
                open: "10:00",
                close: "21:00",
                breaks: [
                    { start: "15:01",  end: "15:59"}
                ]
            },
            tuesday: {
                open: "10:00",
                close: "21:00",
                breaks: [
                    { start: "15:01",  end: "15:59"}
                ]
            },
            thursday: {
                open: "10:00",
                close: "21:00",
                breaks: [
                    { start: "15:01",  end: "15:59"}
                ]
            },
            friday: {
                open: "10:00",
                close: "21:00",
                breaks: [
                    { start: "15:01",  end: "15:59"}
                ]
            },
            saturday: {
                open: "10:00",
                close: "15:00",
            },
            sunday: {
                open: "10:00",
                close: "15:00",
            },
        }
    },
    {
        name: "Furiends Veterinary Clinic",
        imageUrl: "https://example.com/furiends-vet.jpg",
        specialties: ["Dogs", "Cats", "Gerbilss", "Mice", "Hamsters", "Guinea pigs", "Rabbits", "Chinchillas"],
        openingHours: {
            monday: {
                open: "10:00",
                close: "20:00",
                breaks: [
                    { start: "13:01",  end: "15:59"}
                ]
            },
            tuesday: {
                open: "10:00",
                close: "20:00",
                breaks: [
                    { start: "13:01",  end: "15:59"}
                ]
            },
            thursday: {
                open: "10:00",
                close: "20:00",
                breaks: [
                    { start: "13:01",  end: "15:59"}
                ]
            },
            friday: {
                open: "10:00",
                close: "20:00",
                breaks: [
                    { start: "13:01",  end: "15:59"}
                ]
            },
            saturday: {
                open: "10:00",
                close: "16:00",
            },
        }
    },
    {
        name: "Mount Pleasant Veterinary Group (Bedok)",
        imageUrl: "https://example.com/mount-pleasant.jpg",
        specialties: ["Dogs", "Cats", "Gerbilss", "Mice", "Hamsters", "Guinea pigs", "Rabbits", "Chinchillas"],
        openingHours: {
            monday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "13:01",  end: "13:59"}
                ]
            },
            tuesday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "13:01",  end: "13:59"}
                ]
            },
            wednesday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "13:01",  end: "13:59"}
                ]
            },
            thursday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "13:01",  end: "13:59"}
                ]
            },
            friday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "13:01",  end: "13:59"}
                ]
            },
            saturday: {
                open: "09:30",
                close: "17:30",
                breaks: [
                    { start: "13:01",  end: "13:59"}
                ]
            },
            sunday: {
                open: "09:30",
                close: "17:30",
                breaks: [
                    { start: "13:01",  end: "13:59"}
                ]
            }
        }
    },
    {
        name: "Amber Vet | Vet Clinic",
        imageUrl: "https://example.com/amber-vet.jpg",
        specialties: ["Dogs", "Cats", "Gerbilss", "Mice", "Hamsters", "Guinea pigs", "Rabbits", "Chinchillas"],
        openingHours: {
            monday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "12:01",  end: "14:29"}
                ]
            },
            tuesday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "12:01",  end: "14:29"}
                ]
            },
            wednesday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "12:01",  end: "14:29"}
                ]
            },
            thursday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "12:01",  end: "14:29"}
                ]
            },
            friday: {
                open: "09:30",
                close: "19:00",
                breaks: [
                    { start: "12:01",  end: "14:29"}
                ]
            },
            sunday: {
                open: "09:00",
                close: "17:00"
            }
        }
    },
    {
        name: "Advanced VetCare Veterinary Centre (Bedok)",
        imageUrl: "https://example.com/advanced-vetcare.jpg",
        specialties: ["Dogs", "Cats", "Gerbilss", "Mice", "Hamsters", "Guinea pigs", "Rabbits", "Chinchillas"],
        openingHours: {
            is_24_7: true
        }
    }
];

// Create Location documents first
async function createLocations() {
    try {

        const locationObjects = locationsData.map(locationData => new Location(locationData));
        await Location.insertMany(locationObjects);
        return locationObjects.map((location) => location._id);
        console.log("Locations created successfully!");
    } catch (err) {
        console.error("Error creating locations:", err);
    }
}

// Then create Vet documents
async function createVets(locationIds) {
    try {
        const vetObjects = vetsData.map((vetData, index) => new Vet({ ...vetData, location: locationIds[index] }));
        await Vet.insertMany(vetObjects);
        console.log("Vets created successfully!");
    } catch (err) {
        console.error("Error creating vets:", err);
    }
}

async function removeVets(){
    try {
        await Vet.deleteMany();
        console.log('Vet collection removed')
    } catch (err) {
        console.error("Error when removing vet: ", err)
    }

}

async function removeLocations(){
    try {
        await Location.deleteMany();
        console.log('Location collection removed')
    } catch (err) {
        console.error("Error when removing location: ", err)
    }

}

// Execute the functions
async function run() {
    try {
        // Chain removal operations first
        await removeVets();
        await removeLocations();

        // Then proceed with creation operations
        createLocations()
            .then((locationIds) => createVets((locationIds)))
            .catch((err) => ("Error", console.error))

        console.log("Collections successfully populated!");
    } catch (err) {
        console.error("Error: ", err);
    }
}

run();
