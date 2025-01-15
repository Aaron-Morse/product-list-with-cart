import Cart from "./cart.js";
import { fetchProducts } from "./products.js";

// The app starts and fetchs the products and populates the page
await fetchProducts();

const cart = new Cart();
cart.initializeAddToCartButtons();

cart.add({
  "Classic Tiramisu": {
    price: 5.5,
  },
});

cart.add({
  "Classic Tiramisu": {
    price: 5.5,
  },
});

cart.add({
  "Salted Caramel Brownie": {
    price: 4.5,
  },
});

cart.renderCart();
