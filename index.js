class Cart {
  constructor() {
    this.total = 0;
    this.list = {};
  }

  add(item, count = 1) {
    const key = Object.keys(item);
    if (!this.list[key]) {
      this.list[key] = item[key];
    }
    this.list[key].quantity += count;
  }

  // Increasing quantity in cart
  increment(key) {
    this.list[key].quantity++;
  }

  // Decreasing quantity in cart
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
}

const cart = new Cart();

cart.add(
  {
    hat: {
      price: 30,
      quantity: 0,
    },
  },
  2
);

cart.add({
  hat: {
    price: 30,
    quantity: 0,
  },
});

cart.add({
  shirt: {
    price: 25,
    quantity: 0,
  },
});

console.log(cart.list);
console.log(cart.generateTotal());
console.log(cart.total);
