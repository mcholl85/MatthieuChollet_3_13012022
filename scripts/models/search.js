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

  // return the object filter with the key
  getFilter(element) {
    return this.filters.find((filter) => filter.key === element);
  }

  // return the object filter's data with the key
  getDataFilter(element) {
    return this.getFilter(element).data;
  }

  // return the array of elements(ingredients, ustensils or appliance) filtered
  getElementsByFilter(filterKey) {
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

  // method to get recipes filtered by filters and global
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

    if (!this.global.length) {
      this.global.forEach((data) => {
        results = results.findByGlobal(data);
      });
    }

    return results;
  }

  searchNative() {
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

    if (!this.global.length) {
      this.global.forEach((data) => {
        results = results.findByGlobalNative(data);
      });
    }

    return results;
  }

  // apply method search elements into filters
  searchFilters() {
    this.filters.forEach((filter) => {
      const wrapperFilter = document.getElementById(`filter-${filter.key}`);
      const input = document.getElementById(filter.key);

      input.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const data = Array.from(this.getElementsByFilter(filter.key));

        if (query.length > 2) {
          const dataFiltered = data.filter((elt) => elt.includes(query));

          wrapperFilter.innerHTML = '';

          if (dataFiltered.length) {
            dataFiltered.forEach((element) => {
              const link = Filters.link(element);

              wrapperFilter.appendChild(link);
              this.createKeyWord(link, filter);
            });
          } else {
            const msg = Filters.msgError(filter.key);

            wrapperFilter.appendChild(msg);
          }
        } else {
          this.createFilters();
        }
      });
    });
  }

  // add values into global and refresh filters and recipes on page
  searchAll(event) {
    const query = event.target.value.toLowerCase();

    if (query.length > 2) {
      this.global = new Set(query.split(' '));
    } else {
      this.global = new Set();
    }

    const t0 = performance.now();
    const results = this.search();
    const t1 = performance.now();
    console.log(
      `La recherche fonctionnelle a demandé ${(t1 - t0).toFixed(
        2,
      )}millisecondes`,
    );
    this.refresh(results);
  }

  searchAllNative(event) {
    const query = event.target.value.toLowerCase();

    if (query.length > 2) {
      this.global = new Set(query.split(' '));
    } else {
      this.global = new Set();
    }

    const t0 = performance.now();
    const results = this.searchNative();
    const t1 = performance.now();
    console.log(
      `La recherche native a demandé ${(t1 - t0).toFixed(2)}millisecondes`,
    );
    this.refresh(results);
  }

  // apply addListener to remove keyword on click and refresh
  removeKeyWord(keyWord, filter) {
    const wrapperKeyword = document.getElementById('keyword');
    const keyWordTxt = keyWord.querySelector('small').innerText.toLowerCase();

    keyWord.addEventListener('click', () => {
      wrapperKeyword.removeChild(keyWord);
      filter.data.delete(keyWordTxt);
      this.refresh(this.search());
    });
  }

  // apply addListener to create keyword and refresh
  createKeyWord(link, filter) {
    const wrapperKeyword = document.getElementById('keyword');

    link.addEventListener('click', () => {
      const keyWord = Filters.keyWord(link.innerText, filter.key);

      wrapperKeyword.append(keyWord);
      filter.data.add(link.innerText.toLowerCase());
      this.removeKeyWord(keyWord, filter);

      this.refresh(this.search());
    });
  }

  // display the list of elements of a filter
  createFilter(filter) {
    const wrapperFilter = document.getElementById(`filter-${filter.key}`);
    const elements = this.getElementsByFilter(filter.key);

    wrapperFilter.innerHTML = '';

    if (elements.length) {
      elements.forEach((element) => {
        const link = Filters.link(element);

        wrapperFilter.appendChild(link);
        this.createKeyWord(link, filter);
      });
    } else {
      const msg = Filters.msgError(filter.key);

      wrapperFilter.appendChild(msg);
    }
  }

  // display the list of elements of each filter
  createFilters() {
    this.filters.forEach((filter) => {
      this.createFilter(filter);
    });
  }

  // method to display the list of up-to-date recipes and filters
  refresh(Recipes) {
    this.createFilters();
    RecipeCard.createRecipes(Recipes);
  }
}
