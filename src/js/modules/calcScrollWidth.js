const calcScrollWidth = () => {
  let block = document.createElement(`div`);

  block.style.width = `50px`;
  block.style.heigth = `50px`;
  block.style.overflowY = `scroll`;
  block.style.visibility = `hidden`;

  document.body.appendChild(block);

  let scrollWidth = block.offsetWidth - block.clientWidth;
  block.remove();

  return scrollWidth;
};

export default calcScrollWidth;