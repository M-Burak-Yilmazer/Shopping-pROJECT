export let veri = [];
const buttons = document.querySelector("#btns");
const inputBar = document.querySelector("#searchInput");
const categoryName = document.querySelector("#category");

import { showProduct } from "./productUI.js";
import {showSelectedProduct} from "./search.js"
import {loadFromLocalStorage} from "./search.js"

const getFetch = () => {
  fetch("https://anthonyfs.pythonanywhere.com/api/products/")
    .then((res) => res.json())
    .then((data) => {
      veri = data;
      show(veri);
    })
    .catch((err) => console.log(err));
};

window.addEventListener("load", () => {
  getFetch();
  categoryName.innerHTML = "ALL";
  showSelectedProduct("ALL");
  loadFromLocalStorage(); 
});

let categoryNames = [];
function show(veri) {
  veri.forEach((item) => {
    showProduct(item);
  });
  categoryNames = veri.reduce((sum, int) => {
    if (!sum.includes(int.category)) {
      sum.push(int.category);
    }
    return sum;
  }, []);
  categoryNames.unshift("all");
  
  categoryNames.forEach((item,i) => {
    const arr = ["btn-primary", "btn-secondary", "btn-success", "btn-info", "btn-warning", "btn-danger"]
    const button = document.createElement("button");
    button.classList.add("btn")
    button.classList.add(`${arr[i]}`);
    button.textContent = `${item.toUpperCase()}`;
    buttons.appendChild(button);
  });


  document.querySelectorAll("#btns .btn").forEach((item) =>
    item.addEventListener("click", (e) => {
      document.querySelector("#products").innerHTML = "";
      let selectedCategory = e.target.textContent;
      categoryName.innerHTML = selectedCategory;

      if (selectedCategory == "ALL") {
        veri.forEach((item) => showProduct(item));
      }

      veri
        .filter(
          (veri) =>
            veri.category.toLowerCase() == selectedCategory.toLowerCase()
        )
        .forEach((item) => showProduct(item));

      showSelectedProduct(selectedCategory);
    })
  );
}

