import validate from "./validate.js";

const validateStreet = (streetInput) => {
  const reg = new RegExp("^[^\\W\\d_]+\\.?(?:[-\\s'’][^\\W\\d_]+\\.?)*$");
  return validate(reg, streetInput, 2, 255).map(
    (error) => `Street name${error}`
  );
};

export default validateStreet;
