const sliders = (items, direction, prevBtn, nextBtn) => {
  const slides = document.querySelectorAll(items);

  let slideIndex = 1,
      paused;

  function showSlides(index) {
    if (index > slides.length) {
      slideIndex = 1;
    }

    if (index < 1) {
      slideIndex = slides.length;
    }

    slides.forEach(slide => {
      slide.classList.add(`animated`);
      slide.style.display = `none`;
    });

    slides[slideIndex - 1].style.display = `block`;
  }

  showSlides(slideIndex);

  function moveSlide(n) {
    showSlides(slideIndex += n);
  }

  function swapClasses(classToRemove, classToAdd) {
    slides[slideIndex - 1].classList.remove(classToRemove);
    slides[slideIndex - 1].classList.add(classToAdd);
  }

  function runAnimation() {
    switch(direction) {
      case `vertical`:
        paused = setInterval(() => {
          moveSlide(1);
          slides[slideIndex - 1].classList.add(`slideInDown`);
        }, 5000);
        break;
      case `horizontal`:
        paused = setInterval(() => {
          moveSlide(1);
          slides[slideIndex - 1].classList.add(`slideInRight`);
        }, 5000);
        break;
    }
  }
  
  runAnimation();

  try {
    const prev = document.querySelector(prevBtn),
      next = document.querySelector(nextBtn);

    prev.addEventListener(`click`, () => {
      moveSlide(-1);
      swapClasses(`slideInRight`, `slideInLeft`);
    });

    next.addEventListener(`click`, () => {
      moveSlide(1);
      swapClasses(`slideInLeft`, `slideInRight`);
    });
  } catch (error) {

  }

  slides[0].parentNode.addEventListener(`mouseenter`, () => {
    clearInterval(paused);
  });

  slides[0].parentNode.addEventListener(`mouseleave`, () => {
    runAnimation();
  });

};

export default sliders;