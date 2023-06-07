let picsArr;
let carouselDiv;
let showPopup;

const initialPicsCarousel = (picsArrFromHomePage, showPopupFromHomePage) => {
  picsArr = picsArrFromHomePage;
  carouselDiv = document.getElementById("pick-home-inside-carousel");
  showPopup = showPopupFromHomePage;

  createCarousel();
};

let nextBtn = document.getElementById("pick-home-carousel-next-btn");
setInterval(() => {
  nextBtn.click();
}, 6000);
let pervBtn = document.getElementById("pick-home-carousel-perv-btn");
() => {
  pervBtn.click();
};

const updatePicsCarousel = (picsArrFromHomePage) => {
  picsArr = picsArrFromHomePage;
  createCarousel();
};

const createItem = (id, name, img, description, credit, active = false) => {
  return `
  <div class="carousel-item ${active ? "active" : ""}">
  <img for="carousel-items" src=${img} alt=${name} id="home-pic-carousel-picture_${id}" class="piclistGalleryCarousel">
  <div class="carousel-caption d-none d-md-block text-light">
    <h5>${name}</h5>
    <h6>By ${credit}</h6>
    <p>${description}</p>
  </div>
</div>
    `;
};
const createCarousel = () => {
  clearEventListeners("home-pic-carousel-picture", handleImageClick);
  let innerStr = "";
  let active = true;
  for (let pic of picsArr) {
    innerStr += createItem(
      pic.id,
      pic.name,
      pic.imgUrl,
      pic.description,
      pic.credit,
      active
    );
    active = false;
  }
  carouselDiv.innerHTML = innerStr;

  createBtnEventListener("home-pic-carousel-picture", handleImageClick);
};

const handleImageClick = (ev) => {
  showPopup(getIdFromClick(ev), false);
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("_");
  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("_");
  }
  return idFromId[1];
};

const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}_']`);

  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

const clearEventListeners = (idKeyword, handleFunction) => {
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}_']`);

  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

export { initialPicsCarousel, updatePicsCarousel };
