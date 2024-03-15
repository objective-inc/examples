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
                                "product_type_name",
                                "product_group_name",
                                "graphical_appearance_name",
                                "department_name",
                                "index_name",
                                "section_name",
                                "garment_group_name",
                                "detail_desc",
                            ],
                        },
                        crawlable: {
                            allow: ["image_url"],
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
