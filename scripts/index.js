import data from '../data/recipes.js';
import Recipes from './models/recipes.js';
import Search from './models/search.js';
import RecipeCard from './templates/recipecard.js';
import Filters from './templates/filters.js';

const recipes = new Recipes(data);
const results = new Search(recipes);

RecipeCard.createRecipes(results.search());

Filters.init();

results.createFilters();
results.searchFilters();
results.searchAll();
