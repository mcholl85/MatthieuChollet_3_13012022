import Recipe from './recipe.js';

export default class Recipes {
  constructor(recipes) {
    this.recipes = recipes.map((recipe) => new Recipe(recipe));
  }

  isEmpty() {
    return !this.recipes.length;
  }

  findByIngredient(search) {
    return new Recipes(
      this.recipes.filter((recipe) => recipe.ingredientsIncludes(search)),
    );
  }

  findByUstensil(search) {
    return new Recipes(
      this.recipes.filter((recipe) => recipe.ustensilsIncludes(search)),
    );
  }

  findByAppliance(search) {
    return new Recipes(
      this.recipes.filter((recipe) => recipe.applianceIncludes(search)),
    );
  }

  findByGlobal(search) {
    return new Recipes(
      this.recipes.filter((recipe) => {
        if (recipe.ingredientsIncludes(search)) {
          return true;
        }
        if (recipe.nameIncludes(search)) {
          return true;
        }
        if (recipe.descriptionIncludes(search)) {
          return true;
        }
        return false;
      }),
    );
  }

  findByGlobalNative(search) {
    const results = [];

    for (let index = 0; index < this.recipes.length; index += 1) {
      const element = this.recipes[index];

      if (element.ingredientsIncludesNative(search)) {
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
