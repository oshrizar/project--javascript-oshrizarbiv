import validate from "./validate.js";

const validatePhone = (phoneInput) => {
  const reg = new RegExp("^(\\+)?\\d{9,20}$");
  return validate(reg, phoneInput, 9, 20).map(
    (error) => `Phone number${error}`
  );
};

export default validatePhone;
