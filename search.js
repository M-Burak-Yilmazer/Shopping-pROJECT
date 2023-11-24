const inputBar = document.querySelector("#searchInput");
import { veri } from "./app.js";
import { showProduct } from "./productUI.js";

export function showSelectedProduct(selectedCategory) {
  inputBar.addEventListener("input", () => {
    document.querySelector("#products").innerHTML = "";
    const inputVal = inputBar.value;
    if (selectedCategory == "ALL") {
      veri
        .filter((item) =>
          item.title.toLowerCase().includes(inputVal.toLowerCase())
        )
        .forEach((item) => showProduct(item));
    }
    veri
      .filter(
        (veri) => veri.category.toLowerCase() == selectedCategory.toLowerCase()
      )
      .filter((item) =>
        item.title.toLowerCase().includes(inputVal.toLowerCase())
      )
      .forEach((item) => showProduct(item));
  });
}

let boxArray = [];

document.querySelector("#products").addEventListener("click", (e) => {
  if (e.target.textContent == "Sepete Ekle") {
    const targetCard = e.target.closest(".card");
    const targetTitle = targetCard.querySelector(".card-title").textContent;

    // Check if the item is already in boxArray based on title
    const existingItemIndex = boxArray.findIndex(
      (item) => item[0].title === targetTitle
    );

    if (existingItemIndex !== -1) {
      // If the item is already in boxArray, increment its quantity
      boxArray[existingItemIndex][0].quantity++;
    } else {
      // If not, push it to boxArray
      boxArray.push(veri.filter((item) => item.title == targetTitle));
    }
  }
  updateCartDisplay();
  saveToLocalStorage();
});

document.querySelector(".offcanvas-body").addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-plus")) {
    const itemTitle = e.target
      .closest(".card-body")
      .querySelector(".card-title").textContent;
    const itemIndex = boxArray.findIndex((item) => item[0].title == itemTitle);
    if (itemIndex != -1) {
      boxArray[itemIndex][0].quantity++;
    }
  } else if (e.target.classList.contains("fa-minus")) {
    const itemTitle = e.target
      .closest(".card-body")
      .querySelector(".card-title").textContent;
    const itemIndex = boxArray.findIndex((item) => item[0].title == itemTitle);
    if (itemIndex != -1 && boxArray[itemIndex][0].quantity > 1) {
      boxArray[itemIndex][0].quantity--;
    }
  } else if (e.target.classList.contains("btn-danger")) {
    const itemTitle = e.target
      .closest(".card-body")
      .querySelector(".card-title").textContent;
    const itemIndex = boxArray.findIndex((item) => item[0].title == itemTitle);
    if (itemIndex != -1) {
      boxArray.splice(itemIndex, 1);
    }
  }
  updateCartDisplay();
  saveToLocalStorage();
});

function updateCartDisplay() {
  document.querySelector("#sepet").innerHTML = boxArray.length;
  document.querySelector(".offcanvas-body").innerHTML = "";

  boxArray.forEach((item) => {
    document.querySelector(".offcanvas-body").innerHTML += `
    <div class="card mb-3" style="max-width: 540px">
          <div class="row g-0">
            <div class="col-md-4 my-auto">
              <img
                src="${item[0].image}"
                class="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${item[0].title}</h5>
                <div class="d-flex align-items-center gap-2" role="button">
                  <i
                    class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"
                  ></i
                  ><span class="fw-bold">${item[0].quantity}</span
                  ><i
                    class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"
                  ></i>
                </div>
                <p class="card-text">Total : ${item[0].price} x ${item[0].quantity} </p>
                <button class="btn btn-danger">Remove</button>
              </div>
            </div>
          </div>
        </div>
       
   
    `;
  });
  document.querySelector("#sumtop").innerHTML = `${getsum()} $`;
}

function getsum() {
  const total = boxArray.reduce((sum, obj) => {
    const itemPrice = Number(obj[0].price);
    const İtemQuantity = Number(obj[0].quantity);
    const totalPrice = itemPrice * İtemQuantity;

    return sum + totalPrice;
  }, 0);
  return total.toFixed(2);
}

function saveToLocalStorage() {
  localStorage.setItem("cartItem", JSON.stringify(boxArray));
}

export function loadFromLocalStorage() {
  const storedItems = localStorage.getItem("cartItem");

  if (storedItems) {
    boxArray = JSON.parse(storedItems);
    updateCartDisplay();
  }
}
loadFromLocalStorage();

document.querySelector("#products").addEventListener("click", (e) => {
  if (e.target.textContent == "See Details") {
    console.log(e.target);
    const targetCard = e.target.closest(".card");
    console.log(targetCard);
    const targetTitle = targetCard.querySelector(".card-title").textContent;
    const filtered = veri.filter(
      (item) => item.title.toLowerCase() == targetTitle.toLowerCase()
    );
    filtered.forEach((item) => {
      document.querySelector("#exampleModalLabel").innerHTML = `${item.title}`;

      document.querySelector(".modal-body").innerHTML = `
      <div class="text-center">
      <img class="p-2" height=250px" src="${item.image}" alt="" />
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p>Fiyat : ${item.price} $</p>
      </div>
      `;
    });
  }
});
