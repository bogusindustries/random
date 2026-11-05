import RecipeRandomizer from "./RecipeRandomizer/RecipeRandomizer.js"
import recipes from "./RecipeRandomizer/recipes.js"
import "./style.css"

const mainContent = document.querySelector(".mainContent")
mainContent.style.display = "block"

const recipeRandomizer = new RecipeRandomizer(recipes)
let randNum = 0

const recipeTitle = document.getElementById("recipeTitle")
const recipeDescription = document.getElementById("recipeDescription")
const recipeIngredients = document.getElementById("recipeIngredients")
const recipeCoverImage = document.getElementById("recipeImage")
const recipeOutputDiv = document.getElementById("recipeOutput")
//console.log(recipeOutputDiv)

const randomButton = document.getElementById("randomButton")
randomButton.addEventListener("click", () => {
    getRecipe()
    setRecipeTitle()
    setRecipeDescription()
    setRecipeIngredients()
    setRecipeImage()
})

const getRecipe = () =>{
    // Create random whole number between 0 and length of recipe library
    randNum = Math.floor(Math.random() * (recipeRandomizer.recipes.length))
}

const setRecipeTitle = () =>{
    // unhide recipe Output Div
    recipeOutputDiv.style.visibility = "visible"
    // Set recipe title DOM text to recipe library at index randNum
    recipeTitle.textContent = recipeRandomizer.recipes[randNum].name
}

const setRecipeDescription = () =>{
    // Check if recipe has a description and set DOM text accrodingly
    if(recipeRandomizer.recipes[randNum].description){
        recipeDescription.textContent = recipeRandomizer.recipes[randNum].description
    }
    else{
        recipeDescription.textContent = "No Description"
    }
}

const setRecipeIngredients = () =>{
    if(recipeRandomizer.recipes[randNum].ingredients){
        recipeIngredients.textContent = ""
        for(const each of recipeRandomizer.recipes[randNum].ingredients){
            let containerElement = document.createElement("div")
            recipeIngredients.appendChild(containerElement)
            
            let imageElement = document.createElement("div")
            containerElement.appendChild(imageElement)
            imageElement.innerHTML = `<img src = "${each.image}">`
            imageElement.classList.add("ingredientImage")

            let textElement = document.createElement("div")
            containerElement.appendChild(textElement)
            textElement.classList.add("ingredientText")


            let nameElement = document.createElement("span")
            textElement.appendChild(nameElement)
            nameElement.textContent = each.name

            let amountElement = document.createElement("span")
            textElement.appendChild(amountElement)
            amountElement.textContent = each.amount

            containerElement.classList.add("ingredientWrapper")

        }
        
        //recipeIngredients.textContent = recipeRandomizer.recipes[randNum].ingredients
    }
    else{
        recipeIngredients.textContent = "No Ingredients"
    }
}

const setRecipeImage = () =>{
    if(recipeRandomizer.recipes[randNum].coverImage){
        recipeCoverImage.textContent = ""
        recipeCoverImage.innerHTML = `<img src = "${recipeRandomizer.recipes[randNum].coverImage}">`
    }
    else{
        recipeCoverImage.textContent = "No Image"
    }


  

}

  // Buttons
const hamburgerButton = document.getElementById("hamburgerButton")
hamburgerButton.addEventListener("click", () => {
    const menu = document.querySelector(".mobileButtonsListDiv")
    menu.classList.toggle("open")
})

// Home Buttons
const homeButton = document.getElementById("homeButton")
homeButton.addEventListener("click", () => {
    window.location.href="../index.html"
})

const homeButtonMobile = document.getElementById("homeButtonMobile")
homeButtonMobile.addEventListener("click", () => {
    window.location.href="/"
})

// Animation Buttons
const animationButton = document.getElementById("animationButton")
animationButton.addEventListener("click", () =>{
    window.location.href = "/portfolio-gallery.html"
})

const animationButtonMobile = document.getElementById("animationButtonMobile")
animationButtonMobile.addEventListener("click", () =>{
    window.location.href = "/portfolio-gallery.html"
})

// Photography Buttons
const photographyButton = document.getElementById("photographyButton")
photographyButton.addEventListener("click", () => {
    window.location.href="/photography.html"
})

const photographyButtonMobile = document.getElementById("photographyButtonMobile")
photographyButtonMobile.addEventListener("click", () => {
    window.location.href="/photography.html"
})

// Blog Button
const blogButton = document.getElementById("blogButton")
blogButton.addEventListener("click", () => {
    window.location.href="/blog.html"
})

const blogButtonMobile = document.getElementById("blogButtonMobile")
blogButtonMobile.addEventListener("click", () => {
    window.location.href="/blog.html"
})

// Contact Buttons
const contactButton = document.getElementById("contactButton")
contactButton.addEventListener("click", () => {
    window.location.href="/contact.html"
})

const contactButtonMobile = document.getElementById("contactButtonMobile")
contactButtonMobile.addEventListener("click", () => {
    window.location.href="/contact.html"
})

// About Buttons
const aboutButton = document.getElementById("aboutButton")
aboutButton.addEventListener("click", () =>{
    window.location.href="/about.html"
})

const aboutButtonMobile = document.getElementById("aboutButtonMobile")
aboutButtonMobile.addEventListener("click", () =>{
    window.location.href="/about.html"
})