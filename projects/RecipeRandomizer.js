/**
 * RecipeRandomizer class is responsible for managing a collection of recipes.
 * It provides methods to retrieve the total number of recipes and to list the names of all recipes.
 */


export default class RecipeRandomizer{
    constructor(recipes){
        this.recipes = recipes
        this.items = {}
        this.total = this.recipes.length

    }

    getTotal(){
        console.log("Total Recipes", this.total)
    }

    getlist(){
        for(const each of this.recipes){
            console.log(each.name)
        }
    }

    getRecipeArray(n){
        const copy = [...this.recipes]

        // Fisher-Yates shuffle
        for(let i = copy.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1))
            ;[copy[i], copy[j]] = [copy[j], copy[i]]
        }

        return copy.slice(0, Math.min(n, copy.length))
    }
}