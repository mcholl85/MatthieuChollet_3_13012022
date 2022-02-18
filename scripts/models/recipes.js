import Recipe from './recipe.js';

export default class Recipes {
  constructor(recipes) {
    const results = [];

    for (let index = 0; index < recipes.length; index += 1) {
      const element = new Recipe(recipes[index]);

      results.push(element);
    }

    this.recipes = results;
  }

  isEmpty() {
    return !this.recipes.length;
  }

  findByIngredient(search) {
    const results = [];

    for (let index = 0; index < this.recipes.length; index += 1) {
      const element = this.recipes[index];

      if (element.ingredientsIncludes(search)) {
        results.push(element);
      }
    }
    return new Recipes(results);
  }

  findByUstensil(search) {
    const results = [];

    for (let index = 0; index < this.recipes.length; index += 1) {
      const element = this.recipes[index];

      if (element.ustensilsIncludes(search)) {
        results.push(element);
      }
    }
    return new Recipes(results);
  }

  findByAppliance(search) {
    const results = [];

    for (let index = 0; index < this.recipes.length; index += 1) {
      const element = this.recipes[index];

      if (element.applianceIncludes(search)) {
        results.push(element);
      }
    }
    return new Recipes(results);
  }

  findByGlobal(search) {
    const results = [];

    for (let index = 0; index < this.recipes.length; index += 1) {
      const element = this.recipes[index];

      if (element.ingredientsIncludes(search)) {
        results.push(element);
      } else if (element.nameIncludes(search)) {
        results.push(element);
      } else if (element.descriptionIncludes(search)) {
        results.push(element);
      }
    }

    return new Recipes(results);
  }

  ingredients() {
    return [
      ...new Set(
        this.recipes
          .flatMap((recipe) => recipe.ingredients)
          .map((ingredients) => ingredients.ingredient.toLowerCase()),
      ),
    ];
  }

  ustensils() {
    return [
      ...new Set(
        this.recipes
          .flatMap((recipe) => recipe.ustensils)
          .map((ustensil) => ustensil.toLowerCase()),
      ),
    ];
  }

  appliances() {
    return [
      ...new Set(this.recipes.map((recipe) => recipe.appliance.toLowerCase())),
    ];
  }
}
