import PAGES from "./src/models/pageModel.js";
import handlePageChange from "./src/routes/router.js";
import "./src/initialData/initialData.js";
import "./src/pages/RegisterPage.js";
import "./src/pages/LoginPage.js";
import "./src/pages/ProfilePage.js";
import "./src/pages/HomePage.js";
import "./src/pages/CartPage.js";
import showNewPopup from "./src/pages/HomePage.js";
import makeInputsAsTokenConnected from "./src/pages/ProfilePage.js";

const navHomeLink = document.getElementById("pick-nav-home-link");
const navIconLink = document.getElementById("pick-nav-icon-link");
const page404BackBtn = document.getElementById("pick-page404-to-home-link");
const aboutToHomeCarouselBtn = document.getElementById(
  "pick-about-to-home-carousel-btn"
);
const aboutToHomeGalleryBtn = document.getElementById(
  "pick-about-to-home-gallery-btn"
);
const aboutToHomeListBtn = document.getElementById(
  "pick-about-to-home-list-btn"
);
const navAboutLink = document.getElementById("pick-nav-about-link");
const navLoginLink = document.getElementById("pick-nav-login-link");
const navLogOutLink = document.getElementById("pick-nav-logout-link");
const navRegisterLink = document.getElementById("pick-nav-register-link");
const navProfileLink = document.getElementById("pick-nav-profile-link");
const loginToRegisterLink = document.getElementById(
  "pick-link-to-register-page"
);
const registerToLoginLink = document.getElementById("pick-link-to-login-page");
const loginCancelToHome = document.getElementById("pick-login-cancel-btn");
const registerCancelToHome = document.getElementById(
  "pick-register-cancel-btn"
);
const profileCancelToHome = document.getElementById("pick-profile-cancel-btn");
const NewPicLink = document.getElementById("pick-nav-add-new-picture-link");
const navCartLink = document.getElementById("pick-nav-cart-link");
const cartToLoginLink = document.getElementById(
  "pick-link-to-login-page-from-cart"
);
const cartToHomeLink = document.getElementById(
  "pick-link-to-home-page-from-cart"
);

window.addEventListener("load", () => {
  let token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    document.getElementById("navBeforeLogin").classList.remove("d-none");
    document.getElementById("navAfterLogin").classList.add("d-none");
  } else {
    document.getElementById("nav-profile-name").innerText = token.name;
    document.getElementById("navBeforeLogin").classList.add("d-none");
    document.getElementById("navAfterLogin").classList.remove("d-none");
    if (
      JSON.parse(localStorage.getItem("users")).find(
        (user) => token.id === user.id
      ).cart !== undefined
    ) {
      if (
        JSON.parse(localStorage.getItem("users")).find(
          (user) => token.id === user.id
        ).cart.length !== 0
      ) {
        document
          .getElementById("pick-cart-link-icon")
          .classList.remove("bi-cart");
        document
          .getElementById("pick-cart-link-icon")
          .classList.add("bi-cart-fill");
      } else {
        document.getElementById("pick-cart-link-icon").classList.add("bi-cart");
        document
          .getElementById("pick-cart-link-icon")
          .classList.remove("bi-cart-fill");
      }
    }
    if (token.isBusiness) {
      NewPicLink.classList.remove("d-none");
      NewPicLink.classList.add("d-block");
    } else {
      NewPicLink.classList.add("d-none");
      NewPicLink.classList.remove("d-block");
    }
  }
  handlePageChange(PAGES.HOME);
});

navHomeLink.addEventListener("click", () => {
  handlePageChange(PAGES.PAGE404);
});
navIconLink.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
});
page404BackBtn.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
});
aboutToHomeCarouselBtn.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
  document.getElementById("pick-home-display-carousel-btn").click();
});
aboutToHomeGalleryBtn.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
  document.getElementById("pick-home-display-gallery-btn").click();
});
aboutToHomeListBtn.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
  document.getElementById("pick-home-display-list-btn").click();
});
loginCancelToHome.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
});
profileCancelToHome.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
});
registerCancelToHome.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
});
cartToHomeLink.addEventListener("click", () => {
  handlePageChange(PAGES.HOME);
  document.getElementById("pick-home-display-gallery-btn").click();
});
navAboutLink.addEventListener("click", () => {
  handlePageChange(PAGES.ABOUT);
});
navLoginLink.addEventListener("click", () => {
  handlePageChange(PAGES.LOGIN);
});
loginToRegisterLink.addEventListener("click", () => {
  handlePageChange(PAGES.REGISTER);
});
registerToLoginLink.addEventListener("click", () => {
  handlePageChange(PAGES.LOGIN);
});
navRegisterLink.addEventListener("click", () => {
  handlePageChange(PAGES.REGISTER);
});
navProfileLink.addEventListener("click", () => {
  handlePageChange(PAGES.PROFILE);
  makeInputsAsTokenConnected();
});
navCartLink.addEventListener("click", () => {
  handlePageChange(PAGES.CART);
});
NewPicLink.addEventListener("click", () => {
  showNewPopup();
});
cartToLoginLink.addEventListener("click", () => {
  handlePageChange(PAGES.LOGIN);
});
navLogOutLink.addEventListener("click", () => {
  localStorage.removeItem("token");
  location.reload();
});
