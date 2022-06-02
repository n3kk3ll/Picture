import calcScrollWidth from "./calcScrollWidth";

const modals = () => {
  const scroll = calcScrollWidth();

  function handleModal(triggerSelector, modalSelector, closeBtn, closeByOverlayClick = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = modal.querySelector(closeBtn),
      popups = document.querySelectorAll(`[data-modal]`);

    function openModal() {
      modal.style.display = `block`;
      document.body.classList.add(`modal-open`);
      document.body.style.marginRight = `${scroll}px`;
    }

    function closeModal() {
      closeAllPopups(popups);
      modal.style.display = `none`;
      document.body.classList.remove(`modal-open`);
      document.body.style.marginRight = `0px`;
    }

    function closeAllPopups(popupList) {
      popupList.forEach(popup => {
        popup.style.display = `none`;
      });
    }

    trigger.forEach(item => {
      item.addEventListener(`click`, e => {
        if (e.target && e.target.attributes.href) {
          e.preventDefault();
        }
        closeAllPopups(popups);
        openModal();
      });
    });

    close.addEventListener(`click`, closeModal);

    modal.addEventListener(`click`, e => {
      if (e.target && e.target === modal && closeByOverlayClick) {
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
        document.body.classList.add(`modal-open`);
        document.body.style.marginRight = `${scroll}px`;
      }
    }, time);
  }
  showModalAfterTime(`.popup-consultation`, 60e3);

  handleModal(`.button-design`, `.popup-design`, `.popup-close`);
  handleModal(`.button-consultation`, `.popup-consultation`, `.popup-close`);

};

export default modals;