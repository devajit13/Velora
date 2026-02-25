// Load products from JSON (GitHub Pages compatible)

fetch("./products.json")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products");
    if (!container) return;

    products.forEach(p => {
      container.innerHTML += `
        <div class="card">
          <img src="${p.image}" class="product-img">
          <div class="card-content">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
          </div>
        </div>
      `;
    });
  })
  .catch(err => console.error("Error loading products:", err));

const cartContainer = document.getElementById("cartItems");

if (cartContainer) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  function renderCart() {
    cartContainer.innerHTML = "";
    total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}">
          <div>
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
            <button onclick="removeItem(${index})">Remove</button>
          </div>
        </div>
      `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
  }

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  };

  renderCart();
}
