const calcPrice = (size, material, options, promocode, result) => {
  const sizeBlock = document.querySelector(size),
    materialBlock = document.querySelector(material),
    optionsBlock = document.querySelector(options),
    promocodeBlock = document.querySelector(promocode),
    resultBlock = document.querySelector(result);
  let sum = 0;

  const calculator = () => {
    sum = Math.round((+sizeBlock.value * +materialBlock.value) + (+optionsBlock.value));

    if (sizeBlock.value === `` || materialBlock.value === ``) {
      resultBlock.textContent = `Для расчета нужно выбрать размер картины и материал картины`;
    } else if (promocodeBlock.value === `IWANTPOPART`) {
      resultBlock.innerHTML = `${Math.round(sum * 0.7)} &#8381;`;
      resultBlock.style.fontWeight = `700`;
    } else {
      resultBlock.innerHTML = `${Math.round(sum)} &#8381;`;
      resultBlock.style.fontWeight = `700`;
    }
  };

  sizeBlock.addEventListener(`change`, calculator);
  materialBlock.addEventListener(`change`, calculator);
  optionsBlock.addEventListener(`change`, calculator);
  promocodeBlock.addEventListener(`input`, calculator);
};

export default calcPrice;