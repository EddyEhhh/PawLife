
export async function getTravelInfo(origin, destination){
    // API Code here
    return {
        destination_addresses: ["New York, NY, USA"],
        origin_addresses: ["Washington, DC, USA"],
        rows:
            [
                {
                    elements:
                        [
                            {
                                distance: { text: "367 km", value: 367654 },
                                duration: { text: "3 hours 55 mins", value: 14078 },
                                status: "OK",
                            },
                        ],
                },
            ],
        status: "OK",
    }
}