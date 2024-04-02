export type Product = {
    id: string
    object: {
        id: string
        name: string
        image_url: string
        ingredientLines: string[]
        rating: number
        prepTime: string
        prepTimeInSeconds: number
        totalTimeInSeconds: number
        yield: string
        totalTime: string
        numberOfServings: number
    }
}

let sample = {
    image_url: "https://d11p8vtjlacpl4.cloudfront.net/yummly/img03527.jpg",
    totalTimeInSeconds: 5100,
    prepTime: "25 Min",
    id: "Stuffed-Cherry-Tomatoes-My-Recipes",
    attributes: {
        course: ["Appetizers"],
        holiday: ["Sommer Cocktail Party", "Summer"],
        cuisine: ["American"],
    },
    flavors: {
        Sweet: 0.8333,
        Sour: 1.0,
        Salty: 0.1667,
        Piquant: 0.0,
        Bitter: 1.0,
        Meaty: 0.1667,
    },
    yield: "Makes 8 servings",
    numberOfServings: 8,
    rating: 4,
    prepTimeInSeconds: 1500,
    name: "Stuffed Cherry Tomatoes",
    ingredientLines: [
        "2 pints cherry tomatoes",
        "1 avocado, peeled and diced",
        "1 teaspoon lemon juice",
        "1/4 cup mayonnaise",
        "8 cooked bacon slices, crumbled",
        "2 green onions, finely chopped",
        "Salt and pepper to taste",
        "Salt and pepper to taste",
    ],
    totalTime: "1 hr 25 min",
}
