let picsArr;
let galleryDiv;
let isBusiness;
let deletePic;
let showPopup;

let addToCart;
const initialPicsGallery = (
  picsArrFromHomePage,
  isBusinessParameter,
  deletePicFromHomePage,
  showPopupFromHomePage,
  addToCartFunc
) => {
  galleryDiv = document.getElementById("pick-home-gallery-content");
  isBusiness = isBusinessParameter;
  deletePic = deletePicFromHomePage;
  showPopup = showPopupFromHomePage;
  addToCart = addToCartFunc;
  updatePicsGallery(picsArrFromHomePage);
};

const updatePicsGallery = (picsArrFromHomePage) => {
  picsArr = picsArrFromHomePage;
  createGallery();
};

const createGallery = () => {
  let innerStr = "";

  clearEventListeners("home-pic-gallery-delete-btn", handleDeleteBtnClick);

  clearEventListeners("home-pic-gallery-edit-btn", handleEditBtnClick);

  clearEventListeners("home-pic-gallery-picture", handleImageClick);

  clearEventListeners("home-pic-gallery-buy-btn", handleBuyBtnClick);

  for (let pic of picsArr) {
    innerStr += createItem(
      pic.id,
      pic.name,
      pic.imgUrl,
      pic.credit,
      pic.description,
      pic.price
    );
  }
  galleryDiv.innerHTML = innerStr;

  createBtnEventListener("home-pic-gallery-delete-btn", handleDeleteBtnClick);

  createBtnEventListener("home-pic-gallery-edit-btn", handleEditBtnClick);

  createBtnEventListener("home-pic-gallery-picture", handleImageClick);

  createBtnEventListener("home-pic-gallery-buy-btn", handleBuyBtnClick);
};

const createItem = (id, name, img, credit, description, price) => {
  const businessBtns = `
  <button type="button" class="btn btn-warning w-100" id="home-pic-gallery-edit-btn_${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger w-100" id="home-pic-gallery-delete-btn_${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;
  return `
  <div class="col">
    <div class="card h-100">
      <img
        src="${img}"
        class="card-img-top piclistGalleryCarousel"
        alt="${name}"
        id="home-pic-gallery-picture_${id}"
      />
      <div class="card-body">
        <h4 class="card-name">${name}</h4>
        <h5 class="card-name">By ${credit}</h5>
        <p class="card-text">
          ${description}
        </p>
      </div>
      
      <div class="card-body d-flex flex-column-reverse"><ul class="list-group list-group-flush">
      <li class="list-group-item">$ ${price}</li>
    </ul>
        <button type="button" class="btn btn-success" id="home-pic-gallery-buy-btn_${id}"><i class="bi bi-cart-plus"></i>
          Add To Cart
        </button>
        ${isBusiness ? businessBtns : ""}
      </div>
    </div>
  </div>
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("_");
  if (!ev.target.id) {
    idFromId = ev.target.parentElement.id.split("_");
  }
  return idFromId[1];
};

const handleDeleteBtnClick = (ev) => {
  deletePic(getIdFromClick(ev));
};

const handleBuyBtnClick = (ev) => {
  addToCart(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev), true);
};

const handleImageClick = (ev) => {
  showPopup(getIdFromClick(ev), false);
};

const clearEventListeners = (idKeyword, handleFunction) => {
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}_']`);

  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}_']`);

  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPicsGallery, updatePicsGallery };
