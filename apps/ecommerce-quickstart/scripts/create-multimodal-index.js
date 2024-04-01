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
                            allow: [
                                "colour_group_name",
                                "detail_desc",
                                "department_name",
                                "garment_group_name",
                                "index_group_name",
                                "perceived_colour_master_name",
                                "perceived_colour_value_name",
                                "product_type_name",
                                "product_group_name",
                                "section_name",
                            ],
                        },
                        crawlable: {
                            allow: ["image_url"],
                        },
                        filterable: {
                            allow: [
                                "perceived_colour_master_name",
                                "price",
                                "rating",
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
