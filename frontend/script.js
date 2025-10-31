const apiBase = "http://localhost:5000/api/products";
const productsContainer = document.getElementById("products");
let cart = [];

async function fetchProducts() {
  try {
    const response = await fetch(apiBase);
    const products = await response.json();

    productsContainer.innerHTML = products
      .map(
        (p) => `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <h4>₹${p.price}</h4>
        <button onclick="addToCart('${p._id}', '${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  document.getElementById("cartCount").innerText = cart.length;
  alert(`${name} added to cart!`);
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

fetchProducts();
