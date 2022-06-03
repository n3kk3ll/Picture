import calcScrollWidth from "./calcScrollWidth";

const modals = () => {
  const scroll = calcScrollWidth();
  let isAnyButtonPressed = false;

  function handleModal(triggerSelector, modalSelector, closeBtn, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = modal.querySelector(closeBtn),
      popups = document.querySelectorAll(`[data-modal]`),
      giftIcon = document.querySelector(`.fixed-gift`);

    function openModal() {
      modal.style.display = `block`;
      document.body.classList.add(`modal-open`);
      document.body.style.marginRight = `${scroll}px`;
      giftIcon.style.marginRight = `${scroll}px`;
    }

    function closeModal() {
      closeAllPopups(popups);
      modal.style.display = `none`;
      document.body.classList.remove(`modal-open`);
      document.body.style.marginRight = `0px`;
      giftIcon.style.marginRight = `0px`;
    }

    function closeAllPopups(popupList) {
      popupList.forEach(popup => {
        popup.style.display = `none`;
        popup.classList.add(`animated`, `fadeIn`);
      });
    }

    trigger.forEach(item => {
      item.addEventListener(`click`, e => {
        isAnyButtonPressed = true;
        if (e.target && e.target.attributes.href) {
          e.preventDefault();
        }
        if(destroy) {
          item.remove();
        }
        closeAllPopups(popups);
        openModal();
      });
    });

    close.addEventListener(`click`, closeModal);

    modal.addEventListener(`click`, e => {
      if (e.target && e.target === modal) {
        closeAllPopups(popups);
        closeModal();
      }
    });

  }

  function showModalAfterTime(modal, time) {
    setTimeout(() => {
      let display;

      document.querySelectorAll(`[data-modal]`).forEach(popup => {
        if (getComputedStyle(popup).display !== `none`) {
          display = `block`;
        }
      });
      if (!display) {
        document.querySelector(modal).style.display = `block`;
        document.querySelector(modal).classList.add(`animated`, `fadeIn`);
        document.body.classList.add(`modal-open`);
        document.body.style.marginRight = `${scroll}px`;
        document.querySelector(`.fixed-gift`).style.marginRight = `${scroll}px`;
      }
    }, time);
  }

  function showModalByScroll(selector) {
    window.addEventListener(`scroll`, () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      if(!isAnyButtonPressed && ((window.scrollY + document.documentElement.clientHeight) >= scrollHeight)) {
        document.querySelector(selector).click();
      }
    });
  }

  showModalAfterTime(`.popup-consultation`, 6e3);
  showModalByScroll(`.fixed-gift`);
  handleModal(`.button-design`, `.popup-design`, `.popup-close`);
  handleModal(`.button-consultation`, `.popup-consultation`, `.popup-close`);
  handleModal(`.fixed-gift`, `.popup-gift`, `.popup-close`, true);
};

export default modals;