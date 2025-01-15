import Cart from "./cart.js";
import { fetchProducts } from "./products.js";

// The app starts and fetchs the products and populates the page
await fetchProducts();

const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log(event.target);
  });
});
