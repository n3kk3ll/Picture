const accordion = (selector) => {
  const triggers = document.querySelectorAll(selector);

  triggers.forEach(btn => {
    btn.addEventListener(`click`, function() {
      triggers.forEach(btn => {
        btn.classList.remove(`active-style`);
        btn.nextElementSibling.classList.remove(`active-content`);
        btn.nextElementSibling.style.maxHeight = 0;
      });
      this.classList.toggle(`active-style`);
      this.nextElementSibling.classList.toggle(`active-content`);
      if(this.classList.contains(`active-style`)) {
        this.nextElementSibling.style.maxHeight = `${this.nextElementSibling.scrollHeight + 60}px`;
      } else {
        this.nextElementSibling.style.maxHeight = 0;
      }
    });
  });
};

export default accordion;