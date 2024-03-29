import mongoose from "mongoose";
import dotenv from 'dotenv';
import {Vet, Location} from "../models/Vet.model.js";
import {Pet} from "../models/Pet.model.js";
import {Appointment} from "../models/Appointment.model.js";
import {
    convertEpochToReadable,
    convertTimeDatetoEpochSecond,
    convertTimetoEpochSecond, epochToDate,
    getEpochDay,
    getEpochInSeconds,
    getEpochInSecondsNow
} from "../utils/Time.util.js";
import {User} from "../models/User.model.js";

dotenv.config({ path: './config/db.config.env' });

console.log("TEST: ", process.env.MONGODBURL)

// Connect to your MongoDB database
mongoose.connect(process.env.MONGODBURL)
    .then(() => console.log("Connected to MongoDB: Populate DB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));



const SECONDS_IN_MIN = 60;


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
async function createLocations() {
    try {

        const locationObjects = locationsData.map(locationData => new Location(locationData));
        await Location.insertMany(locationObjects);
        console.log("Locations created successfully!");
        return locationObjects.map((location) => location._id);
    } catch (err) {
        console.error("Error creating locations:", err);
    }
}

// Define the vet data
const vetsData = [
    {
        name: "Brighton Katong",
        image_url: "https://i.ibb.co/JR2KgK5/perrobook-products-3-0-41.jpg",
        specialties: ["Dog", "Cat", "Gerbil", "Mouse", "Hamster", "Guinea pig", "Rabbit", "Chinchilla"],
        opening_hours: {
            monday: {
                open: [
                    ["10:00", "15:00"], ["16:00", "21:00"]
                ]
            },
            tuesday: {
                open: [
                    ["10:00", "15:00"], ["16:00", "21:00"]
                ]
            },
            thursday: {
                open: [
                    ["10:00", "15:00"], ["16:00", "21:00"]
                ]
            },
            friday: {
                open: [
                    ["10:00", "15:00"], ["16:00", "21:00"]
                ]
            },
            saturday: {
                open: [
                    ["10:00", "15:00"]
                ]
            },
            sunday: {
                open: [
                    ["10:00", "15:00"]
                ]
            },
        }
    },
    {
        name: "Furiends Veterinary Clinic",
        image_url: "https://i.ibb.co/2ccNTNV/Untitled.jpg",
        specialties: ["Dog", "Cat"],
        opening_hours: {
            monday: {
                open: [
                    ["10:00", "13:00"], ["16:00", "20:00"]
                ]
            },
            tuesday: {
                open: [
                    ["10:00", "13:00"], ["16:00", "20:00"]
                ]
            },
            thursday: {
                open: [
                    ["10:00", "13:00"], ["16:00", "20:00"]
                ]
            },
            friday: {
                open: [
                    ["10:00", "13:00"], ["16:00", "20:00"]
                ]
            },
            saturday: {
                open: [
                    ["10:00", "16:00"]
                ]
            },
        }
    },
    {
        name: "Mount Pleasant Veterinary Group (Bedok)",
        image_url: "https://i.ibb.co/HnZq4fq/Mount-Pleasant-Animal-Medical-Centre.jpg",
        specialties: ["Dog", "Cat", "Rabbit"],
        opening_hours: {
            monday: {
                open: [
                    ["09:30", "13:00"], ["14:00", "19:00"]
                ]
            },
            tuesday: {
                open: [
                    ["09:30", "13:00"], ["14:00", "19:00"]
                ]
            },
            wednesday: {
                open: [
                    ["09:30", "13:00"], ["14:00", "19:00"]
                ]
            },
            thursday: {
                open: [
                    ["09:30", "13:00"], ["14:00", "19:00"]
                ]
            },
            friday: {
                open: [
                    ["09:30", "13:00"], ["14:00", "19:00"]
                ]
            },
            saturday: {
                open: [
                    ["09:30", "13:00"], ["14:00", "17:30"]
                ]
            },
            sunday: {
                open: [
                    ["09:30", "13:00"], ["14:00", "17:30"]
                ]
            }
        }
    },
    {
        name: "Amber Vet | Vet Clinic",
        image_url: "https://i.ibb.co/QdV8C5n/Untitled.png",
        specialties: ["Dog", "Cat", "Gerbil", "Mouse", "Hamster", "Guinea pig", "Rabbit", "Chinchilla", "Bird"],
        opening_hours: {
            monday: {
                open: [
                    ["09:30", "12:00"], ["14:30", "19:00"]
                ]
            },
            tuesday: {
                open: [
                    ["09:30", "12:00"], ["14:30", "19:00"]
                ]
            },
            wednesday: {
                open: [
                    ["09:30", "12:00"], ["14:30", "19:00"]
                ]
            },
            thursday: {
                open: [
                    ["09:30", "12:00"], ["14:30", "19:00"]
                ]
            },
            friday: {
                open: [
                    ["09:30", "12:00"], ["14:30", "19:00"]
                ]
            },
            sunday: {
                open: [
                    ["09:00", "17:00"]
                ]
            }
        }
    },
    {
        name: "Advanced VetCare Veterinary Centre (Bedok)",
        image_url: "https://i.ibb.co/N6jYyv2/Advanced-Vetcare.jpg",
        specialties: ["Dog", "Cat", "Gerbil", "Mouse", "Hamster", "Guinea pig", "Rabbit", "Chinchilla", "Bird"],
        opening_hours: {
            is_24_7: true
        }
    }
];
async function createVets(locationIds) {
    try {
        const vetObjects = vetsData.map((vetData, index) => new Vet({ ...vetData, location: locationIds[index] }));
        await Vet.insertMany(vetObjects);
        console.log("Vets created successfully!");
        return await Vet.find();
    } catch (err) {
        console.error("Error creating vets:", err);
    }
}

const petHealths = [
    {
        medical_history: {
            allergies:
                [
                    {
                        type: "food", // "medication" or "food"
                        description: "Wheat allergy, causes itching and vomiting"
                    },
                    {
                        type: "food", // "medication" or "food"
                        description: "Chicken allergy, causes diarrhea"
                    }
                ],
            previous_conditions: [
                {
                condition: "Ear infection",
                notes: "Treated with antibiotics in 2022"
            }
            ],
            previous_surgeries: [{
                surgery_name: "Spay",
                surgery_date: "15-06-2023",
                notes: "Uneventful surgery, recovered well"
            }]
        },
        existing_conditions: [
            {
                condition: "Arthritis",
                notes: "Managed with joint supplements and pain medication"
            }
        ],
        medications: [{
            medication_name: "Glucosamine Chondroitin",
            dosage: "1 chewable tablet, daily",
            frequency: "daily",
            notes: "Joint supplement for arthritis"
        }],
        vaccinations: [{
            vaccine_name: "Rabies",
            date_administered: "01-02-2024",
            notes: "Valid until 2027"
        },
            {
                vaccine_name: "DHPP",
                date_administered: "01-02-2024",
                notes: "Valid until 2025"
            }],
        extra_notes: "Friendly and energetic but can be wary of strangers. Responds well to positive reinforcement training."
    },
    {
        medical_history: {
            allergies: [],
            previous_conditions: [],
            previous_surgeries: [
                {
                    surgery_name: "Spay",
                    surgery_date: "15-06-2023",
                    notes: "Uneventful surgery, recovered well"
                }
            ]
        },
        existing_conditions: [],
        medications: [],
        vaccinations: [
            {
                vaccine_name: "Rabies",
                date_administered: "10-01-2024",
                notes: "Valid until 2027"
            },
            {
                vaccine_name: "FVRCP",
                date_administered: "10-01-2024",
                notes: "Valid until 2025"
            }
        ],
        extra_notes: "Playful and curious. Loves climbing and scratching posts. Tends to be shy around new people, give time to warm up."
    },
    {
        medical_history: {
            allergies: [],
            previous_conditions: [],
            previous_surgeries: []
        },
                existing_conditions: [
                    {
                        condition: "Dental malocclusion",
                        notes: "Requires regular teeth trimming to prevent overgrown teeth"
                    }
                ],
                medications: [
                    {
                        medication_name: "Critical Care",
                        dosage: "1 ml, twice daily",
                        frequency: "twice daily",
                        notes: "Nutritional supplement for rabbits with dental problems"
                    }
                ],
                vaccinations: [
                    {
                        vaccine_name: "Rabbit hemorrhagic disease virus (RHDV)",
                        date_administered: new Date("2024-02-14"),
                        notes: "Valid until 2026"
                    },
                    {
                        vaccine_name: "Pasteurella multocida",
                        date_administered: new Date("2024-02-14"),
                        notes: "Valid until 2025"
                    }
                ],
                extra_notes: "Bun Bun is a sweet and cuddly rabbit. Prefers hay and vegetables over treats. Gets scared easily by loud noises."
    },
    {
        medical_history: {
            allergies: [],
            previous_conditions: [],
            previous_surgeries: []
        },
        existing_conditions: [],
        medications: [],
        vaccinations: [],
        extra_notes: "No notes"
    }

]

const petsData = [
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234f23'),
        image_url: "https://i.ibb.co/72crVPx/Whats-App-Image-2024-03-18-at-16-55-10-e428948c.jpg",
        name: "Buddy(Sample)",
        species: "Dog",
        breed: "Golden Retriever",
        age: 4,
        microchip_number: "9876543210",
        contact: "+65-8123-0001",
        owner: new mongoose.Types.ObjectId("5e234f234f234f234f234b02")
    },
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234a01'),
        image_url: "https://dogtime.com/wp-content/uploads/sites/12/2023/12/GettyImages-1487826002-e1702396830635.jpg",
        name: "Kiyo",
        species: "Dog",
        breed: "Shihpoo",
        age: 4,
        microchip_number: "9876543210",
        contact: "+65-8123-0001",
        owner: new mongoose.Types.ObjectId("5e234f234f234f234f234a01")
    },
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234a02'),
        image_url: "https://i.ibb.co/t2VSR4Y/Persian.jpg",
        name: "Whiskers",
        species: "Cat",
        breed: "Persian",
        age: 2,
        microchip_number: "1234567890",
        contact: "+65-8123-0002",
        owner: new mongoose.Types.ObjectId("5e234f234f234f234f234a01")
    },
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234a03'),
        name: "Charlie",
        image_url: "https://i.ibb.co/23JM3NC/holland-lop.jpg",
        species: "Rabbit",
        breed: "Holland Lop",
        age: 7,
        microchip_number: "1928374650",
        contact: "+65-8123-0003",
        owner: new mongoose.Types.ObjectId("5e234f234f234f234f234a01")
    },
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234a04'),
        image_url: "https://i.ibb.co/6ty5NZQ/close-up-of-a-lutino-cockatiel-bird-Miss-Nachcha-Chayapan-Shutterstock.jpg",
        name: "Luna",
        species: "Bird",
        breed: "Cockatiel",
        age: 5,
        microchip_number: "0987654321",
        contact: "+65-8123-0004",
        owner: new mongoose.Types.ObjectId("5e234f234f234f234f234a01")
    },
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234a05'),
        image_url: "https://i.ibb.co/rkdw1WS/Screenshot-2024-03-19-162601.png",
        name: "Ellie",
        species: "Hamster",
        breed: "Syrian",
        age: 1,
        microchip_number: "",
        contact: "+65-8123-0005",
        owner: new mongoose.Types.ObjectId("5e234f234f234f234f234a01")
    }

]
async function createPets() {
    try {

        let petObjects = petsData.map(petData => new Pet(petData) );
        let index = 0;
        for (let pet of petObjects) {
            petObjects[index % petObjects.length].health = petHealths[index % petHealths.length]
            console.log(index + ": " +petObjects[index % petObjects.length])
            index += 1;
        }
        console.log(petObjects)
        await Pet.insertMany(petObjects);
        console.log("Pets created successfully!");
        return petObjects.map((pet) => pet._id);
    } catch (err) {
        console.error("Error creating pet:", err);
    }
}

const usersData = [
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234a01'),
        username: "Clarin",
        email: "clarin@example.com",
        mobile: "+65 8123 4456",
        pets:
            [
            new mongoose.Types.ObjectId('5e234f234f234f234f234a01')
            , new mongoose.Types.ObjectId('5e234f234f234f234f234a02')
            , new mongoose.Types.ObjectId('5e234f234f234f234f234a03')
            , new mongoose.Types.ObjectId('5e234f234f234f234f234a04')
            , new mongoose.Types.ObjectId('5e234f234f234f234f234a05')
        ]
    },
    {
        _id: new mongoose.Types.ObjectId('5e234f234f234f234f234b02'),
        username: "John",
        email: "john@example.com",
        mobile: "+65 9128 1231",
        pets:
            [
                new mongoose.Types.ObjectId('5e234f234f234f234f234f23')
            ]
    }

]
async function createUsers() {
    try {
        const userObjects = usersData.map(userData => new User(userData));
        await User.insertMany(userObjects);
        console.log("Users created successfully!");
        return userObjects.map((user) => user._id);
    } catch (err) {
        console.error("Error creating user:", err);
    }
}

const appointmentsData = [
    {
        start_at: Date.now(),
        duration: 30,
        pet_id: "5e234f234f234f234f234f23",
        vet_id: "5e234f234f234f234f234f24",
        description: "General checkup"
    },
]
async function createEachAppointments(vet_id, interval_in_minutes, duration, vet) {
    try {
        let start_at = (getEpochInSecondsNow() + interval_in_minutes * SECONDS_IN_MIN);
        start_at = start_at - start_at%60
        let end_at = (getEpochInSecondsNow() + (interval_in_minutes + 30) * SECONDS_IN_MIN)
        end_at = end_at - end_at%60
        const appointmentObjects = appointmentsData
            .map((appointmentData, index) => new Appointment(
                {
                    ...appointmentData,
                    start_at: start_at,
                    duration: duration,
                    end_at: end_at,
                    vet_id: vet_id,
                    pet_id: "5e234f234f234f234f234f23"
                }));
        // console.log("VET:" +)

        if(!vet.opening_hours.get("is_24_7")) {
            console.log("T"+vet.opening_hours.get(getEpochDay(appointmentObjects[0].start_at)).open[0][0])

            if(!vet.opening_hours.get(getEpochDay(appointmentObjects[0].start_at)).open || !vet.opening_hours.get(getEpochDay(appointmentObjects[0].end_at)).open) {
                return;
            }

            const vetStartAt = convertTimeDatetoEpochSecond(
                vet.opening_hours.get(getEpochDay(appointmentObjects[0].start_at)).open[0][0],
                epochToDate(appointmentObjects[0].start_at)
            )

            console.log("VETEND:"+vet.name+vet.opening_hours.get(getEpochDay(appointmentObjects[0].start_at)).open);
            const vetEndAt = convertTimeDatetoEpochSecond(
                vet.opening_hours.get(getEpochDay(appointmentObjects[0].end_at)).open.slice(-1)[0][1],
                epochToDate(appointmentObjects[0].end_at)
            )

            if (!(appointmentObjects[0].start_at >= vetStartAt
            && appointmentObjects[0].end_at <= vetEndAt)) {
                // console.log("Out:", convertEpochToReadable(appointmentObjects[0].start_at) + "-" + convertEpochToReadable(appointmentObjects[0].end_at))
                // console.log("Out:", convertEpochToReadable(vetStartAt) + "-" + convertEpochToReadable(vetEndAt))
                return;
            }
            // console.log("In:", convertEpochToReadable(appointmentObjects[0].start_at) + "-" + convertEpochToReadable(appointmentObjects[0].end_at))
            // console.log("In:", convertEpochToReadable(vetStartAt) + "-" + convertEpochToReadable(vetEndAt))

        }
        await Appointment.insertMany(appointmentObjects);
        // console.log("Appointments created successfully!");
    } catch (err) {
        console.error("Error creating appointments:", err);

    }
}

async function createAppointmentsFor2Day(vet, interval_in_minutes){
    // const MINS_IN_2_WEEK = 20160;
    const MINS_IN_2_DAY= 20160;
    console.log("DATA:" + vet);
    try {
        let current_minute = 0;
        const vet_interval = [30, 60, 90, 120]
        while (current_minute < MINS_IN_2_DAY){
            // current_minute += interval_in_minutes;
            current_minute += vet_interval[getRandomInt(vet_interval.length)];
            await createEachAppointments(vet._id, current_minute, 30, vet)
        }
        // console.log("Appointments created successfully!");
    } catch (err) {
        console.error("Error creating appointments:", err);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function createManualAppointmentsForVet(vet_ids){
    try {
        const vet_interval = [30, 60, 90, 120]
        vet_ids.map((vet_id, index) => createAppointmentsFor2Day(vet_id, vet_interval[index % 4]))
        console.error("Appointments successfully created")
    } catch (err) {
        console.error("Error creating Appointments:", err)
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

async function removePets(){
    try {
        await Pet.deleteMany();
        console.log('Pet collection removed')
    } catch (err) {
        console.error("Error when removing pet: ", err)
    }

}

async function removeUsers(){
    try {
        await User.deleteMany();
        console.log('User collection removed')
    } catch (err) {
        console.error("Error when removing user: ", err)
    }

}

async function removeAppointments(){
    try {
        await Appointment.deleteMany();
        console.log('Appointment collection removed')
    } catch (err) {
        console.error("Error when removing appointment: ", err)
    }

}
// Execute the functions

async function run() {
    try {
        // Chain removal operations first
        await removeVets();
        await removeLocations();
        await removePets();
        await removeAppointments();
        await removeUsers();

        // Then proceed with creation operations
        createLocations()
            .then(createPets())
            .then(createUsers())
            .then((locationIds) => createVets((locationIds)))
            .then((vet_ids) => {
                console.log("IDS:" + vet_ids)
                createManualAppointmentsForVet(vet_ids)
            })
            .catch((err) => ("Error", console.error))

        console.log("Collections successfully populated!");
    } catch (err) {
        console.error("Error: ", err);
    }
}

run();