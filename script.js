
const input = document.getElementById("recipe-id");
const button = document.getElementById("get-btn");
const statusText = document.getElementById("status");
const recipeArea = document.getElementById("recipe");

async function loadRecipe() {
    try {
        const url = "https://dummyjson.com/recipes/" + input.value;

        recipeArea.textContent = "";
        statusText.textContent = "Loading...";

        const response = await fetch(url);

        if (!response.ok) {
            statusText.textContent = "No recipe with that number. Try 1 to 50.";
            return;
        }

        const recipe = await response.json();
        statusText.textContent = "";

        console.log(recipe);

        const card = document.createElement("div");
        card.className = "card p-3";

        const title = document.createElement("h2");
        title.className = "h4";
        title.textContent = recipe.name;
        card.appendChild(title);

        const cuisine = document.createElement("p");
        cuisine.textContent = "Cuisine: " + recipe.cuisine;
        card.appendChild(cuisine);

        const time = document.createElement("p");
        time.textContent = "Preparation Time: " + recipe.prepTimeMinutes + " minutes";
        card.appendChild(time);

        recipeArea.appendChild(card);
        input.value = "";

    } catch (error) {
        statusText.textContent = "Can't reach the recipe server. Check your internet.";
    }
}

button.addEventListener("click", loadRecipe);


        const dishInput = document.getElementById("dish-name");
        const postButton = document.getElementById("post-btn");
        const postStatus = document.getElementById("post-status");
        const savedArea = document.getElementById("saved");



async function addDish() {
    savedArea.textContent = "";

    const response = await fetch("https://dummyjson.com/recipes/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: dishInput.value
        })
    });

    const newDish = await response.json();
    console.log(newDish);

    const message = document.createElement("p");
    message.className = "alert alert-success";
    message.textContent = 'Added "' + newDish.name + '" as recipe #' + newDish.id + " (practice server: not really saved)";
    savedArea.appendChild(message);
    dishInput.value = "";
}

postButton.addEventListener("click", addDish);

