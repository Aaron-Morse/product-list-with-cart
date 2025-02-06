export default class Cart {
  constructor() {
    this.total = 0;
    this.list = {};
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

  // Calcuatles cart total
  cartTotal() {
    for (const key in this.list) {
      const { price, quantity } = this.list[key];
      this.total += price * quantity;
    }
  }

  //  Builds the HTML for the cart to be displayed on the page
  renderCart() {
    // toggleEmptyCartMesage is used to determine if the empty cart message should be displayed
    const toggleEmptyCartMesage = Object.keys(this.list).length
      ? "none"
      : "block";

    document.querySelector("div.empty-cart").style.display =
      toggleEmptyCartMesage;

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
    document
      .querySelector("div.cart-contents")
      .insertAdjacentHTML("beforeend", HTML);
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
