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

    this.ingredients.forEach((item) => {
      if (item.ingredient.toLowerCase().includes(search.toLowerCase())) {
        match = true;
      }
    });
    return match;
  }

  ustensilsIncludes(search) {
    let match = false;

    this.ustensils.forEach((ustensil) => {
      if (ustensil.toLowerCase().includes(search.toLowerCase())) {
        match = true;
      }
    });
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
