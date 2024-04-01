const fs = require("fs").promises
const axios = require("axios")

const API_KEY = ""

const uploadData = async () => {
    try {
        // Read the JSON file
        const data = await fs.readFile("data/hm10k.json", "utf8")
        const objects = JSON.parse(data)

        // Define the base configuration for axios requests
        const axiosConfig = {
            method: "post",
            url: "https://api.objective.inc/v1/objects",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
        }

        // Create a promise for each POST request
        const uploadPromises = objects.map((obj) => {
            const config = {
                ...axiosConfig,
                data: obj,
            }
            return axios(config)
        })

        // Execute all POST requests concurrently
        await Promise.all(uploadPromises)
        console.log("All data uploaded successfully.")
    } catch (error) {
        console.error("Error uploading data:", error)
    }
}

uploadData()
