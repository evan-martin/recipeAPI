function preprocessScrape(json) {

    if (json['@graph'] || json[0]) {
        if(json['@graph']){
            json = json['@graph']
        }

        Object.keys(json).map((key) => {
            var value = json[key]
            Object.keys(value).map((key) => {
                if (value[key] == 'Recipe') {
                    recipe = value
                }
            })
        })
    } 
    else {
        recipe = json
    }

    return scrape(recipe)
}

function scrape(json) {
    const recipe = json
    const instructions = []
    let image

    if (typeof recipe.image[0] == "object") {
        if (recipe.image[0].url) {
            image = recipe.image[0].url
        } else {
            image = recipe.image[0]
        }
    } else if (recipe.image) {
        if (recipe.image.url) {
            image = recipe.image.url
        } else if (recipe.image[0].length > 1) {
            image = recipe.image[0]
        } else {
            image = recipe.image
        }
    }

    recipe.recipeInstructions.map((instruction) => {
        if (instruction.itemListElement) {
            instruction.itemListElement.map((instruction) => {
                instructions.push(instruction.text)
            })
        } else {
            instructions.push(instruction.text)
        }
    })

    const trimmedRecipe = {
        'name': recipe.name,
        'category': '',
        'imageURL': image,
        'ingredients': recipe.recipeIngredient,
        'method': instructions,
        'tags': recipe.keywords,
        'notes': '',
    }

    return trimmedRecipe
}

exports.preprocessScrape = preprocessScrape
