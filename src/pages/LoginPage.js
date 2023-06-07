import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import handlePageChange from "../routes/router.js";
import PAGES from "../models/pageModel.js";

const inputEmail = document.getElementById("pick-login-email-input");
const inputPassword = document.getElementById("pick-login-password-input");
const loginBtn = document.getElementById("pick-login-submit-btn");
let emailOk;
let passwordOk;

loginBtn.addEventListener("click", () => {
  emailOk = false;
  passwordOk = false;

  if (validateEmail(inputEmail.value).length) {
    return;
  }
  if (validatePassword(inputPassword.value).length) {
    return;
  }
  let users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    return;
  }

  for (let item of users) {
    if (item.email === inputEmail.value) {
      emailOk = true;
      if (item.password === inputPassword.value) {
        passwordOk = true;
        break;
      }
    }
  }

  if (!emailOk) {
    alert(` לא נמצא"${inputEmail.value}" האיימיל`);
    return;
  }

  if (!passwordOk) {
    alert(`סיסמה שגויה`);
    return;
  }

  let user = users.find(
    (item) =>
      item.email === inputEmail.value && item.password === inputPassword.value
  );

  localStorage.setItem(
    "token",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      isBusiness: user.isBusiness,
    })
  );
  location.reload();
});

inputEmail.addEventListener("input", () => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    inputEmail.classList.remove("is-invalid");
    document.getElementById("pick-login-email-error").classList.add("d-none");
  } else {
    inputEmail.classList.add("is-invalid");
    document
      .getElementById("pick-login-email-error")
      .classList.remove("d-none");
    document.getElementById("pick-login-email-error").innerHTML =
      errorArr.join("<br>");
  }
});

inputPassword.addEventListener("input", () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    inputPassword.classList.remove("is-invalid");
    document
      .getElementById("pick-login-password-error")
      .classList.add("d-none");
  } else {
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("pick-login-password-error")
      .classList.remove("d-none");
    document.getElementById("pick-login-password-error").innerHTML =
      errorArr.join("<br>");
  }
});
