export default class RecipeRandomizer{
    constructor(recipes){
        this.recipes = recipes
        this.items = {}
        this.total = this.recipes.length

        // this.getTotal()
        //this.getlist()
    }

    getTotal(){
        console.log("Total Recipes", this.total)
    }

    getlist(){
        for(const each of this.recipes){
            console.log(each.name)
        }
    }
}