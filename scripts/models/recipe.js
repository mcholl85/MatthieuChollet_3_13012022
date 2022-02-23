export default class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.servings = recipe.servings;
    this.ingredients = recipe.ingredients;
    this.time = recipe.time;
    this.description = recipe.description;
    this.appliance = recipe.appliance;
    this.ustensils = recipe.ustensils;
  }

  ingredientsIncludes(search) {
    return this.ingredients.some((item) =>
      item.ingredient.toLowerCase().includes(search.toLowerCase()),
    );
  }

  ingredientsIncludesNative(search) {
    for (let index = 0; index < this.ingredients.length; index += 1) {
      const element = this.ingredients[index].ingredient.toLowerCase();

      if (element.includes(search.toLowerCase())) {
        return true;
      }
    }
    return false;
  }

  ustensilsIncludes(search) {
    return this.ustensils.some((item) =>
      item.toLowerCase().includes(search.toLowerCase()),
    );
  }

  applianceIncludes(search) {
    return this.appliance.toLowerCase().includes(search.toLowerCase());
  }

  nameIncludes(search) {
    return this.name.toLowerCase().includes(search.toLowerCase());
  }

  descriptionIncludes(search) {
    return this.description.toLowerCase().includes(search.toLowerCase());
  }
}
