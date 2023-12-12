// Replace this line with your API key. You can find this in the onboarding
const apiKey = "sk_ZUDST-vDrI2fk0C72KjX2"

const sendDataToObjectStore = async () => {
    try {
        let images = await fetch(
            `https://d11p8vtjlacpl4.cloudfront.net/demo-data/e-commerce-dataset.json`
        ).then((res) => res.json())

        const postPromises = images.map((image) =>
            fetch(`https://api.objective.inc/v1/objects`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(image),
            })
        )

        console.log("Post promises", postPromises)

        const results = await Promise.all(
            postPromises.map((p) => p.then((res) => res.json()))
        )

        console.log(results)

        // If successful, you should see your the object ID of your object in the console
    } catch (e) {
        console.log(e)
    }
}

sendDataToObjectStore()
