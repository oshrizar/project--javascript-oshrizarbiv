const validate = (regex, value, min, max) => {
  let msgsArr = [];
  if (value.length < min) {
    msgsArr = [...msgsArr, " קצר מידי"];
  }
  if (value.length > max) {
    msgsArr = [...msgsArr, " ארוך מידי"];
  }
  if (!regex.test(value)) {
    msgsArr = [...msgsArr, " לא קיים"];
  }
  return msgsArr;
};
export default validate;
