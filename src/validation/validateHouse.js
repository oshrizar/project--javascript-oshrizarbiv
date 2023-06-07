import validate from "./validate.js";

const validateHouse = (houseNumInput) => {
  const reg = new RegExp("^[0-9a-zA-Z/]+$");
  return validate(reg, houseNumInput, 1, 6).map(
    (error) => `House number${error}`
  );
};

export default validateHouse;
