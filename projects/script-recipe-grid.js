import RecipeRandomizer from "./RecipeRandomizer.js"
import recipes from "./recipes.js"

const mainContent = document.querySelector(".mainContent")
mainContent.style.display = "block"

const recipeRandomizer = new RecipeRandomizer(recipes)
const GRID_SIZE = 4

const recipeGrid = document.getElementById("recipeGrid")
const recipeOutputDiv = document.getElementById("recipeOutput")
const recipeTitle = document.getElementById("recipeTitle")
const recipeDescription = document.getElementById("recipeDescription")
const recipeIngredients = document.getElementById("recipeIngredients")
const recipeCoverImage = document.getElementById("recipeImage")

const randomButton = document.getElementById("randomButton")

randomButton.addEventListener("click", () => {
    showRecipeGrid()
})

const getRecipeArray = (n) => recipeRandomizer.getRecipeArray(n)

// Replace the grid contents with a fresh shuffle of recipe buttons
const showRecipeGrid = () => {
    recipeGrid.textContent = ""
    recipeOutputDiv.style.visibility = "hidden"

    for(const recipe of getRecipeArray(GRID_SIZE)){
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

        button.addEventListener("click", () => showRecipe(recipe))

        recipeGrid.appendChild(button)
    }
}

// Fill the recipe output div with the chosen recipe
const showRecipe = (recipe) => {
    recipeOutputDiv.style.visibility = "visible"
    recipeTitle.textContent = recipe.name
    recipeDescription.textContent = recipe.description || "No Description"
    setRecipeImage(recipe)
    setRecipeIngredients(recipe)
}

const setRecipeImage = (recipe) => {
    if(recipe.coverImage){
        recipeCoverImage.textContent = ""
        const image = document.createElement("img")
        image.src = recipe.coverImage
        image.alt = recipe.name
        recipeCoverImage.appendChild(image)
    }
    else{
        recipeCoverImage.textContent = "No Image"
    }
}

const setRecipeIngredients = (recipe) => {
    if(!recipe.ingredients){
        recipeIngredients.textContent = "No Ingredients"
        return
    }

    recipeIngredients.textContent = ""
    for(const each of recipe.ingredients){
        const container = document.createElement("div")
        container.classList.add("ingredientWrapper")

        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("ingredientImage")
        const image = document.createElement("img")
        image.src = each.image
        imageWrapper.appendChild(image)

        const text = document.createElement("div")
        text.classList.add("ingredientText")
        const name = document.createElement("span")
        name.textContent = each.name
        const amount = document.createElement("span")
        amount.textContent = each.amount
        text.append(name, amount)

        container.append(imageWrapper, text)
        recipeIngredients.appendChild(container)
    }
}

// Navigation buttons (optional chaining: some are commented out in the HTML)
const hamburgerButton = document.getElementById("hamburgerButton")
hamburgerButton?.addEventListener("click", () => {
    document.querySelector(".mobileButtonsListDiv").classList.toggle("open")
})

const navigation = {
    homeButton: "../index.html",
    homeButtonMobile: "../index.html",
    animationButton: "/portfolio-gallery.html",
    animationButtonMobile: "/portfolio-gallery.html",
    photographyButton: "/photography.html",
    photographyButtonMobile: "/photography.html",
    blogButton: "/blog.html",
    blogButtonMobile: "/blog.html",
    contactButton: "/contact.html",
    contactButtonMobile: "/contact.html",
    aboutButton: "/about.html",
    aboutButtonMobile: "/about.html",
}

for(const [id, url] of Object.entries(navigation)){
    document.getElementById(id)?.addEventListener("click", () => {
        window.location.href = url
    })
}
