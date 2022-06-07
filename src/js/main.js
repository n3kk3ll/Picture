import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import isRussianLetters from "./modules/isRussianLetters";
import showCards from "./modules/showCards";
// import showCardsFromServer from "./modules/showCardsFromServer";
import calcPrice from "./modules/calcPrice";
import filter from "./modules/filter";
import showSizesImg from "./modules/showSizesImg";

window.addEventListener(`DOMContentLoaded`, () => {
  'use strict';

  modals();
  sliders(`.feedback-slider-item`, `horizontal`, `.main-prev-btn`, `.main-next-btn`);
  sliders(`.main-slider-item`, `vertical`);
  forms();
  mask(`[name=phone]`);
  isRussianLetters(`[name=name]`);
  isRussianLetters(`[name=message]`);

  // Show various styles (optional)
  // 1. By interacting with HTML Layout
  showCards(`.button-styles`, `.styles-2`);

  // 2. By interacting with server
  // showCardsFromServer(`.button-styles`, `#styles .row`);

  calcPrice(`#size`, `#material`, `#options`, `.promocode`, `.calc-price`);
  filter(`.portfolio-menu`, `li`, `.portfolio-wrapper`, `.portfolio-block`, `.portfolio-no`);
  showSizesImg(`.sizes-block`);
});