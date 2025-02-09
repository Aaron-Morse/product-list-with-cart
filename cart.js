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
    const displayValue = Object.keys(this.list).length ? "none" : "";

    document.querySelector("div.empty-cart").style.display =
      displayValue;
  }

  //  Builds the HTML for the cart to be displayed on the page
  renderCart() {
    // Updates the amount of items in the cart every render based on the cart contents
    this.cartQuantity();

    // Cart is cleared before being rebuilt
    document.querySelector("div.cart-contents").innerHTML = "";

    // Checks to see if the cart is empty and then will/will not display messaging
    this.toggleEmptyCartMesage();

    // Cart total is cleared before rebuild to take into account an empty cart
    document.querySelector("div.cart-total").innerHTML = "";

    // Guard clause to block the cart from populating if empty
    if (!Object.entries(this.list).length) return;

    // HTML is built to display the cart items
    let HTML = ``;
    for (const item in this.list) {
      HTML += `
        <div class="cart-item" data-name="${item}">
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
          <button class="delete-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
          </button>
        </div> 
      `;
    }

    // Inserts the built out cart contents into the cart
    document
      .querySelector("div.cart-contents")
      .insertAdjacentHTML("beforeend", HTML);

    // Displays the calculated cart total
    this.calculateCartTotal();

    // Adds the listeners to the delete from cart buttons
    this.initializeDeleteFromCartButtons();
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

  initializeDeleteFromCartButtons() {
    document.querySelectorAll("div.cart-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log(event.target.tagName);
        if (event.target.tagName === "BUTTON") {
          this.remove(item.dataset.name);
          this.renderCart();
        }
      });
    });
  }
}
