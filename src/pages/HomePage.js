import checkIfBusiness from "../services/checkifBusiness.js";
import { initialPicsList, updatePicsList } from "../components/PicsList.js";
import {
  initialPicsGallery,
  updatePicsGallery,
} from "../components/PicsGallery.js";
import {
  initialPicsCarousel,
  updatePicsCarousel,
} from "../components/PicsCarousel.js";
import { initPopup } from "../components/Popup.js";
import updateCart from "./CartPage.js";
import { removePic } from "./CartPage.js";

const displayGalleryBtn = document.getElementById(
  "pick-home-display-gallery-btn"
);
const displayListBtn = document.getElementById("pick-home-display-list-btn");
const displayCarouselBtn = document.getElementById(
  "pick-home-display-carousel-btn"
);
const galleryDisplay = document.getElementById("pick-home-display-gallery");
const listDisplay = document.getElementById("pick-home-display-list");
const carouselDisplay = document.getElementById("pick-home-display-carousel");

let picsArr, originalPicsArr;
let isBusiness;

window.addEventListener("load", () => {
  picsArr = localStorage.getItem("pics");
  if (!picsArr) {
    return;
  }
  picsArr = JSON.parse(picsArr);
  originalPicsArr = [...picsArr];
  isBusiness = checkIfBusiness();

  initialPicsList(picsArr, isBusiness, deletePic, showPopup, addToCart);
  initialPicsGallery(picsArr, isBusiness, deletePic, showPopup, addToCart);
  initialPicsCarousel(picsArr, showPopup);
  document.getElementById("pick-home-search").classList.add("d-none");
});

displayGalleryBtn.addEventListener("click", () => {
  galleryDisplay.classList.remove("d-none");
  listDisplay.classList.add("d-none");
  carouselDisplay.classList.add("d-none");
  document.getElementById("pick-home-search").classList.remove("d-none");
});
displayListBtn.addEventListener("click", () => {
  galleryDisplay.classList.add("d-none");
  listDisplay.classList.remove("d-none");
  carouselDisplay.classList.add("d-none");
  document.getElementById("pick-home-search").classList.remove("d-none");
});
displayCarouselBtn.addEventListener("click", () => {
  galleryDisplay.classList.add("d-none");
  listDisplay.classList.add("d-none");
  carouselDisplay.classList.remove("d-none");
  document.getElementById("pick-home-search").classList.add("d-none");
});
document
  .getElementById("pick-home-display-sort-upwards")
  .addEventListener("click", () => {
    sortPics(true);
  });
document
  .getElementById("pick-home-display-sort-downwards")
  .addEventListener("click", () => {
    sortPics(false);
  });
document.getElementById("pick-home-search").addEventListener("input", (ev) => {
  let regex = new RegExp("^" + ev.target.value, "i");
  picsArr = originalPicsArr.filter((item) => {
    let reg = regex.test(item.name);
    return reg;
  });
  updateDisplays();
});

const deletePic = (id) => {
  id = +id;
  originalPicsArr = originalPicsArr.filter((item) => item.id !== id);
  saveToLocalStorage(originalPicsArr);
  picsArr = picsArr.filter((item) => item.id !== id);
  updateDisplays();
  removePic(id);
};

const updateDisplays = () => {
  updatePicsGallery(picsArr);
  updatePicsList(picsArr);
  updatePicsCarousel(picsArr);
};

const sortPics = (up = true) => {
  if (up) {
    picsArr.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    picsArr.sort((a, b) => b.name.localeCompare(a.name));
  }
  updateDisplays();
};

const showPopup = (id, isForEdit) => {
  let selectedPic = picsArr.find((item) => item.id === +id);
  if (!selectedPic) {
    return;
  }
  initPopup(selectedPic, editPic, isForEdit);
};

const showNewPopup = () => {
  initPopup(undefined, addNewPic, true);
};

const editPic = () => {
  saveToLocalStorage(originalPicsArr);
  updateDisplays();
};

const addToCart = (idOfSelectedPic) => {
  let token = localStorage.getItem("token");
  if (!token) {
    alert("אתה צריך להתחבר לחץ על'aהתחבר' aנמצא בסרגל ניווט למעלה  ");
    return;
  }
  token = JSON.parse(token);

  let usersArr = JSON.parse(localStorage.getItem("users"));
  let activeUser = usersArr.find((item) => item.id === token.id);
  if (!activeUser.cart) {
    activeUser.cart = [+idOfSelectedPic];
  } else {
    for (let item of activeUser.cart) {
      if (+idOfSelectedPic === item) {
        alert("המוצר כבר בעגלה");
        return;
      }
    }
    activeUser.cart = [...activeUser.cart, +idOfSelectedPic];
  }
  for (let user of usersArr) {
    if (activeUser.id === user.id) {
      user.cart = activeUser.cart;
      break;
    }
  }
  localStorage.setItem("users", JSON.stringify(usersArr));
  updateCart();
};

const saveToLocalStorage = (arrToSave) => {
  localStorage.setItem("pics", JSON.stringify(arrToSave));
};

const addNewPic = (newPic) => {
  originalPicsArr = [...originalPicsArr, newPic];
  let nextId = +newPic.id + 1;
  localStorage.setItem("nextid", nextId + "");
  picsArr = [...originalPicsArr];
  editPic();
};

export default showNewPopup;
