const API_KEY = ""

const createIndex = async () => {
    try {
        const response = await fetch("https://api.objective.inc/v1/indexes", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                configuration: {
                    index_type: {
                        name: "multimodal",
                    },
                    fields: {
                        searchable: {
                            allow: ["name", "totalTime", "ingredientLines"],
                        },
                        crawlable: {
                            allow: ["image_url"],
                        },
                        filterable: {
                            allow: [
                                "rating",
                                "prepTimeInSeconds",
                                "numberOfServings",
                                "totalTimeInSeconds",
                            ],
                        },
                    },
                },
            }),
        })

        const data = await response.json()
        console.log("Index created successfully:", data)
    } catch (error) {
        console.error("Error creating index:", error)
    }
}

createIndex()
