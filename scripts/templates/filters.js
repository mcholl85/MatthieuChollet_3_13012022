export default class Filters {
  static openFilters() {
    const btnFilters = document.querySelectorAll('#filters > button');
    const searchFilters = document.querySelectorAll('#filters > div');

    btnFilters.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        btnFilters.forEach((b) => b.classList.remove('d-none'));
        searchFilters.forEach((b) => b.classList.add('d-none'));
        event.target.classList.add('d-none');
        event.target.nextElementSibling.classList.remove('d-none');
      });
    });
  }

  static closeFilters() {
    const btnFilters = document.querySelectorAll('#filters > button');
    const searchFilters = document.querySelectorAll('#filters > div');
    const close = document.getElementsByName('closeFilter');

    close.forEach((btnClose) => {
      btnClose.addEventListener('click', () => {
        searchFilters.forEach((b) => b.classList.add('d-none'));
        btnFilters.forEach((b) => b.classList.remove('d-none'));
      });
    });
  }

  static init() {
    this.openFilters();
    this.closeFilters();
  }

  static keyWord(keyWord, filter) {
    const button = document.createElement('button');

    button.classList.add(
      'btn',
      `btn--${filter}`,
      'shadow-none',
      'd-flex',
      'justify-content-between',
      'align-items-center',
    );
    button.innerHTML = `
              <small class="fw-bold text-capitalize">${keyWord}</small>
              <em class="far fa-times-circle ms-2"></em>
          `;
    return button;
  }

  static link(data) {
    const link = document.createElement('a');

    link.setAttribute('href', '#');
    link.classList.add('mw-200', 'text-capitalize', 'text-truncate');
    link.innerHTML = `<small>${data}</small>`;

    return link;
  }

  static msgError(filterKey) {
    const msgError = document.createElement('p');

    msgError.classList.add('w-100');
    msgError.innerText = `Aucun ${filterKey} n'est disponible.`;

    return msgError;
  }
}
