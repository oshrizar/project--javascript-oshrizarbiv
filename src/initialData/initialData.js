import Picture from "../models/Picture.js";
import User from "../models/User.js";
import Address from "../models/Address.js";

let picId = 1;
let userId = 1;

const createData = () => {
  let picArr = [
    new Picture(
      picId++,
      "הנקר",
      "https://cdn.pixabay.com/photo/2023/05/29/00/23/great-spotted-woodpecker-8024806_1280.jpg",
      "חובב ציפורים",
      `הנקר היא ציפור שבונה את הקן שלה בתוך העץ  כדי להגן על הגוזלים שלה`,
      30,
      "14/06/22"
    ),
    new Picture(
      picId++,
      "נפלאות התיבה",
      "https://cdn.pixabay.com/photo/2018/09/23/18/30/drop-3698073_1280.jpg",
      "אריק כהן",
      `לא בכל יום יוצא לנו לעצור ולהסתכל על הטבע ולפעמים יש רגעים שהטבע פשוט עוצר לנו את הנשימה מרוב יופיו`,
      80,
      "07/04/22"
    ),
    new Picture(
      picId++,
      "מנעול האהבה",
      "https://cdn.pixabay.com/photo/2014/02/17/13/52/heart-268151_1280.jpg",
      "John Wick",
      ` הרבה אנשים אומרים שהיום קשה למצוא אהבה אבל אני חושב שהם מפחדים להיפגע וסוגרים את האהבה במנעול ולא פותחים`,
      150,
      "03/02/22"
    ),
  ];
  return picArr;
};

const createUsers = () => {
  let userArr = [
    new User(
      userId++,
      "Oshri Zarbiv",
      "oshrizar086@gmail.com",
      "0546464092",
      "No31383138!",
      new Address("Midlle East", "Israel", "Motzkin", "Gosen", 67, 620354),
      true
    ),
    new User(
      userId++,
      "Noga Koren",
      "nogako86@gmail.com",
      "0533507510",
      "Noy51517!",
      new Address("Middle East", "Israel", "Migdal", "Tidhar", 14, 724567),
      false
    ),
  ];
  return userArr;
};

const setInitialData = () => {
  let pictures = localStorage.getItem("pics");
  if (pictures) {
    return;
  }
  localStorage.setItem("pics", JSON.stringify(createData()));
  localStorage.setItem("nextpicid", picId + "");
};

const setInitialUsers = () => {
  let users = localStorage.getItem("users");
  if (users) {
    return;
  }
  localStorage.setItem("users", JSON.stringify(createUsers()));
  localStorage.setItem("nextuserid", userId + "");
  localStorage.removeItem("token");
};

setInitialData();
setInitialUsers();
