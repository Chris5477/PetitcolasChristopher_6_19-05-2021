import {ELEMENTHTML, ELEMENTMODAL, ELEMENTFORM } from "./constant.js";



// fonction pour réafficher tout les photographes en cliquant sur le tag all 
export const showAllTags = () => {
  ELEMENTHTML.worker.forEach(item => item.style.display ="initial")
}


// fonction pour afficher les information du photographe

export const dataProfil = (obj, key) => {
  ELEMENTHTML.nameMember.textContent = obj[key].name;
  ELEMENTHTML.pictureProfil.setAttribute("src", "ressources/Photographes/" +obj[key].portrait)
  ELEMENTHTML.localisationMember.textContent = obj[key].country + "," + obj[key].city;
  ELEMENTHTML.sloganMember.textContent = obj[key].tagline;
  ELEMENTHTML.pricePhotographer.textContent = obj[key].price + "€/jour";
  for (let index in ELEMENTHTML.tagsMember) {
    ELEMENTHTML.tagsMember[index].textContent = "#" + obj[key].tags[index];
  }
};

//fonction pour trier les images en fonction de l'id des photographes

export const sortJson = (obj, id) => obj.filter((item) => item.photographerId == id);

// fonction  pour créer un objet contenant toutes les informations d'images

export const utilData = (member, photographerName) => {
  const array = [];
  const noVideo = member.filter((item) => item.image != undefined);
  noVideo.forEach((item) => {
    array.push({
      title: item.title,
      date: item.date,
      likes: item.likes,
      description: item.description,
      image: "ressources/" + photographerName + "/" + item.image,
    });
  });
  return array;
};

// fonction pour n'avoir que les images

export const onlyPicture = (arr) => arr.map((item) => item.image);

// fonction pour afficher les images , donner une description audio et une legende

export const showPicture = (arr) => {
  ELEMENTHTML.legend.forEach((item, key) => (item.innerHTML = arr[key].title));
  ELEMENTHTML.liked.forEach((item, key) => (item.innerHTML = " " + arr[key].likes));
  ELEMENTHTML.dateMedia.forEach((item, key) => item.innerHTML = arr[key].date);
  ELEMENTHTML.allPicturePhotographer.map((item, key) => {
    item.setAttribute("src", arr[key].image);
    item.setAttribute("aria-label", arr[key].description);
  });
};

//fonction pour recuperer un array avec les videos et les afficher

export const showVideo = (photographerName, arr) => {
  const onlyVideo = arr.filter((item) => item.video);
  const movies = [];
  movies.push({
    title: onlyVideo[0].title,
    likes: onlyVideo[0].likes,
    video: onlyVideo[0].video,
    date: onlyVideo[0].date
  });
  ELEMENTHTML.video.setAttribute("src", "ressources/" + photographerName + "/" + onlyVideo[0].video);
  ELEMENTHTML.legendVideo.innerHTML = onlyVideo[0].title;
  ELEMENTHTML.dateVideo.innerHTML = onlyVideo[0].date;
  ELEMENTHTML.likedVideo.innerHTML = onlyVideo[0].likes;
  return movies.map(item => item.video);
};

//fonction permettant de trier les photos par date , popularité et titre

export const sortPicture = (arr) => {
  if (ELEMENTFORM.select.value === "popularite") {
    arr.sort((a, b) => a.likes - b.likes);
    showPicture(arr);
  } else if (ELEMENTFORM.select.value === "date") {
    arr.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    showPicture(arr);
  } else if (ELEMENTFORM.select.value === "titre") {
    arr.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    showPicture(arr);
  }
};

//fonction d'ouverture de modal

export const openModal = () => {
  ELEMENTMODAL.modal.classList.add("openModal");
  hiddenElement();
};

//fonction de fermeture de modal

export const closeModal = () => {
  ELEMENTMODAL.modal.classList.remove("openModal");
  showElement();
};

//fonction pour informer l'utilisateur d'une donnée saisi incorrect

export const informUser = (paragraphe, msg, container) => {
  paragraphe.textContent = msg;
  paragraphe.classList.add("error");
  container.appendChild(paragraphe);
};

// fonction pour cacher les éléments si modal ouverte

export const hiddenElement = () => {
  ELEMENTHTML.mainPageElement.classList.add("hiddenElement");
  ELEMENTHTML.header.className = "hiddenElement";
};
// fonction pour re afficher les éléments si modale fermer

export const showElement = () => {
  ELEMENTHTML.mainPageElement.classList.remove("hiddenElement");
  ELEMENTHTML.header.className = "pages-header";
};


export const pictureInLightbox = (source) => {
  ELEMENTHTML.movie.style.visibility ="hidden";
  ELEMENTHTML.photo.style.visibility ="visible";
  ELEMENTHTML.photo.setAttribute("src", source);
};

export const videoInLightbox = (member, source) => {
  ELEMENTHTML.movie.style.visibility ="visible";
  ELEMENTHTML.photo.style.visibility ="hidden";
  ELEMENTHTML.movie.setAttribute("src", "ressources/" + member + "/" + source);
  ELEMENTHTML.movie.setAttribute("autoplay", true);
};



//fonction qui ferme la light box

export const closeLightbox = () => {
  ELEMENTMODAL.lightBox.classList.remove("show_lightbox");
  showElement();
};
