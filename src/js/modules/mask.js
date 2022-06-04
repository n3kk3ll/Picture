const mask = (selector) => {
  const inputs = document.querySelectorAll(selector);

  function setCursor(position, element) {
    element.focus();

    if (element.setSelectionRange) {
      element.addEventListener(`mouseup`, () => {
        element.setSelectionRange(position, position);
      });
    } else if (element.createTextRange) {
      let range = element.createTextRange();
      range.addEventListener(`mouseup`, () => {
        range.collapse(true);
        range.moveEnd(`character`, position);
        range.moveStart(`character`, position);
        range.select();
      });
    }
  }

  function createMask(event) {
    let matrix = `+7 (___) ___ __ __`,
      i = 0,
      def = matrix.replace(/\D/g, ``),
      val = this.value.replace(/\D/g, ``);

    if (def.length >= val.length) {
      val = def;
    }

    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? `` : a;
    });

    if (event.type === `blur`) {
      if (this.value.length === 2) {
        this.value = ``;
      }
    } else {
      setCursor(this.value.length, this);
    }
  }

  inputs.forEach(input => {
    input.addEventListener(`input`, createMask);
    input.addEventListener(`focus`, createMask);
    input.addEventListener(`blur`, createMask);
  });

};

export default mask;