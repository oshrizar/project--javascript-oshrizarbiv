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

const inputFirstName = document.getElementById("pick-profile-first-name-input");
const inputLastName = document.getElementById("pick-profile-last-name-input");
const inputState = document.getElementById("pick-profile-state-input");
const inputCountry = document.getElementById("pick-profile-country-input");
const inputCity = document.getElementById("pick-profile-city-input");
const inputStreet = document.getElementById("pick-profile-street-input");
const inputHouse = document.getElementById("pick-profile-house-input");
const inputZip = document.getElementById("pick-profile-zip-input");
const inputEmail = document.getElementById("pick-profile-email-input");
const inputPhone = document.getElementById("pick-profile-phone-input");
const inputPassword = document.getElementById("pick-profile-password-input");
const inputReEnterPassword = document.getElementById(
  "pick-profile-password-reenter-input"
);
const inputIsBusiness = document.getElementById("pick-profile-isBiz-input");
const profileBtn = document.getElementById("pick-profile-submit-btn");
const profilePasswordBtn = document.getElementById("pick-profile-password-btn");

let firstNameOk = true;
let lastNameOk = true;
let emailOk = true;
let passwordOk = true;

let stateOk = true;
let countryOk = true;
let cityOk = true;
let streetOk = true;
let zipOk = true;
let houseOk = true;
let phoneOk = true;

let token = JSON.parse(localStorage.getItem("token"));
let users = JSON.parse(localStorage.getItem("users"));

window.addEventListener("load", () => {
  if (!token) {
    return;
  }

  makeInputsAsTokenConnected();
});

const makeInputsAsTokenConnected = () => {
  let activeUser = users.find((user) => user.id === token.id);
  inputFirstName.value = activeUser.name.split(" ")[0];
  inputLastName.value = activeUser.name.split(" ")[1];
  inputState.value = activeUser.address.state;
  inputCountry.value = activeUser.address.country;
  inputCity.value = activeUser.address.city;
  inputStreet.value = activeUser.address.street;
  inputHouse.value = activeUser.address.houseNumber;
  inputZip.value = activeUser.address.zip;
  inputEmail.value = activeUser.email;
  inputPhone.value = activeUser.phone;
  inputPassword.value = activeUser.password;
  inputReEnterPassword.value = activeUser.password;
  inputIsBusiness.checked = activeUser.isBusiness;
  inputPassword.disabled = true;
  inputReEnterPassword.disabled = true;
  inputEmail.disabled = true;
};

profilePasswordBtn.addEventListener("click", () => {
  inputPassword.removeAttribute("disabled");
  inputReEnterPassword.removeAttribute("disabled");
  inputEmail.removeAttribute("disabled");
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
  inputIsBusiness.addEventListener("change", () => {
    isBusiness = inputIsBusiness.checked;
  });

  const checkFirstNameInput = () => {
    let errorArr = validateName(inputFirstName.value);
    if (errorArr.length === 0) {
      inputFirstName.classList.remove("is-invalid");
      document
        .getElementById("pick-profile-first-name-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-first-name-rules")
        .classList.add("d-none");
      firstNameOk = true;
    } else {
      inputFirstName.classList.add("is-invalid");
      document
        .getElementById("pick-profile-first-name-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-first-name-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-first-name-error").innerHTML =
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
        .getElementById("pick-profile-last-name-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-last-name-rules")
        .classList.add("d-none");
      lastNameOk = true;
    } else {
      inputLastName.classList.add("is-invalid");
      document
        .getElementById("pick-profile-last-name-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-last-name-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-last-name-error").innerHTML =
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
        .getElementById("pick-profile-email-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-email-rules")
        .classList.add("d-none");
      emailOk = true;
    } else {
      inputEmail.classList.add("is-invalid");
      document
        .getElementById("pick-profile-email-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-email-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-email-error").innerHTML =
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
        .getElementById("pick-profile-password-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-password-rules")
        .classList.add("d-none");
      passwordOk = true;
    } else {
      inputPassword.classList.add("is-invalid");
      document
        .getElementById("pick-profile-password-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-password-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-password-error").innerHTML =
        errorArr.join("<br>");
      passwordOk = false;
    }

    if (inputReEnterPassword.value === inputPassword.value) {
      passwordOk = true;
      inputReEnterPassword.classList.remove("is-invalid");
      document
        .getElementById("pick-profile-password-reenter-error")
        .classList.add("d-none");
    } else {
      passwordOk = false;
      inputReEnterPassword.classList.add("is-invalid");
      document
        .getElementById("pick-profile-password-reenter-error")
        .classList.remove("d-none");
      document.getElementById(
        "pick-profile-password-reenter-error"
      ).innerText = `סיסמה לא תואמת`;
    }
    checkIfCanEnableBtn();
  };

  const checkReEnterPasswordInput = () => {
    if (inputReEnterPassword.value === inputPassword.value) {
      inputReEnterPassword.classList.remove("is-invalid");
      document
        .getElementById("pick-profile-password-reenter-error")
        .classList.add("d-none");
      passwordOk = true;
    } else {
      inputReEnterPassword.classList.add("is-invalid");
      document
        .getElementById("pick-profile-password-reenter-error")
        .classList.remove("d-none");
      document.getElementById(
        "pick-profile-password-reenter-error"
      ).innerText = `סיסמה לא תואמת`;
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
        .getElementById("pick-profile-phone-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-phone-rules")
        .classList.add("d-none");
      phoneOk = true;
    } else {
      inputPhone.classList.add("is-invalid");
      document
        .getElementById("pick-profile-phone-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-phone-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-phone-error").innerHTML =
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
        .getElementById("pick-profile-state-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-state-rules")
        .classList.add("d-none");
      stateOk = true;
    } else {
      inputState.classList.add("is-invalid");
      document
        .getElementById("pick-profile-state-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-state-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-state-error").innerHTML =
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
        .getElementById("pick-profile-country-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-country-rules")
        .classList.add("d-none");
      countryOk = true;
    } else {
      inputCountry.classList.add("is-invalid");
      document
        .getElementById("pick-profile-country-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-country-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-country-error").innerHTML =
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
        .getElementById("pick-profile-city-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-city-rules")
        .classList.add("d-none");
      cityOk = true;
    } else {
      inputCity.classList.add("is-invalid");
      document
        .getElementById("pick-profile-city-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-city-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-city-error").innerHTML =
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
        .getElementById("pick-profile-street-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-street-rules")
        .classList.add("d-none");
      streetOk = true;
    } else {
      inputStreet.classList.add("is-invalid");
      document
        .getElementById("pick-profile-street-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-street-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-street-error").innerHTML =
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
        .getElementById("pick-profile-house-error")
        .classList.add("d-none");
      document
        .getElementById("pick-profile-house-rules")
        .classList.add("d-none");
      houseOk = true;
    } else {
      inputHouse.classList.add("is-invalid");
      document
        .getElementById("pick-profile-house-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-house-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-house-error").innerHTML =
        errorArr.join("<br>");
      houseOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkZipInput = () => {
    let errorArr = validateZip(inputZip.value);
    if (errorArr.length === 0 || inputZip.value == "") {
      inputZip.classList.remove("is-invalid");
      document.getElementById("pick-profile-zip-error").classList.add("d-none");
      document.getElementById("pick-profile-zip-rules").classList.add("d-none");
      zipOk = true;
    } else {
      inputZip.classList.add("is-invalid");
      document
        .getElementById("pick-profile-zip-error")
        .classList.remove("d-none");
      document
        .getElementById("pick-profile-zip-rules")
        .classList.remove("d-none");
      document.getElementById("pick-profile-zip-error").innerHTML =
        errorArr.join("<br>");
      zipOk = false;
    }
    checkIfCanEnableBtn();
  };

  const checkIfCanEnableBtn = () => {
    profileBtn.disabled = !(
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

profileBtn.addEventListener("click", () => {
  if (!localStorage.getItem("users")) {
    alert(
      "An Issue Accured: someone deleted the users data from the local storage 😁"
    );
    return;
  }
  const response = confirm("Are you sure you want to change details?");
  if (!response) {
    makeInputsAsTokenConnected();
    return;
  }
  let userOfEmail = users.find((item) => item.email === inputEmail.value);
  let user = users.find((item) => item.id === token.id);
  if (userOfEmail && user.id !== userOfEmail.id) {
    alert("האיימיל כבר קיים");
    inputEmail.value = token.email;
    return;
  }
  let activeUserCart;
  users = JSON.parse(localStorage.getItem("users"));
  for (let user of users) {
    if (user.id === token.id) {
      activeUserCart = user.cart;
      break;
    }
  }

  for (let user of users) {
    if (user.id === token.id) {
      user.name = inputFirstName.value + " " + inputLastName.value;
      user.address.state = inputState.value;
      user.address.country = inputCountry.value;
      user.address.city = inputCity.value;
      user.address.street = inputStreet.value;
      user.address.houseNumber = inputHouse.value;
      user.address.zip = inputZip.value;
      user.email = inputEmail.value;
      user.phone = inputPhone.value;
      user.password = inputPassword.value;
      user.isBusiness = inputIsBusiness.checked;
      user.cart = activeUserCart;
      console.log("cart: " + user.cart);
      localStorage.setItem(
        "token",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          isBusiness: user.isBusiness,
        })
      );
      break;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
});

export default makeInputsAsTokenConnected;
