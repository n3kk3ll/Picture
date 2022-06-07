const showSizesImg = selector => {
  const items = document.querySelectorAll(selector);

  const showImg = block => {
    const img = block.querySelector(`img`);
    img.src = `${img.src.split('.')[0]}-1.${img.src.split('.')[1]}`;
    block.querySelectorAll(`p:not(.sizes-hit)`).forEach(p => p.style.display = `none`);
  }

  const hideImg = block => {
    const img = block.querySelector(`img`);
    img.src = `${img.src.split('.')[0].slice(0, -2)}.${img.src.split('.')[1]}`;
    block.querySelectorAll(`p:not(.sizes-hit)`).forEach(p => p.style.display = `block`);
  }

  items.forEach(item => {
    item.addEventListener(`mouseover`, () => {
      showImg(item);
    });

    item.addEventListener(`mouseout`, () => {
      hideImg(item);
    });
  });
};

export default showSizesImg;