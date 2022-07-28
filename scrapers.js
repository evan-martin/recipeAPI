async function wordpressScrape($) {

    let json = JSON.parse($('script[type="application/ld+json"]').text());
    json = json['@graph']

    let recipe

    Object.keys(json).map((key) => {
        var value = json[key]
        Object.keys(value).map((key) => {
            if (value[key] == 'Recipe') {
                recipe = value
            }
        })
    })

    Object.keys(recipe.recipeInstructions).map((key) => {
         instructions = recipe.recipeInstructions[key].text
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
    console.log("allrecies")
}

async function generalScrape() {
    console.log('general')
}

exports.wordpressScrape = wordpressScrape
exports.allrecipesScrape = allrecipesScrape
exports.generalScrape = generalScrape
