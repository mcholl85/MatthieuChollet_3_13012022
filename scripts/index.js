import recipes from '../data/recipes.js';

const ArrayUstensils = [
  ...new Set(
    recipes
      .flatMap((recipe) => recipe.ustensils)
      .map((ustensil) => ustensil.toLowerCase()),
  ),
];

const ArrayAppliances = [
  ...new Set(recipes.map((recipe) => recipe.appliance.toLowerCase())),
];

const ArrayIngredients = [
  ...new Set(
    recipes
      .flatMap((recipe) => recipe.ingredients)
      .map((ingredients) => ingredients.ingredient.toLowerCase()),
  ),
];

const filterIngredients = document.getElementById('listIngredients');
const filterAppliance = document.getElementById('listAppliances');
const filterUstensiles = document.getElementById('listUstensiles');

function createKeyWord(keyWord, group) {
  const sectionWrapper = document.getElementById('keyword');
  const button = document.createElement('button');

  button.classList.add(
    'btn',
    `btn--${group}`,
    'shadow-none',
    'd-flex',
    'justify-content-between',
    'align-items-center',
  );
  button.innerHTML = `
        <small class="fw-bold text-capitalize">${keyWord}</small>
        <em class="far fa-times-circle ms-2"></em>
    `;
  sectionWrapper.appendChild(button);

  button.addEventListener('click', () => sectionWrapper.removeChild(button));
}

function createLink(data, group) {
  const link = document.createElement('a');

  link.setAttribute('href', '#');
  link.classList.add('col', 'text-capitalize', 'text-truncate');
  link.innerHTML = `<small>${data}</small>`;

  link.addEventListener('click', () => createKeyWord(data, group));

  return link;
}

function createFilter(array, filter, group) {
  array.forEach((elt) => filter.appendChild(createLink(elt, group)));
}

function createRecipeCard(recipe) {
  const card = document.createElement('div');

  card.classList.add('col');
  card.innerHTML = `<div class="card h-100 border-0 rounded-3 overflow-hidden">
    <svg class="card-img-top img-fluid"></svg>
    <div class="card-body bg-search lh-sm"">
        <div class="card-title d-flex justify-content-between mb-3">
            <p class="d-flex justify-content-between mb-0 fw-normal">
            ${recipe.name}</p>
            <span class="text-nowrap fw-bold">
                <em class="bi bi-clock pe-1"></em>
                ${recipe.time} min
            </span>
        </div>
      <div class="card-text d-flex small">
        <div class="w-50">
        </div>
        <div class="ps-3 w-50 overflow-hidden text-truncate-multiline">${recipe.description}</div>
      </div>
    </div>
  </div>`;

  const ingredients = card.querySelector('div.card-text div.w-50');

  recipe.ingredients.forEach((ingredient) => {
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

createFilter(ArrayIngredients, filterIngredients, 'ingredient');
createFilter(ArrayUstensils, filterUstensiles, 'ustensile');
createFilter(ArrayAppliances, filterAppliance, 'appliance');

const btnFilters = document.querySelectorAll('#filters > button');
const searchFilters = document.querySelectorAll('#filters > div');
const closeFilters = document.getElementsByName('closeFilter');

closeFilters.forEach((btnClose) => {
  btnClose.addEventListener('click', () => {
    searchFilters.forEach((b) => b.classList.add('d-none'));
    btnFilters.forEach((b) => b.classList.remove('d-none'));
  });
});

btnFilters.forEach((btn) =>
  btn.addEventListener('click', (event) => {
    btnFilters.forEach((b) => b.classList.remove('d-none'));
    searchFilters.forEach((b) => b.classList.add('d-none'));
    event.target.classList.add('d-none');
    event.target.nextElementSibling.classList.remove('d-none');
  }),
);

recipes.forEach((recipe) => {
  document.getElementById('recipe').append(createRecipeCard(recipe));
});
