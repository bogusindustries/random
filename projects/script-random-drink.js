import recipes from "./drink-recipes.js"

const ingredientList = document.getElementById("ingredientList")
const recipeGrid = document.getElementById("recipeGrid")
const ignoreExtras = document.getElementById("ignoreExtras")
const filterMessage = document.getElementById("filterMessage")

// Names the user has ticked, and the grid button for each recipe
const checked = new Set()
const recipeButtons = new Map()

const names = (items) => (items || []).map((item) => item.name)

// Ingredients a recipe needs: just the main ingredients when ignoring extras,
// otherwise garnishes and always-haves too
const requiredNames = (recipe) => ignoreExtras.checked
    ? names(recipe.ingredients)
    : [...names(recipe.ingredients), ...names(recipe.garnishes), ...names(recipe.alwaysHave)]

// Unique checklist names, sorted alphabetically; rebuilt when the toggle changes
const buildIngredientList = () => {
    const unique = new Set()
    for(const recipe of recipes){
        for(const name of requiredNames(recipe)){
            unique.add(name)
        }
    }

    // Drop ticks for items no longer listed so they can't silently affect the filter
    for(const name of checked){
        if(!unique.has(name)) checked.delete(name)
    }

    ingredientList.replaceChildren()
    for(const name of [...unique].sort((a, b) => a.localeCompare(b))){
        const item = document.createElement("li")
        const label = document.createElement("label")
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = checked.has(name)
        checkbox.addEventListener("change", () => {
            if(checkbox.checked) checked.add(name)
            else checked.delete(name)
            applyFilter()
        })
        const text = document.createElement("span")
        text.textContent = name

        label.append(checkbox, text)
        item.appendChild(label)
        ingredientList.appendChild(item)
    }
}

// Show every recipe until something is ticked, then only the ones that can be made
const applyFilter = () => {
    if(checked.size === 0){
        for(const button of recipeButtons.values()) button.hidden = false
        filterMessage.textContent = "Check the ingredients you have to see what you can make."
        filterMessage.hidden = false
        return
    }

    let shown = 0
    for(const [recipe, button] of recipeButtons){
        const required = requiredNames(recipe)
        const canMake = required.length > 0 && required.every((name) => checked.has(name))
        button.hidden = !canMake
        if(canMake) shown++
    }

    filterMessage.textContent = "You can't make anything yet. Keep checking the ingredients you have."
    filterMessage.hidden = shown > 0
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

        button.addEventListener("click", () => showRecipe(recipe))

        recipeButtons.set(recipe, button)
        recipeGrid.appendChild(button)
    }
}

// Replace the button grid with the full recipe view
const recipeIntro = document.querySelector(".recipeIntro")
const recipeView = document.getElementById("recipeView")

// A grid of image/name/amount cells, with an optional heading. Empty lists render nothing.
const buildIngredientSection = (title, items) => {
    const section = document.createElement("div")
    if(!items?.length) return section
    section.classList.add("recipeIngredientSection")

    if(title){
        const heading = document.createElement("h3")
        heading.classList.add("recipeSectionTitle")
        heading.textContent = title
        section.appendChild(heading)
    }

    const grid = document.createElement("div")
    grid.classList.add("recipeIngredientGrid")
    for(const ingredient of items){
        const cell = document.createElement("div")
        cell.classList.add("recipeIngredientCell")

        if(ingredient.image){
            const image = document.createElement("img")
            image.src = ingredient.image
            image.alt = ingredient.name
            cell.appendChild(image)
        }

        const name = document.createElement("span")
        name.textContent = ingredient.name
        cell.appendChild(name)

        if(ingredient.amount){
            const amount = document.createElement("span")
            amount.classList.add("recipeIngredientAmount")
            amount.textContent = ingredient.amount
            cell.appendChild(amount)
        }

        grid.appendChild(cell)
    }
    section.appendChild(grid)
    return section
}

const showRecipe = (recipe) => {
    recipeView.replaceChildren()

    if(recipe.coverImage){
        const header = document.createElement("img")
        header.classList.add("recipeHeaderImage")
        header.src = recipe.coverImage
        header.alt = recipe.name
        recipeView.appendChild(header)
    }

    const info = document.createElement("div")
    info.classList.add("recipeInfoLine")
    for(const [className, text] of [
        ["recipeInfoName", recipe.name],
        ["recipeInfoDescription", recipe.description],
        ["recipeInfoGlass", recipe.glassType],
    ]){
        if(!text) continue
        const part = document.createElement("span")
        part.classList.add(className)
        part.textContent = text
        info.appendChild(part)
    }
    recipeView.appendChild(info)

    recipeView.appendChild(buildIngredientSection(null, recipe.ingredients))
    recipeView.appendChild(buildIngredientSection("Garnishes", recipe.garnishes))
    recipeView.appendChild(buildIngredientSection("Also needed", recipe.alwaysHave))

    if(recipe.instructions?.length){
        const instructions = document.createElement("div")
        instructions.classList.add("recipeInstructions")
        for(const step of recipe.instructions){
            const line = document.createElement("p")
            line.textContent = step
            instructions.appendChild(line)
        }
        recipeView.appendChild(instructions)
    }

    const backButton = document.createElement("button")
    backButton.classList.add("recipeBackButton")
    backButton.textContent = "Back to all drinks"
    backButton.addEventListener("click", showGrid)
    recipeView.appendChild(backButton)

    recipeIntro.hidden = true
    recipeGrid.hidden = true
    recipeView.hidden = false
    recipeView.scrollIntoView({ block: "start" })
}

const showGrid = () => {
    recipeView.hidden = true
    recipeIntro.hidden = false
    recipeGrid.hidden = false
}

ignoreExtras.addEventListener("change", () => {
    buildIngredientList()
    applyFilter()
})

buildIngredientList()
buildRecipeGrid()
applyFilter()

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
