// LOAD PRODUCTS FROM LOCAL JSON (for GitHub Pages)

fetch("products.json")
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