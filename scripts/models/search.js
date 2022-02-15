import Filters from '../templates/filters.js';
import RecipeCard from '../templates/recipecard.js';

export default class Search {
  constructor(Recipes) {
    this.recipes = Recipes;
    this.filters = [
      {
        key: 'ingredients',
        data: new Set(),
      },
      {
        key: 'ustensils',
        data: new Set(),
      },
      {
        key: 'appareil',
        data: new Set(),
      },
    ];
    this.global = new Set();
  }

  getFilter(element) {
    return this.filters.find((filter) => filter.key === element);
  }

  getDataFilter(element) {
    return this.getFilter(element).data;
  }

  getElementsFilter(filterKey) {
    if (filterKey === 'ingredients') {
      return this.search()
        .ingredients()
        .filter((ingredient) => {
          if (this.getDataFilter(filterKey).has(ingredient.toLowerCase())) {
            return false;
          }
          return true;
        });
    }
    if (filterKey === 'ustensils') {
      return this.search()
        .ustensils()
        .filter((ustensil) => {
          if (this.getDataFilter(filterKey).has(ustensil.toLowerCase())) {
            return false;
          }
          return true;
        });
    }
    if (filterKey === 'appareil') {
      return this.search()
        .appliances()
        .filter((appliance) => {
          if (this.getDataFilter(filterKey).has(appliance.toLowerCase())) {
            return false;
          }
          return true;
        });
    }
    return new Error('wrong filterKey');
  }

  search() {
    let results = this.recipes;

    this.filters.forEach((filter) => {
      if (filter.data.size > 0) {
        if (filter.key === 'ingredients') {
          filter.data.forEach((data) => {
            results = results.findByIngredient(data);
          });
        }
        if (filter.key === 'ustensils') {
          filter.data.forEach((data) => {
            results = results.findByUstensil(data);
          });
        }
        if (filter.key === 'appareil') {
          filter.data.forEach((data) => {
            results = results.findByAppliance(data);
          });
        }
      }
    });

    if (this.global.size > 0) {
      this.global.forEach((elt) => {
        results = results.findByGlobal(elt);
      });
    }
    return results;
  }

  searchFilters() {
    this.filters.forEach((filter) => {
      const wrapperFilter = document.getElementById(`filter-${filter.key}`);
      const input = document.getElementById(filter.key);

      input.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const data = Array.from(this.getElementsFilter(filter.key));

        if (query.length > 2) {
          const dataFiltered = data.filter((elt) => elt.includes(query));

          wrapperFilter.innerHTML = '';
          dataFiltered.forEach((element) => {
            const link = Filters.link(element);

            wrapperFilter.appendChild(link);
            this.createKeyWord(link, filter);
          });
        } else {
          this.createFilters();
        }
      });
    });
  }

  searchGlobal() {
    const input = document.getElementById('global');

    input.addEventListener('input', (event) => {
      const search = event.target.value.toLowerCase();

      if (search.length > 2) {
        const results = this.search().findByGlobal(search);

        RecipeCard.createRecipes(results);
      } else {
        this.global = {};
        RecipeCard.createRecipes(this.search());
      }
    });
  }

  removeKeyWord(keyWord, filter) {
    const wrapperKeyword = document.getElementById('keyword');
    const keyWordTxt = keyWord.querySelector('small').innerText.toLowerCase();

    keyWord.addEventListener('click', () => {
      wrapperKeyword.removeChild(keyWord);
      filter.data.delete(keyWordTxt);
      RecipeCard.createRecipes(this.search());
      this.createFilters();
    });
  }

  createKeyWord(link, filter) {
    const wrapperKeyword = document.getElementById('keyword');

    link.addEventListener('click', () => {
      const keyWord = Filters.keyWord(link.innerText, filter.key);

      wrapperKeyword.append(keyWord);
      filter.data.add(link.innerText.toLowerCase());
      this.removeKeyWord(keyWord, filter);
      this.createFilters();
      RecipeCard.createRecipes(this.search());
    });
  }

  createFilter(filter) {
    const wrapperFilter = document.getElementById(`filter-${filter.key}`);
    const elements = this.getElementsFilter(filter.key);

    wrapperFilter.innerHTML = '';

    elements.forEach((element) => {
      const link = Filters.link(element);

      wrapperFilter.appendChild(link);
      this.createKeyWord(link, filter);
    });
  }

  createFilters() {
    this.filters.forEach((filter) => {
      this.createFilter(filter);
    });
  }
}