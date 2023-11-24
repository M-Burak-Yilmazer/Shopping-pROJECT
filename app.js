export let veri = [];
const buttons = document.querySelector("#btns");
const inputBar = document.querySelector("#searchInput");
const categoryName = document.querySelector("#category");

import { showProduct } from "./productUI.js";

import { loadFromLocalStorage } from "./search.js";
import { searchAndUpdate } from "./search.js";
const showImg = () => {
  document.querySelector("#loading").classList.add("block");
};
const closeImg = () => {
  document.querySelector("#loading").classList.remove("block");
};

const getFetch = () => {
  showImg();
  fetch("https://anthonyfs.pythonanywhere.com/api/products/")
    .then((res) => res.json())
    .then((data) => {
      closeImg();
      veri = data;
      show(veri);
    })
    .catch((err) => console.log(err));
};

window.addEventListener("load", () => {
  getFetch();
  categoryName.innerHTML = "ALL";
  // showSelectedProduct("ALL");
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

  categoryNames.forEach((item, i) => {
    const arr = [
      "btn-primary",
      "btn-secondary",
      "btn-success",
      "btn-info",
      "btn-warning",
      "btn-danger",
    ];
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add(`${arr[i]}`);
    button.textContent = `${item.toUpperCase()}`;
    buttons.appendChild(button);
  });
  document.querySelectorAll("#btns .btn").forEach((item) =>
    item.addEventListener("click", (e) => {
      const text = inputBar.value;
      document.querySelector("#products").innerHTML = "";
      let selectedCategory = e.target.textContent;
      categoryName.innerHTML = selectedCategory;

      // Trigger search even if input value hasn't changed
      searchAndUpdate(selectedCategory, text);
    })
  );
}

inputBar.addEventListener("input", () => {
  document.querySelector("#products").innerHTML = "";
  const inputVal = inputBar.value.toLowerCase();
  let selectedCategory = categoryName.textContent;
  searchAndUpdate(selectedCategory, inputVal);
});
