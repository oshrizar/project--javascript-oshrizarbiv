import { initPopup } from "../components/Popup.js";
import Picture from "../models/Picture.js";

let token = JSON.parse(localStorage.getItem("token"));
let usersArr = JSON.parse(localStorage.getItem("users"));
let activeUser;

let cartDivBeforeLogin = document.getElementById("pick-cart-before-login");
let cartContent = document.getElementById("pick-cart-content");
let cartEmpty = document.getElementById("pick-cart-empty");

window.addEventListener("load", () => {
  if (!token) {
    cartDivBeforeLogin.classList.add("d-block");
    cartDivBeforeLogin.classList.remove("d-none");
    return;
  } else {
    cartDivBeforeLogin.classList.remove("d-block");
    cartDivBeforeLogin.classList.add("d-none");
  }
  if (!usersArr) {
    return;
  }

  activeUser = usersArr.find((user) => user.id === token.id);
  if (!activeUser.cart || !activeUser.cart.length) {
    cartEmpty.classList.add("d-block");
    cartEmpty.classList.remove("d-none");
    return;
  } else {
    cartEmpty.classList.remove("d-block");
    cartEmpty.classList.add("d-none");
    createCart();
  }
});

const updateCart = () => {
  usersArr = JSON.parse(localStorage.getItem("users"));
  activeUser = usersArr.find((user) => user.id === token.id);
  if (!activeUser.cart || !activeUser.cart.length) {
    cartEmpty.classList.add("d-block");
    cartEmpty.classList.remove("d-none");
    document.getElementById("pick-cart-link-icon").classList.add("bi-cart");
    document
      .getElementById("pick-cart-link-icon")
      .classList.remove("bi-cart-fill");
    createCart();
    return;
  } else {
    cartEmpty.classList.remove("d-block");
    cartEmpty.classList.add("d-none");
    document.getElementById("pick-cart-link-icon").classList.remove("bi-cart");
    document
      .getElementById("pick-cart-link-icon")
      .classList.add("bi-cart-fill");
  }
  createCart();
};

const createCart = () => {
  let innerStr = "";
  clearEventListeners("cart-pic-remove-btn", handleRemoveBtn);
  clearEventListeners("cart-pic-picture", handleImageClick);
  let picsArrOfLocalStorage = JSON.parse(localStorage.getItem("pics"));
  if (!picsArrOfLocalStorage) {
    return;
  }
  for (let item of activeUser.cart) {
    for (let pic of picsArrOfLocalStorage) {
      if (+item === +pic.id) {
        innerStr += createItemforCart(
          pic.id,
          pic.imgUrl,
          pic.name,
          pic.credit,
          pic.description,
          pic.price
        );
      }
    }
  }
  cartContent.innerHTML = innerStr;
  createBtnEventListener("cart-pic-remove-btn", handleRemoveBtn);
  createBtnEventListener("cart-pic-picture", handleImageClick);
};

const createItemforCart = (id, img, name, credit, description, price) => {
  return `
<div class="col">
  <div class="card h-100">
    <img
      src="${img}"
      class="card-img-top piclistGalleryCarousel"
      alt="${name}"
      id="cart-pic-picture_${id}"
    />
    <div class="card-body">
      <h4 class="card-name">${name}</h4>
      <h5 class="card-name">By ${credit}</h5>
      <p class="card-text">
        ${description}
      </p>
    </div>
    
    <div class="card-body d-flex flex-column-reverse"><ul class="list-group list-group-flush">
    <li class="list-group-item">$ ${price}</li>
  </ul>
      <button type="button" class="btn btn-success" id="cart-pic-buy-btn_${id}"><i class="bi bi-cash-coin"></i>
        Buy Now
      </button>
      <button type="button" class="btn btn-danger" id="cart-pic-remove-btn_${id}"><i class="bi bi-bag-x"></i>
        Remove Item
      </button>
    </div>
  </div>
</div>
`;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("_");
  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("_");
  }
  return idFromId[1];
};
const removePic = (idOfSelectedPic) => {
  idOfSelectedPic = +idOfSelectedPic;
  activeUser.cart = activeUser.cart.filter((item) => item !== idOfSelectedPic);
  for (let user of usersArr) {
    if (activeUser.id === user.id) {
      user = activeUser;
      break;
    }
  }
  localStorage.setItem("users", JSON.stringify(usersArr));
  updateCart();
};

const findPicFromCartById = (idOfSelectedPic) => {
  let picsArrOfLocalStorage = JSON.parse(localStorage.getItem("pics"));
  let selectedPic = new Picture();

  for (let pic of picsArrOfLocalStorage) {
    if (+idOfSelectedPic === pic.id) {
      selectedPic.id = pic.id;
      selectedPic.imgUrl = pic.imgUrl;
      selectedPic.name = pic.name;
      selectedPic.credit = pic.credit;
      selectedPic.description = pic.description;
      selectedPic.price = pic.price;
      selectedPic.dateCreated = pic.dateCreated;

      return selectedPic;
    }
  }
};

const handleImageClick = (ev) => {
  initPopup(findPicFromCartById(getIdFromClick(ev)), null, false);
};

const handleRemoveBtn = (ev) => {
  removePic(getIdFromClick(ev));
};
const clearEventListeners = (idKeyword, handleFunction) => {
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}_']`);

  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}_']`);

  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { removePic };

export default updateCart;
