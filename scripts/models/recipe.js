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
    let match = false;

    for (let index = 0; index < this.ingredients.length; index += 1) {
      const element = this.ingredients[index].ingredient.toLowerCase();

      if (element.includes(search.toLowerCase())) {
        match = true;
      }
    }
    return match;
  }

  ustensilsIncludes(search) {
    let match = false;

    for (let index = 0; index < this.ustensils.length; index += 1) {
      const element = this.ustensils[index].toLowerCase();

      if (element.includes(search.toLowerCase())) {
        match = true;
      }
    }
    return match;
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
