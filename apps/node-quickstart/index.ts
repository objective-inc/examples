// Replace this line with your API key. You can find this in the onboarding
const apiKey: string = ""

// Replace this line with your data. This is the data that will be sent to the Object Store
const myTestObject: any = {
    title: "My data title",
    id: 123,
}

const sendDataToObjectStore = async () => {
    try {
        const data = await fetch(`https://api.objective.inc/v1/objects`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myTestObject),
        }).then((res) => res.json())

        // If successful, you should see your the object ID of your object in the console
        console.log("Data", data)
    } catch (e) {
        console.log(e)
    }
}

sendDataToObjectStore()
