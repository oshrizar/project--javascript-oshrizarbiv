let picsArr;
let listDiv;
let isBusiness;
let deletePic;
let showPopup;
let addToCart;

const initialPicsList = (
  picsArrFromHomePage,
  isBusinessParameter,
  deletePicFromHomePage,
  showPopupFromHomePage,
  addToCartFunc
) => {
  listDiv = document.getElementById("pick-home-list-content");
  isBusiness = isBusinessParameter;
  deletePic = deletePicFromHomePage;
  showPopup = showPopupFromHomePage;
  addToCart = addToCartFunc;
  updatePicsList(picsArrFromHomePage);
};

const updatePicsList = (picsArrFromHomePage) => {
  picsArr = picsArrFromHomePage;
  createList();
};

const createList = () => {
  let innerStr = "";

  clearEventListeners("home-pic-list-delete-btn", handleDeleteBtnClick);

  clearEventListeners("home-pic-list-edit-btn", handleEditBtnClick);

  clearEventListeners("home-pic-list-picture", handleImageClick);

  clearEventListeners("home-pic-list-buy-btn", handleBuyBtnClick);
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
  listDiv.innerHTML = innerStr;

  createBtnEventListener("home-pic-list-delete-btn", handleDeleteBtnClick);

  createBtnEventListener("home-pic-list-edit-btn", handleEditBtnClick);

  createBtnEventListener("home-pic-list-picture", handleImageClick);

  createBtnEventListener("home-pic-list-buy-btn", handleBuyBtnClick);
};

const createItem = (id, name, img, credit, description, price) => {
  const businessBtns = `
  <button type="button" class="btn btn-warning w-100" id="home-pic-list-edit-btn_${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger w-100" id="home-pic-list-delete-btn_${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;
  return `
  <li class="list-group-item">
    <div class="row">
        <div class="col-md-2 ">
        <img src="${img}" class="img-fluid rounded piclistGalleryCarousel" alt="${name}" id="home-pic-list-picture_${id}" />
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h4 class="card-title">${name}</h4>
            <h5 class="card-title">By ${credit}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
            $${price}
            </h6>
            <p class="card-text">
            ${description}
            </p>
        </div>
        </div>
        <div class="col-md-2">
        <button type="button" class="btn btn-success w-100" id="home-pic-list-buy-btn_${id}">
          <i class="bi bi-cart-plus"></i> Add To Cart
        </button>
        ${isBusiness ? businessBtns : ""}
        </div>
    </div>
    </li>
    <br>
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

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev), true);
};

const handleImageClick = (ev) => {
  showPopup(getIdFromClick(ev), false);
};

const handleBuyBtnClick = (ev) => {
  addToCart(getIdFromClick(ev));
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

export { initialPicsList, updatePicsList };
