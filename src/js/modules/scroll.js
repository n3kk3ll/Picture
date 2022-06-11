const scroll = (selector) => {
  const up = document.querySelector(selector);
  up.classList.add(`animated`);
  window.addEventListener(`scroll`, () => {
    if(document.documentElement.scrollTop > 1650) {
      up.classList.add(`fadeIn`);
      up.classList.remove(`fadeOut`);
    } else {
      up.classList.add(`fadeOut`);
      up.classList.remove(`fadeIn`);
    }
  });
  
  // requestAnimationFrame scrolling

  const links = document.querySelectorAll(`[href^="#"]`);
  let speed = 0.3;

  links.forEach(link => {
    link.addEventListener(`click`, function (e) {
      e.preventDefault();

      let widthTop = Math.round((document.documentElement.scrollTop || document.body.scrollTop)),
          hash = this.hash,
          toBlock = document.querySelector(hash).getBoundingClientRect().top,
          start = null;

      requestAnimationFrame(step)

      function step (time) {
        if(start === null) {
          start = time;
        }
        let progress = time - start,
            r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));

        document.documentElement.scrollTo(0, r);
        if(r !== widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });

  // Pure JS scrolling

  // const element = document.documentElement,
  //       body = document.body;

  // const calcScroll = () => {
  //   up.addEventListener(`click`, function (e) {
  //     let scrollTop = Math.round((element.scrollTop || body.scrollTop));

  //     if(this.hash !== ``) {
  //       e.preventDefault();
  //       let hashElement = document.querySelector(this.hash),
  //           hashElementTop = 0;
  //       while (hashElement.offsetParent) {
  //         hashElementTop += hashElement.offsetTop;
  //         hashElement = hashElement.offsetParent;
  //       }
  //       hashElementTop = Math.round(hashElementTop);
  //       smoothScroll(scrollTop, hashElementTop, this.hash);
  //     }
  //   });
  // };

  // const smoothScroll = (from, to, hash) => {
  //   let timeInterval = 1,
  //       prevScrollTop,
  //       speed,
  //       moveScroll = setInterval(function () {
  //         let scrollTop = Math.round((element.scrollTop || body.scrollTop));
          
  //         if (
  //           prevScrollTop === scrollTop ||
  //           (to > from && scrollTop >= to) ||
  //           (to < from && scrollTop <= to)
  //           ) {
  //             clearInterval(moveScroll);
  //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, ``) + hash);
  //         } else {
  //           body.scrollTop += speed;
  //           element.scrollTop += speed;
  //           prevScrollTop = scrollTop;
  //         }
  //       }, timeInterval);

  //   if(to > from) {
  //     speed = 30;
  //   } else {
  //     speed = -30;
  //   }

  // };

  // calcScroll();
};

export default scroll;