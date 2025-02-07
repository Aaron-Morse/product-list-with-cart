export default class Cart {
  constructor() {
    this.list = {};
    this.initializeAddToCartButtons();
  }

  // add/increment item in cart
  add(item) {
    const key = Object.keys(item);
    if (!this.list[key]) {
      this.list[key] = item[key];
      this.list[key].price = item[key].price;
      this.list[key].quantity = 0;
    }
    this.list[key].quantity++;
  }

  // decrement item in cart
  decrement(key) {
    if (this.list[key].quantity > 1) {
      this.list[key].quantity--;
    }
  }

  // Removes item from cart
  remove(key) {
    delete this.list[key];
  }

  // Calculate number of items in cart
  cartQuantity() {
    const quantity = Object.values(this.list).reduce(
      (total, item) => (total += item.quantity),
      0
    );
    document.querySelector("span.cart-quantity").textContent =
      quantity;
  }

  calculateCartTotal() {
    const total = Object.values(this.list).reduce(
      (total, item) => (total += item.price * item.quantity),
      0
    );

    let HTML = `
      <div class="order-total-container">
        <span class="order-total-message">Order Total</span><span class="order-total-amount">$${total.toFixed(
          2
        )}</span> 
      </div>
      <div class="eco-message">
      <p>This is a <span>carbon-neutral</span> delivery</p>
      </div>
      <button class="confirm-order">Confirm Order</button>
    `;

    document.querySelector("div.cart-total").innerHTML = HTML;
  }

  // toggleEmptyCartMesage is used to determine if the empty cart message should be displayed
  toggleEmptyCartMesage() {
    const toggleDisplayProperty = Object.keys(this.list).length
      ? "none"
      : "block";

    document.querySelector("div.empty-cart").style.display =
      toggleDisplayProperty;
  }

  //  Builds the HTML for the cart to be displayed on the page
  renderCart() {
    this.toggleEmptyCartMesage();

    // cart is cleared before being rebuilt
    document.querySelector("div.cart-contents").innerHTML = "";

    // HTML is built to display the cart items
    let HTML = ``;
    for (const item in this.list) {
      HTML += `
        <div class="cart-item">
          <div class="cart-item-details">
            <p>${item}</p>
            <p>
              <span class="cart-item-quantity">${
                this.list[item].quantity
              }x</span
              ><span class="cart-item-price">@ $${this.list[
                item
              ].price.toFixed(2)}</span
              ><span class="cart-item-total">$${(
                this.list[item].price * this.list[item].quantity
              ).toFixed(2)}</span>
            </p>
          </div>
        </div> 
      `;
    }

    // Updates the amount of items in the cart every render based on the cart contents
    this.cartQuantity();

    document
      .querySelector("div.cart-contents")
      .insertAdjacentHTML("beforeend", HTML);

    // Displays the calculated cart total
    this.calculateCartTotal();
  }

  // Adds evemt listener to add to cart buttons
  initializeAddToCartButtons() {
    document.querySelectorAll(".product").forEach((product) => {
      product.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          const name = product.dataset.name;
          const price = product.dataset.price;
          this.add({
            [name]: {
              price: parseFloat(price),
            },
          });
          // renderCart method is called to update the cart
          this.renderCart();
        }
      });
    });
  }
}
