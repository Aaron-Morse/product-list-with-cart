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

  buildCart() {}
}

const cart = new Cart();

cart.add({
  waffle: {
    price: 6.5,
  },
});

cart.add({
  waffle: {
    price: 6.5,
  },
});

console.log(cart.list);
