import { getResources } from "../services/requests";

const showCardsFromServer = (trigger, styles) => {
  const cards = document.querySelector(styles),
    btn = document.querySelector(trigger);

  function renderCards(res, wrapper) {
    res.forEach(({src, title, link}) => {
      let card = document.createElement(`div`);

      card.classList.add(`col-sm-3`, `col-sm-offset-0`, `col-xs-10`, `col-xs-offset-1`, `animated`, `fadeInUp`);
      card.innerHTML = `
        <div class=styles-block>
          <img src=${src} alt="">
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>
      `;
      document.querySelector(wrapper).appendChild(card);
    });
  }

  btn.addEventListener(`click`, function() {
    getResources(`http://localhost:3000/styles`)
    .then(res => {
      renderCards(res, styles)
      this.remove();
    })
    .catch(() => {
      let message = document.createElement(`div`);
      message.style.cssText = `
        font-size: 24px;
        font-weight: 700;
        color: #f00;
        text-align: center;
      `;
      message.textContent = `Ошибка. Невозможно получить данные от сервера.`;
      cards.appendChild(message);
      this.disabled = true;
      setTimeout(() => {
        message.remove();
        this.disabled = false;
      }, 5000);
    });
  });
};


export default showCardsFromServer;