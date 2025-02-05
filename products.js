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
        <section data-name="${item.name}" data-price="${item.price}">
          <div class="add-to-cart-container">
            <img src="${item.image.mobile}" alt="${item.name}" />
            <button class="add-to-cart">Add to Cart</button>
          </div>
          <h3>${item.category}</h3>
          <h2>${item.name}</h2>
          <p class="price" data-value="${
            item.price
          }">$${item.price.toFixed(2)}</p>
        </section>
      `;
  }
  document
    .querySelector("main")
    .insertAdjacentHTML("afterbegin", HTML);
}
