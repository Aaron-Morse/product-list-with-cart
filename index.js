import Cart from "./cart.js";
import { fetchProducts } from "./products.js";

// The app starts and awaits the fetchProducts function in order for the page to be ready so the cart/event listeners work
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
