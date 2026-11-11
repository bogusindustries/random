import recipes from "./drink-recipes.js"

const ingredientList = document.getElementById("ingredientList")
const recipeGrid = document.getElementById("recipeGrid")

// Unique ingredient names across all recipes, sorted alphabetically
const buildIngredientList = () => {
    const names = new Set()
    for(const recipe of recipes){
        for(const ingredient of recipe.ingredients || []){
            names.add(ingredient.name)
        }
    }

    for(const name of [...names].sort((a, b) => a.localeCompare(b))){
        const item = document.createElement("li")
        const label = document.createElement("label")
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        const text = document.createElement("span")
        text.textContent = name

        label.append(checkbox, text)
        item.appendChild(label)
        ingredientList.appendChild(item)
    }
}

// One button per recipe, same look as the random-recipe grid
const buildRecipeGrid = () => {
    for(const recipe of recipes){
        const button = document.createElement("button")
        button.classList.add("recipeGridButton")

        if(recipe.coverImage){
            const image = document.createElement("img")
            image.src = recipe.coverImage
            image.alt = recipe.name
            button.appendChild(image)
        }

        const name = document.createElement("span")
        name.textContent = recipe.name
        button.appendChild(name)

        recipeGrid.appendChild(button)
    }
}

buildIngredientList()
buildRecipeGrid()

document.querySelector(".mainContent").style.display = "block"

// Navigation buttons
const hamburgerButton = document.getElementById("hamburgerButton")
hamburgerButton?.addEventListener("click", () => {
    document.querySelector(".mobileButtonsListDiv").classList.toggle("open")
})

const navigation = {
    homeButton: "../index.html",
    homeButtonMobile: "../index.html",
    animationButtonMobile: "/portfolio-gallery.html",
    photographyButtonMobile: "/photography.html",
    blogButtonMobile: "/blog.html",
    contactButtonMobile: "/contact.html",
    aboutButtonMobile: "/about.html",
}

for(const [id, url] of Object.entries(navigation)){
    document.getElementById(id)?.addEventListener("click", () => {
        window.location.href = url
    })
}
