const filter = (menuSelector, menuBtnsSelector, portfolioWrapper, portfolioWorks, noSuchWorks) => {
  const menu = document.querySelector(menuSelector),
    menuButtons = menu.querySelectorAll(menuBtnsSelector),
    portfolio = document.querySelector(portfolioWrapper),
    works = portfolio.querySelectorAll(portfolioWorks),
    noWorks = document.querySelector(noSuchWorks);

  function showItem(item, display, ...classes) {
    item.style.display = display;
    item.classList.add(...classes);
  }

  function hideItem(item, display, ...classes) {
    item.style.display = display;
    item.classList.remove(...classes);
  }

  const makeFilter = type => {
    works.forEach(work => {
      hideItem(work, `none`, `animated`, `fadeIn`);
    });
    hideItem(noWorks, `none`, `animated`, `fadeIn`);
    if (type) {
      type.forEach(typeItem => {
        showItem(typeItem, `block`, `animated`, `fadeIn`);
      });
    } else {
      showItem(noWorks, `block`, `animated`, `fadeIn`);
    }
  };

  const callFilter = selector => {
    const btn = menu.querySelector(selector),
      works = portfolio.querySelectorAll(selector);
    btn.addEventListener(`click`, () => {
      works.length > 0 ? makeFilter(works) : makeFilter();
    });
  };

  menu.addEventListener(`click`, e => {
    if (e.target && e.target.tagName === `LI`) {
      menuButtons.forEach(btn => btn.classList.remove(`active`));
      e.target.classList.add(`active`);
    }
  });

  callFilter(`.all`);
  callFilter(`.lovers`);
  callFilter(`.girl`);
  callFilter(`.chef`);
  callFilter(`.guy`);
  callFilter(`.grandmother`);
  callFilter(`.granddad`);

};

export default filter;