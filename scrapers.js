async function wordpressScrape($) {

    let json = JSON.parse($('script[type="application/ld+json"]').text());
    json = json['@graph']
    let recipe
    const instructions = []

    Object.keys(json).map((key) => {
        var value = json[key]
        Object.keys(value).map((key) => {
            if (value[key] == 'Recipe') {
                recipe = value
            }
        })
    })

    Object.keys(recipe.recipeInstructions).map((key) => {
        if (recipe.recipeInstructions[key].itemListElement) {
            recipe.recipeInstructions[key].itemListElement.map((instruction) => {
                instructions.push(instruction.text)
            })
        } else {
            instructions.push(recipe.recipeInstructions[key].text)
        }
    })

    const trimmedRecipe = {
        'name': recipe.name,
        'category': '',
        'imageURL': recipe.image[0],
        'ingredients': recipe.recipeIngredient.toString(),
        'method': instructions,
        'notes': '',
    }

  return trimmedRecipe

}

async function allrecipesScrape() {
    const json = JSON.parse($('script[type="application/ld+json"]').text());
    const recipe = json[1]
    const instructions = []

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
        'imageURL': recipe.image.url,
        'ingredients': recipe.recipeIngredient.toString(),
        'method': instructions.toString(),
        'notes': '',
    }

    return trimmedRecipe
}

async function generalScrape() {
    console.log('general')
    const recipe = JSON.parse($('script[type="application/ld+json"]').text());
    const instructions = []

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
        'imageURL': recipe.image[0].url,
        'ingredients': recipe.recipeIngredient.toString(),
        'method': instructions.toString(),
        'notes': '',
    }

    return trimmedRecipe
}

exports.wordpressScrape = wordpressScrape
exports.allrecipesScrape = allrecipesScrape
exports.generalScrape = generalScrape
