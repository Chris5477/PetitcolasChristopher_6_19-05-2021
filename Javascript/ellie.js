import { ELEMENTHTML, ELEMENTBTN, ELEMENTFORM, ELEMENTMODAL } from "./constant.js";
import { dataProfil, sortJson, showMedia,  createElements, openModal,closeModal,newContainer, sortMedia, hiddenElement, closeLightbox, pictureInLightbox, videoInLightbox} from "./function.js";
import { validData } from "./validForm.js";
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    const objPhotographer = data.photographers;
    const objMedia = data.media;

    dataProfil(objPhotographer, 1);
    const ellie = sortJson(objMedia, 930);
    ELEMENTHTML.totalMedia.innerHTML = `La galerie de ce photographe content ${ellie.length} photos/videos`;
    createElements(ellie);
    showMedia(ellie, "Ellie_Rose");
    newContainer(ellie, "Ellie_Rose");
    ELEMENTBTN.btnContact.addEventListener("click", openModal);
    ELEMENTBTN.btnCloseModal.addEventListener("click", closeModal);
    ELEMENTFORM.formContact.addEventListener("submit", validData);

    ELEMENTFORM.select.addEventListener("input", () => sortMedia(ellie, "Ellie_Rose"));
    const icon = [...document.querySelectorAll(".fa-heart")];
    const liked = [...document.querySelectorAll(".count_like")];
    icon.forEach((el, key) => el.addEventListener("click", () => (liked[key].innerHTML = ellie[key].likes++)));

    const urlMedia = ellie.map((item) => (item.image != undefined ? "ressources/Ellie_Rose/" + item.image : "ressources/Ellie_Rose/" + item.video));
    let keyPicture = null;
    const allMedia = [...document.querySelectorAll(".media")];

    allMedia.forEach((el, key) => {
      el.addEventListener("click", () => {
        ELEMENTMODAL.lightBox.classList.add("show_lightbox");
        hiddenElement();
        const srcMedia = el.getAttribute("src");
        srcMedia.match("jpg") ? ELEMENTHTML.photo.setAttribute("src", srcMedia) : ELEMENTHTML.movie.setAttribute("src", srcMedia);
        keyPicture = key;
        return keyPicture;
      });
    });

    allMedia.forEach((el) =>
      el.addEventListener("keydown", (event) => {
        const trigger = event.key;
        if (trigger === "Enter") {
          ELEMENTMODAL.lightBox.classList.add("show_lightbox");
          hiddenElement();
          const srcMedia = el.getAttribute("src");
          srcMedia.match("jpg") ? ELEMENTHTML.photo.setAttribute("src", srcMedia) : ELEMENTHTML.movie.setAttribute("src", srcMedia);
        }
      })
    );

    const previousPicture = () => {
      ELEMENTBTN.btnNext.removeAttribute("disabled");
      keyPicture--;
      keyPicture === 0 ? ELEMENTBTN.btnPrevious.setAttribute("disabled", "true") : "";
      const sourceMedia = urlMedia[keyPicture];
      return sourceMedia.match("jpg") ? pictureInLightbox(sourceMedia) : videoInLightbox(sourceMedia);
    };

    const nextPicture = () => {
      ELEMENTBTN.btnPrevious.removeAttribute("disabled");
      keyPicture++;
      keyPicture == urlMedia.length ? keyPicture-- && ELEMENTBTN.btnNext.setAttribute("disabled", "true") : "";
      const sourceMedia = urlMedia[keyPicture];
      return sourceMedia.match("jpg") ? pictureInLightbox(sourceMedia) : videoInLightbox(sourceMedia);
    };

    const keyboardLightbox = () => {
      const trigger = event.key;
      const sourceMedia = urlMedia[keyPicture];
      if (trigger === "ArrowLeft") {
        ELEMENTBTN.btnNext.removeAttribute("disabled");
        keyPicture--;
        if (keyPicture < 0) {
          keyPicture++;
          ELEMENTBTN.btnPrevious.setAttribute("disabled", "true");
        }
        return sourceMedia.match("jpg") ? pictureInLightbox(sourceMedia) : videoInLightbox(sourceMedia);
      }
      if (trigger === "ArrowRight") {
        ELEMENTBTN.btnPrevious.removeAttribute("disabled");
        keyPicture++;
        if (keyPicture == urlMedia.length) {
          keyPicture--;
          ELEMENTBTN.btnNext.setAttribute("disabled", "true");
        }
        return sourceMedia.match("jpg") ? pictureInLightbox(sourceMedia) : videoInLightbox(sourceMedia);
      }

      if (trigger === "Escape") {
        closeLightbox();
      }
    };

    ELEMENTBTN.btnPrevious.addEventListener("click", () => previousPicture());
    ELEMENTBTN.btnNext.addEventListener("click", () => nextPicture());
    document.addEventListener("keydown", (event) => keyboardLightbox());
    ELEMENTBTN.btnCloseLightbox.addEventListener("click", closeLightbox);
  });
