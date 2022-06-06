import {postData} from "../services/requests";

const forms = () => {
  const allForms = document.querySelectorAll(`form`),
    inputs = document.querySelectorAll(`input`),
    uploadInputs = document.querySelectorAll(`[name=upload]`);

  const message = {
    processing: `Идёт отправка`,
    success: `Отправлено`,
    failure: `Ошибка`,
    loading: `assets/img/spinner.gif`,
    ok: `assets/img/ok.png`,
    wrong: `assets/img/fail.png`
  };

  const pathes = {
    sendFileTo: `assets/server.php`,
    sendQuestionTo: `assets/questions.php`
  };

  const clearInputs = () => {
    inputs.forEach(input => input.value = ``);
    uploadInputs.forEach(upload => {
      upload.previousElementSibling.textContent = `Файл не выбран`;
    });
    if(document.querySelector(`textarea`)) {
      document.querySelector(`textarea`).value = ``;
    }
  };

  allForms.forEach(form => {
    form.addEventListener(`submit`, e => {
      e.preventDefault();

      let statusMessage = document.createElement(`div`);
      statusMessage.classList.add(`text-center`);
      form.parentNode.appendChild(statusMessage);
      form.classList.add(`animated`, `fadeOutUp`);
      setTimeout(() => {
        form.style.display = `none`;
      }, 400);

      let statusImage = document.createElement(`img`);
      statusImage.setAttribute(`src`, message.loading);
      statusImage.classList.add(`animated`, `fadeInUp`);
      statusMessage.appendChild(statusImage);

      let statusText = document.createElement(`div`);
      statusText.textContent = message.processing;
      statusText.classList.add(`animated`, `fadeIn`);
      statusText.style.animationDelay = `1s`;
      statusMessage.appendChild(statusText);

      const formData = new FormData(form);
      let api;

      form.closest(`.popup-design`) || form.getAttribute(`data-calc`) === `true` ? api = pathes.sendFileTo : api = pathes.sendQuestionTo;

      if(form.getAttribute(`data-calc`) === `end`) {
        for(let key in userData) {
          formData.append(key, userData[key]);
        }
      }

      postData(api, formData)
      .then((res) => {
        console.log(res);
        statusImage.setAttribute(`src`, message.ok);
        statusText.textContent = message.success;
      })
      .catch(() => {
        statusImage.setAttribute(`src`, message.wrong);
        statusText.textContent = message.failure;
      })
      .finally(() => {
        clearInputs();
        setTimeout(() => {
          form.style.display = `block`;
          form.classList.remove(`fadeOutUp`);
          form.classList.add(`fadeInDown`);
          statusMessage.remove();
        }, 5000);
      });
    });
  });

  uploadInputs.forEach(upload => {
    upload.addEventListener(`input`, () => {
      const uploadedFileName = upload.files[0].name.split('.'),
            uploadedFileNameDisplayed = uploadedFileName[0].length > 6 ? `${uploadedFileName[0].substring(0, 6)}...${uploadedFileName[1]}` : `${uploadedFileName[0]}.${uploadedFileName[1]}`;
      upload.previousElementSibling.textContent = uploadedFileNameDisplayed;
          });
  });

};

export default forms;