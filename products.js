export async function fetchProducts() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data loaded:", data);
    buildProducts(data);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Takes fetched products and builds out the HTML to be inserted into the DOM
function buildProducts(data) {
  let HTML = ``;
  for (const item of data) {
    HTML += `
        <section class="product" data-name="${
          item.name
        }" data-price="${item.price}">
          <div class="add-to-cart-container">
            <img src="${item.image.mobile}" alt="${item.name}" />
            <button class="add-to-cart">Add to Cart</button>
            <div class="added-to-cart">
              <button class="decrement-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
              </button>
              <p class="button-quantity">1</p>
              <button class="increment-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
              </button>
            </div>
          </div>
          <h3>${item.category}</h3>
          <h2>${item.name}</h2>
          <p class="price">$${item.price.toFixed(2)}</p>
        </section>
      `;
  }
  document
    .querySelector("main")
    .insertAdjacentHTML("afterbegin", HTML);
}
