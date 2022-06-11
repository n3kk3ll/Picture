import { postData } from "../services/requests";

const dragndrop = () => {
  const inputs = document.querySelectorAll(`[name="upload"]`);

  [`dragenter`, `dragleave`, `dragover`, `drop`].forEach(eventName => {
    inputs.forEach(input => {
      input.addEventListener(eventName, preventedDefaults, false);
    });
  });

  function preventedDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(elem) {
    elem.closest(`.file_upload`).style.border = `5px dashed #3bd723`;
    elem.closest(`.file_upload`).style.backgroundColor = `rgba(0,0,0,0.3)`;
  }

  function unhighlight(elem) {
    elem.closest(`.file_upload`).style.border = `none`;
    elem.closest(`.file_upload`).style.backgroundColor = document.body.classList.contains(`modal-open`) ? `#ededed` : `#ffffff`;
  }

  [`dragenter`, `dragover`].forEach(eventName => {
    inputs.forEach(input => {
      input.addEventListener(eventName, () => highlight(input), false);
    });
  });

  [`dragleave`, `drop`].forEach(eventName => {
    inputs.forEach(input => {
      input.addEventListener(eventName, () => unhighlight(input), false);
    });
  });

  inputs.forEach(input => {
    input.addEventListener(`drop`, e => {
      input.files = e.dataTransfer.files;
      const uploadedFileName = input.files[0].name.split('.'),
            uploadedFileNameDisplayed = uploadedFileName[0].length > 6 ? `${uploadedFileName[0].substring(0, 6)}...${uploadedFileName[1]}` : `${uploadedFileName[0]}.${uploadedFileName[1]}`;
      input.previousElementSibling.textContent = uploadedFileNameDisplayed;

      if(input.closest(`.main`)) {
        input.closest(`.file_upload`).style.backgroundColor = `#f7e7e6`;
        const formData = new FormData();
        formData.append(`file`, input.files[0]);
        postData(`assets/server.php`, formData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => {
          input.value = ``;
        });
      }
    });
  });
};

export default dragndrop; 