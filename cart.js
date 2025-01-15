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
  generateTotal() {
    for (const key in this.list) {
      const { price, quantity } = this.list[key];
      this.total += price * quantity;
    }
  }

  buildCart() {
    let HTML = ``;
    for (const item in this.list) {
      HTML += `
        <div class="cart-item">
          <div class="cart-item-details">
            <p>${this.list[item]}</p>
            <p>
              <span class="cart-item-quantity">${
                this.list[item].quantity
              }x</span
              ><span class="cart-item-price">@ $${this.list[
                item
              ].price.toFixed(2)}</span
              ><span class="cart-item-total">$${this.list[
                item
              ].price.toFixed(2)}</span>
            </p>
          </div>
        </div> 
      `;
    }
    document
      .querySelector("div.cart")
      .insertAdjacentHTML("beforeend", HTML);
  }
}

const cart = new Cart();

cart.add({
  "Classic Tiramisu": {
    price: 5.5,
  },
});

{
  /* 
<div class="cart-item">
  <div class="cart-item-details">
    <p>Classic Tiramisu</p>
    <p>
      <span class="cart-item-quantity">1x</span
      ><span class="cart-item-price">@ $5.50</span
      ><span class="cart-item-total">$5.50</span>
    </p>
  </div>
</div> 
*/
}
