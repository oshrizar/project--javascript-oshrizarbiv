import PAGES from "../models/pageModel.js";
import handlePageChange from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateState from "../validation/validateState.js";
import validateCountry from "../validation/validateCountry.js";
import validateCity from "../validation/validateCity.js";
import validateStreet from "../validation/validateStreet.js";
import validateHouse from "../validation/validateHouse.js";
import validateZip from "../validation/validateZip.js";
import validatePhone from "../validation/validatePhone.js";
import User from "../models/User.js";
import Address from "../models/Address.js";

const inputFirstName = document.getElementById(
  "pick-register-first-name-input"
);
const inputLastName = document.getElementById("pick-register-last-name-input");
const inputState = document.getElementById("pick-register-state-input");
const inputCountry = document.getElementById("pick-register-country-input");
const inputCity = document.getElementById("pick-register-city-input");
const inputStreet = document.getElementById("pick-register-street-input");
const inputHouse = document.getElementById("pick-register-house-input");
const inputZip = document.getElementById("pick-register-zip-input");
const inputEmail = document.getElementById("pick-register-email-input");
const inputPhone = document.getElementById("pick-register-phone-input");
const inputPassword = document.getElementById("pick-register-password-input");
const inputReEnterPassword = document.getElementById(
  "pick-register-password-reenter-input"
);
const inputIsBusiness = document.getElementById("pick-register-isBiz-input");
const registerBtn = document.getElementById("pick-register-submit-btn");

let firstNameOk = false;
let lastNameOk = false;
let emailOk = false;
let passwordOk = false;

let stateOk = true;
let countryOk = true;
let cityOk = true;
let streetOk = true;
let zipOk = true;
let houseOk = true;
let phoneOk = true;
let isBusiness = false;

window.addEventListener("load", () => {
  clearInputs();
});
{
  inputFirstName.addEventListener("input", () => {
    checkFirstNameInput();
  });
  inputLastName.addEventListener("input", () => {
    checkLastNameInput();
  });
  inputState.addEventListener("input", () => {
    checkStateInput();
  });
  inputCountry.addEventListener("input", () => {
    checkCountryInput();
  });
  inputCity.addEventListener("input", () => {
    checkCityInput();
  });
  inputStreet.addEventListener("input", () => {
    checkStreetInput();
  });
  inputHouse.addEventListener("input", () => {
    checkHouseInput();
  });
  inputZip.addEventListener("input", () => {
    checkZipInput();
  });
  inputEmail.addEventListener("input", () => {
    checkEmailInput();
  });
  inputPhone.addEventListener("input", () => {
    checkPhoneInput();
  });
  inputPassword.addEventListener("input", () => {
    checkPasswordInput();
  });
  inputReEnterPassword.addEventListener("input", () => {
    checkReEnterPasswordInput();
  });

  const checkFirstNameInput = () => {
    let errorArr = validateName(inputFirstName.value);
    if (errorArr.length === 0) {
      inputFirstName.classList.remove("is-invalid");
      document
        .getElementById("pick-register-first-name-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-first-name-rules")
        .classList.add("d-none");
      firstNameOk = true;
    } else {
      inputFirstName.classList.add("is-invalid");
      document
        .getElementById("pick-register-first-name-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-first-name-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-first-name-error").innerHTML =
        errorArr.join("<br>");
      firstNameOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkLastNameInput = () => {
    let errorArr = validateName(inputLastName.value);
    if (errorArr.length === 0) {
      inputLastName.classList.remove("is-invalid");
      document
        .getElementById("pick-register-last-name-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-last-name-rules")
        .classList.add("d-none");
      lastNameOk = true;
    } else {
      inputLastName.classList.add("is-invalid");
      document
        .getElementById("pick-register-last-name-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-last-name-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-last-name-error").innerHTML =
        errorArr.join("<br>");
      lastNameOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkEmailInput = () => {
    let errorArr = validateEmail(inputEmail.value);
    if (errorArr.length === 0) {
      inputEmail.classList.remove("is-invalid");
      document
        .getElementById("pick-register-email-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-email-rules")
        .classList.add("d-none");
      emailOk = true;
    } else {
      inputEmail.classList.add("is-invalid");
      document
        .getElementById("pick-register-email-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-email-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-email-error").innerHTML =
        errorArr.join("<br>");
      emailOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkPasswordInput = () => {
    let errorArr = validatePassword(inputPassword.value);
    if (errorArr.length === 0) {
      inputPassword.classList.remove("is-invalid");
      document
        .getElementById("pick-register-password-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-password-rules")
        .classList.add("d-none");
      passwordOk = true;
    } else {
      inputPassword.classList.add("is-invalid");
      document
        .getElementById("pick-register-password-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-password-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-password-error").innerHTML =
        errorArr.join("<br>");
      passwordOk = false;
    }

    if (inputReEnterPassword.value === inputPassword.value) {
      passwordOk = true;
      inputReEnterPassword.classList.remove("is-invalid");
      document
        .getElementById("pick-register-password-reenter-error")
        .classList.add("d-none");
    } else {
      passwordOk = false;
      inputReEnterPassword.classList.add("is-invalid");
      document
        .getElementById("pick-register-password-reenter-error")
        .classList.remove("d-none");
      document.getElementById(
        "pick-register-password-reenter-error"
      ).innerText = `הסיסמה לא תואמת`;
    }
    checkIfCanEnableBtn();
  };

  const checkReEnterPasswordInput = () => {
    if (inputReEnterPassword.value === inputPassword.value) {
      inputReEnterPassword.classList.remove("is-invalid");
      document
        .getElementById("pick-register-password-reenter-error")
        .classList.add("d-none");
      passwordOk = true;
    } else {
      inputReEnterPassword.classList.add("is-invalid");
      document
        .getElementById("pick-register-password-reenter-error")
        .classList.remove("d-none");
      document.getElementById(
        "pick-register-password-reenter-error"
      ).innerText = `הסיסמה לא תואמת`;
      passwordOk = false;
    }

    if (inputReEnterPassword.value === inputPassword.value) {
    } else {
    }
    checkIfCanEnableBtn();
  };

  const checkPhoneInput = () => {
    let errorArr = validatePhone(inputPhone.value);
    if (errorArr.length === 0 || inputPhone.value == "") {
      inputPhone.classList.remove("is-invalid");
      document
        .getElementById("pick-register-phone-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-phone-rules")
        .classList.add("d-none");
      phoneOk = true;
    } else {
      inputPhone.classList.add("is-invalid");
      document
        .getElementById("pick-register-phone-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-phone-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-phone-error").innerHTML =
        errorArr.join("<br>");
      phoneOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkStateInput = () => {
    let errorArr = validateState(inputState.value);
    if (errorArr.length === 0 || inputState.value == "") {
      inputState.classList.remove("is-invalid");
      document
        .getElementById("pick-register-state-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-state-rules")
        .classList.add("d-none");
      stateOk = true;
    } else {
      inputState.classList.add("is-invalid");
      document
        .getElementById("pick-register-state-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-state-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-state-error").innerHTML =
        errorArr.join("<br>");
      stateOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkCountryInput = () => {
    let errorArr = validateCountry(inputCountry.value);
    if (errorArr.length === 0 || inputCountry.value == "") {
      inputCountry.classList.remove("is-invalid");
      document
        .getElementById("pick-register-country-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-country-rules")
        .classList.add("d-none");
      countryOk = true;
    } else {
      inputCountry.classList.add("is-invalid");
      document
        .getElementById("pick-register-country-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-country-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-country-error").innerHTML =
        errorArr.join("<br>");
      countryOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkCityInput = () => {
    let errorArr = validateCity(inputCity.value);
    if (errorArr.length === 0 || inputCity.value == "") {
      inputCity.classList.remove("is-invalid");
      document
        .getElementById("pick-register-city-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-city-rules")
        .classList.add("d-none");
      cityOk = true;
    } else {
      inputCity.classList.add("is-invalid");
      document
        .getElementById("pick-register-city-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-city-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-city-error").innerHTML =
        errorArr.join("<br>");
      cityOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkStreetInput = () => {
    let errorArr = validateStreet(inputStreet.value);
    if (errorArr.length === 0 || inputStreet.value == "") {
      inputStreet.classList.remove("is-invalid");
      document
        .getElementById("pick-register-street-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-street-rules")
        .classList.add("d-none");
      streetOk = true;
    } else {
      inputStreet.classList.add("is-invalid");
      document
        .getElementById("pick-register-street-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-street-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-street-error").innerHTML =
        errorArr.join("<br>");
      streetOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkHouseInput = () => {
    let errorArr = validateHouse(inputHouse.value);
    if (errorArr.length === 0 || inputHouse.value == "") {
      inputHouse.classList.remove("is-invalid");
      document
        .getElementById("pick-register-house-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-house-rules")
        .classList.add("d-none");
      houseOk = true;
    } else {
      inputHouse.classList.add("is-invalid");
      document
        .getElementById("pick-register-house-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-house-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-house-error").innerHTML =
        errorArr.join("<br>");
      houseOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkZipInput = () => {
    let errorArr = validateZip(inputZip.value);
    if (errorArr.length === 0 || inputZip.value == "") {
      inputZip.classList.remove("is-invalid");
      document
        .getElementById("pick-register-zip-error")
        .classList.add("d-none");
      document
        .getElementById("pick-register-zip-rules")
        .classList.add("d-none");
      zipOk = true;
    } else {
      inputZip.classList.add("is-invalid");
      document
        .getElementById("pick-register-zip-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-register-zip-rules")
        .classList.remove("d-none");
      document.getElementById("pick-register-zip-error").innerHTML =
        errorArr.join("<br>");
      zipOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkIfCanEnableBtn = () => {
    registerBtn.disabled = !(
      firstNameOk &&
      lastNameOk &&
      emailOk &&
      passwordOk &&
      stateOk &&
      countryOk &&
      cityOk &&
      streetOk &&
      zipOk &&
      houseOk &&
      phoneOk
    );
  };
}

const clearInputs = () => {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputState.value = "";
  inputCountry.value = "";
  inputCity.value = "";
  inputStreet.value = "";
  inputHouse.value = "";
  inputZip.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
  inputPassword.value = "";
  inputReEnterPassword.value = "";
  inputIsBusiness.checked = false;
};

registerBtn.addEventListener("click", () => {
  if (
    !(
      firstNameOk &&
      lastNameOk &&
      emailOk &&
      passwordOk &&
      stateOk &&
      countryOk &&
      cityOk &&
      streetOk &&
      zipOk &&
      houseOk &&
      phoneOk
    )
  ) {
    return;
  }
  let userId = JSON.parse(localStorage.getItem("nextuserid"));
  if (!userId) {
    alert(
      "An issue accured: someone deleted the `nextuserid` from the local storage 😁"
    );
    return;
  }

  if (!userId) {
    userId++;
  }
  let users = localStorage.getItem("users");
  if (!users) {
    users = [
      new User(
        userId++,
        inputFirstName.value + "" + inputLastName.value,
        inputEmail.value,
        inputPhone.value,
        inputPassword.value,

        new Address(
          inputState.value,
          inputCountry.value,
          inputCity.value,
          inputStreet.value,
          inputHouse.value,
          inputZip.value
        ),
        inputIsBusiness.checked
      ),
    ];
  } else {
    users = JSON.parse(users);

    for (let user of users) {
      if (user.email === inputEmail.value) {
        alert("האימייל כבר קיים");
        return;
      }
    }

    users = [
      ...users,
      new User(
        userId++,
        inputFirstName.value + " " + inputLastName.value,
        inputEmail.value,
        inputPhone.value,
        inputPassword.value,

        new Address(
          inputState.value,
          inputCountry.value,
          inputCity.value,
          inputStreet.value,
          inputHouse.value,
          inputZip.value
        ),
        inputIsBusiness.checked
      ),
    ];
  }
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("nextuserid", userId + "");
  clearInputs();
  handlePageChange(PAGES.LOGIN);
});
