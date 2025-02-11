export default class Cart {
  constructor() {
    this.list = {};
    this.enableCartButtons();
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

  calculateCartQuantity() {
    const quantity = Object.values(this.list).reduce(
      (total, item) => (total += item.quantity),
      0
    );
    document.querySelector("span.cart-quantity").textContent =
      quantity;
  }

  calculateCartTotal() {
    document.querySelector("div.cart-total").innerHTML = "";

    // Guard clause to block cart total from being populated and added if the cart is empty
    if (!Object.entries(this.list).length) return;

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

  // Determine if the empty cart message should be displayed
  emptyCartMessage() {
    const displayValue = Object.keys(this.list).length ? "none" : "";

    document.querySelector("div.empty-cart").style.display =
      displayValue;
  }

  renderCartContents() {
    // Cart is cleared before being rebuilt
    document.querySelector("div.cart-contents").innerHTML = "";

    // Guard close to block cart contents from being created and added if cart is empty
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

    // Adds the event listeners to the delete buttons to remove from cart
    this.enableRemoveFromCart();
  }

  //  Builds the HTML for the cart to be displayed on the page
  renderCart() {
    // Updates the amount of items in the cart every render based on the cart contents
    this.calculateCartQuantity();

    // Checks to see if the cart is empty and then will/will not display messaging
    this.emptyCartMessage();

    // Renders the cart contents and adds to the page
    this.renderCartContents();

    // Displays the calculated cart total
    this.calculateCartTotal();
  }

  // Adds event listener to add to cart buttons
  enableCartButtons() {
    document.querySelectorAll(".product").forEach((product) => {
      product.addEventListener("click", (event) => {
        const name = product.dataset.name;
        const price = product.dataset.price;

        if (event.target.className === "add-to-cart") {
          this.add({
            [name]: {
              price: parseFloat(price),
            },
          });
          event.target.style.display = "none";
          product.querySelector(".added-to-cart").style.display =
            "flex";
          this.renderCart();
        }

        if (event.target.tagName === "BUTTON") {
          if (event.target.className === "decrement-button") {
            this.decrement(name);
            this.renderCart();
          }

          if (event.target.className === "increment-button") {
            this.add({
              [name]: {
                price: parseFloat(price),
              },
            });
            this.renderCart();
          }
        }

        product.querySelector("p.button-quantity").textContent =
          this.list[name].quantity;
      });
    });
  }

  // Adds event listener to the remove from cart button
  enableRemoveFromCart() {
    document.querySelectorAll("div.cart-item").forEach((item) => {
      item.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          this.remove(item.dataset.name);
          this.renderCart();
        }
      });
    });
  }
}
