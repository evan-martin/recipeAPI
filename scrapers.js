function wordpressScrape(json) {
    json = json['@graph']

    Object.keys(json).map((key) => {
        var value = json[key]
        Object.keys(value).map((key) => {
            if (value[key] == 'Recipe') {
                recipe = value
            }
        })
    })

    return generalScrape(recipe)
}

function allrecipesScrape(json) {
    const recipe = json[1]
    return generalScrape(recipe)
}

function generalScrape(json) {
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
        } else{
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
        'notes': '',
    }

    return trimmedRecipe
}

exports.wordpressScrape = wordpressScrape
exports.allrecipesScrape = allrecipesScrape
exports.generalScrape = generalScrape
