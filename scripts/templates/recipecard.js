export default class RecipeCard {
  static createRecipe(Recipe) {
    const card = document.createElement('div');

    card.classList.add('col');
    card.innerHTML = `<div class="card h-100 border-0 rounded-3 overflow-hidden">
          <svg class="card-img-top img-fluid"></svg>
          <div class="card-body bg-search lh-sm"">
              <div class="card-title d-flex justify-content-between mb-3">
                  <p class="d-flex justify-content-between mb-0 fw-normal">
                  ${Recipe.name}</p>
                  <span class="text-nowrap fw-bold">
                      <em class="bi bi-clock pe-1"></em>
                      ${Recipe.time} min
                  </span>
              </div>
            <div class="card-text d-flex small">
              <div class="w-50">
              </div>
              <div class="ps-3 w-50 overflow-hidden text-truncate-multiline">${Recipe.description}</div>
            </div>
          </div>
        </div>`;

    const ingredients = card.querySelector('div.card-text div.w-50');

    Recipe.ingredients.forEach((ingredient) => {
      const p = document.createElement('p');

      p.classList.add('mb-0', 'text-truncate');
      p.innerHTML = `<strong>${ingredient.ingredient}</strong>`;

      if (ingredient.quantity) {
        p.innerHTML += `: ${ingredient.quantity} `;
      }
      if (ingredient.unit) {
        p.innerHTML += ingredient.unit;
      }
      ingredients.appendChild(p);
    });

    return card;
  }

  static createRecipes(Recipes) {
    const wrapper = document.getElementById('recipe');

    wrapper.innerHTML = '';

    if (Recipes.isEmpty()) {
      wrapper.append(this.createMsgError());
    } else {
      Recipes.recipes.forEach((recipe) => {
        wrapper.append(this.createRecipe(recipe));
      });
    }
  }

  static createMsgError() {
    const msgError = document.createElement('p');

    msgError.classList.add('w-100', 'fs-4', 'pt-5');
    msgError.innerText =
      'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.';

    return msgError;
  }
}
