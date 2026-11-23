
 // Week 5 Day 5 - Kajun Cowboy Recipe Box
 // GET a recipe and POST a new dish

// =====================================
// GET - FIND A RECIPE
// =====================================

const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function loadRecipe() {
    recipeArea.textContent = "";

    // Check for an empty recipe number
    if (input.value === "") {
        statusText.textContent = "Type a number first.";
        return;
    }

    try {
        const url = "https://dummyjson.com/recipes/" + input.value;

        statusText.textContent = "Loading...";

        // Send GET request
        const response = await fetch(url);

        // Check for server errors
        if (!response.ok) {
            statusText.textContent = "No recipe with that number. Try 1 to 50.";
            return;
        }

        const recipe = await response.json();
        statusText.textContent = "";

        console.log(recipe);

        // Create recipe card
        const card = document.createElement("div");
        card.className = "card p-3";

        // Recipe name
        const title = document.createElement("h2");
        title.className = "h4";
        title.textContent = recipe.name;
        card.appendChild(title);

        // Cuisine
        const cuisine = document.createElement("p");
        cuisine.textContent = "Cuisine: " + recipe.cuisine;
        card.appendChild(cuisine);

        // Preparation time
        const time = document.createElement("p");
        time.textContent = "Preparation Time: " + recipe.prepTimeMinutes + " minutes";
        card.appendChild(time);

        // Show recipe card
        recipeArea.appendChild(card);

        // Clear recipe number box
        input.value = "";

    } catch (error) {
        statusText.textContent = "Can't reach the recipe server. Check your internet.";
    }
}

button.addEventListener("click", loadRecipe);


// =====================================
// POST - ADD A NEW DISH
// =====================================

const dishInput = document.getElementById("dish-name");
const postButton = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function addDish() {
    // Clear old success message
    savedArea.textContent = "";

    // Check for an empty dish name
    if (dishInput.value === "") {
        postStatus.textContent = "Type a dish name first.";
        return;
    }

    try {
        // Show sending message
        postStatus.textContent = "Sending...";

        // Send POST request
        const response = await fetch("https://dummyjson.com/recipes/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: dishInput.value
            })
        });

        // Check for server errors
        if (!response.ok) {
            postStatus.textContent = "The server didn't add it. Try again.";
            return;
        }

        // Read server response
        const newDish = await response.json();
        console.log(newDish);

        // Clear sending message
        postStatus.textContent = "";

        // Create green success message
        const message = document.createElement("p");
        message.className = "alert alert-success";

        message.textContent =
            'Added "' + newDish.name +
            '" as recipe #' + newDish.id +
            " (practice server: not really saved)";

        // Show success message
        savedArea.appendChild(message);

        // Clear dish name box
        dishInput.value = "";

    } catch (error) {
        postStatus.textContent = "Can't reach the recipe server. Check your internet.";
    }
}

postButton.addEventListener("click", addDish);
