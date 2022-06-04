const isRussianLetters = selector => {
  const fields = document.querySelectorAll(selector);

  fields.forEach(field => {
    field.addEventListener(`keypress`, e => {
      if(e.key.match(/[^а-яё 0-9]/gi)) {
        e.preventDefault();
      }
    });
    field.addEventListener(`change`, () => {
      if(field.value.match(/[a-z]/gi)) {
        field.value = ``;
      }
    });
  });
};

export default isRussianLetters;