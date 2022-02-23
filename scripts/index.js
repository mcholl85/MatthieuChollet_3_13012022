import data from '../data/recipes.js';
import Recipes from './models/recipes.js';
import Search from './models/search.js';
import RecipeCard from './templates/recipecard.js';
import Filters from './templates/filters.js';

const recipes = new Recipes(data);
const results = new Search(recipes);
const global = document.getElementById('global');

RecipeCard.createRecipes(results.search());
Filters.init();
results.createFilters();
results.searchFilters();

function search(event) {
  results.searchAll(event);
}

function searchNative(event) {
  results.searchAllNative(event);
}

global.addEventListener('input', search);

const toggle = document.getElementById('switcher-1');
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    global.removeEventListener('input', search);
    global.addEventListener('input', searchNative);
  } else {
    global.removeEventListener('input', searchNative);
    global.addEventListener('input', search);
  }
});
