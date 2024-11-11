'use strict';

const cakeRecipes = require("./cake-recipes.json");
const prompt = require(prompt-sync)();

// Your functions here

// Get unique authors
const getAuthorsUnique = (recipes) => {
  const authors = [];
  recipes.forEach(recipe => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  })
  return authors;
}

// Printing names of recipes
const printNamesRecipes = (recipes) => {
  if (recipes.length === 0) {
    console.log("No recipes found!");
  } else {
    recipes.forEach(({ Name }) => console.log(Name));
  }
}

// Get all recipes of given author
const getRecipesAuthor = (recipes, givenAuthor) => {
  return recipes.filter(recipe => recipe.Author.toLowerCase() === givenAuthor.toLowerCase());
}

// Get all recipes with given ingredient
const getRecipesIngredient = (recipes, givenIngredient) => {
  return recipes.filter(({ Ingredients }) => Ingredients.some(element => element.toLowerCase() === givenIngredient.toLowerCase()));
}

// Get recipe by name
const getRecipeByName = (recipes, recipeName) => {
  return recipes.find(({ Name }) => Name.toLowerCase().includes(recipeName.toLowerCase()));
};

// Get all ingredients of saved recipes 
const getAllIngredients = (recipes) => {
  return recipes.reduce((allIngredients, recipe) => {
    recipe.Ingredients.forEach((ingredient) => {
      if (!allIngredients.includes(ingredient)) {
        allIngredients.push(ingredient);
      }
    });
    return allIngredients;
  }, []);
};

// Part 2

// Display Menu
const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}

let choice;
const savedIngredients = [];

// loop for printing options
do {
  choice = displayMenu();

  switch (choice) {

    case 1:
      console.log(`\nList of all unique authors:\n`);
      getAuthorsUnique(cakeRecipes).forEach((author) => console.log(author));
      break;
    case 2:
      const authorName = prompt("Enter a name of an author:");
      console.log(`\nGet recipe names of author ${authorName.trim()}:\n`);
      printNamesRecipes(getRecipesAuthor(cakeRecipes, authorName.trim()));
      break;
    case 3:
      const ingredientName = prompt("Enter a name of an ingredient:");
      console.log(`\nGet recipe names with ingredient ${ingredientName.trim()}:\n`);
      printNamesRecipes(getRecipesIngredient(cakeRecipes, ingredientName.trim()));
      break;
    case 4:
      const nameRecipe = prompt("Enter a name of a recipe:");
      console.log(`\nGet Recipe of ${nameRecipe.trim()}:`);
      const printRecipeByName = getRecipeByName(cakeRecipes, nameRecipe.trim());
      if (printRecipeByName) {
        console.log(`
Name: ${printRecipeByName.Name}\n
url: ${printRecipeByName.url}\n
Description: ${printRecipeByName.Description}\n       
Author: ${printRecipeByName.Author}\n
Ingredients: ${printRecipeByName.Ingredients}\n
Method: ${printRecipeByName.Method}\n        
                 `);
        const toSaveIngredients = prompt("Do you want to save the ingredients?(Y/N)");
        if (toSaveIngredients.toLowerCase() === "y") {
          savedIngredients.push(printRecipeByName);
        }
      } else { console.log("Recipe not found. Please enter a valid name."); }
      break;
    case 5:
      console.log(`\nGet all ingredients of saved recipes:\n`);
      if (savedIngredients.length !== 0) {
        getAllIngredients(savedIngredients).forEach((ingredient) => console.log(ingredient));
      } else { console.log("No saved ingredients"); }
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
