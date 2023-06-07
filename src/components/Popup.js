import Picture from "../models/Picture.js";
import getNextId from "../services/getNextId.js";
import validateImage from "../validation/validateImage.js";

let selectedPic, editOrAddPicFunction;
const popupImage = document.getElementById("pick-popup-image");
const popupName = document.getElementById("pick-popup-name");
const popupDescription = document.getElementById("pick-popup-description");
const popupPrice = document.getElementById("pick-popup-price");
const popupImageUrl = document.getElementById("pick-popup-image-url");
const popupCredit = document.getElementById("pick-popup-credit");
const popupWrapper = document.getElementById("pick-home-popup-wrapper");
const popupDate = document.getElementById("pick-home-popup-date");
const saveBtn = document.getElementById("pick-popup-save-btn");
const initPopup = (
  selectedPicFromHomePage,
  editPicFunctionFromHomePage,
  isForEditOrAdding
) => {
  if (selectedPicFromHomePage) {
    selectedPic = selectedPicFromHomePage;
  } else {
    selectedPic = new Picture(getNextId(), "", "", "", "", 0);
  }
  editOrAddPicFunction = editPicFunctionFromHomePage;
  popupImage.src = selectedPic.imgUrl;
  popupImage.style.width = "100%";
  popupName.value = selectedPic.name;
  popupDescription.value = selectedPic.description;
  popupDescription.style.height = "fit-content";
  popupCredit.value = selectedPic.credit;
  popupPrice.value = selectedPic.price;
  popupImageUrl.value = selectedPic.imgUrl;
  popupDate.innerText = `Created At: ${selectedPic.dateCreated}`;
  if (!isForEditOrAdding) {
    enableDisableInputs(true);
    saveBtn.classList.add("d-none");
    document.getElementById("pick-popup-cancel-btn").classList.add("d-none");
    document
      .getElementById("pick-popup-img-url-labelAndInput")
      .classList.add("d-none");
  } else {
    enableDisableInputs(false);
    saveBtn.classList.remove("d-none");
    document.getElementById("pick-popup-cancel-btn").classList.remove("d-none");
    document
      .getElementById("pick-popup-img-url-labelAndInput")
      .classList.remove("d-none");
  }
  showPopup();

  document.getElementById("pick-home-actual-popup").scrollTop = 0;

  document.body.style.overflow = "hidden";
};

const enableDisableInputs = (ability) => {
  popupImage.disabled = ability;
  popupName.disabled = ability;
  popupDescription.disabled = ability;
  popupCredit.disabled = ability;
  popupPrice.disabled = ability;
  popupImageUrl.disabled = ability;
};

const showPopup = () => {
  popupWrapper.classList.remove("d-none");
};

const hidePopup = () => {
  popupWrapper.classList.add("d-none");
};

const enableScrollingOfBody = () => {
  document.body.style.overflowY = "scroll";
};

window.addEventListener("load", () => {
  popupWrapper.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "pick-home-popup-wrapper" &&
      ev.target.id !== "pick-popup-cancel-btn" &&
      ev.target.id !== "pick-popup-cancel-btn-icon"
    ) {
      return;
    }
    hidePopup();

    enableScrollingOfBody();
  });

  saveBtn.addEventListener("click", () => {
    if (validateImage(popupImageUrl.value).length) {
      return;
    }
    const date = new Date();

    selectedPic.name = popupName.value;
    selectedPic.credit = popupCredit.value;
    popupCredit.value === ""
      ? (selectedPic.credit = "Unknown")
      : (selectedPic.credit = popupCredit.value);
    selectedPic.description = popupDescription.value;
    selectedPic.price = popupPrice.value;
    selectedPic.imgUrl = popupImageUrl.value;
    if (!selectedPic.dateCreated) {
      selectedPic.dateCreated = `${
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      }/${
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1
      }/${date.getFullYear()}`;
    }
    editOrAddPicFunction(selectedPic);
    enableScrollingOfBody();
    hidePopup();
  });

  popupImageUrl.addEventListener("input", () => {
    popupImage.src = popupImageUrl.value;
    if (validateImage(popupImageUrl.value).length) {
      saveBtn.disabled = true;
      popupImageUrl.classList.add("is-invalid");
    } else {
      saveBtn.disabled = false;
      popupImageUrl.classList.remove("is-invalid");
    }
  });
});

export { initPopup, showPopup, hidePopup };
