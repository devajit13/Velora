const API="http://localhost:5000";

const container=document.getElementById("products");
if(container){
 fetch(`${API}/products`)
 .then(res=>res.json())
 .then(products=>{
  products.forEach(p=>{
   container.innerHTML+=`
   <div class="card">
    <a href="product.html?id=${p.id}">
     <img src="${p.image}" class="product-img">
    </a>
    <div class="card-content">
     <h3>${p.name}</h3>
     <p>₹${p.price}</p>
     <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    </div>
   </div>`;
  });
 });
}

if(window.location.search.includes("id")){
 const id=new URLSearchParams(window.location.search).get("id");
 fetch(`${API}/products`)
 .then(res=>res.json())
 .then(products=>{
  const p=products.find(x=>x.id==id);
  if(p){
   document.getElementById("pImage").src=p.image;
   document.getElementById("pName").innerText=p.name;
   document.getElementById("pPrice").innerText="₹"+p.price;
   document.getElementById("addBtn").onclick=()=>addToCart(p);
  }
 });
}

function addToCart(product){
 const cart=JSON.parse(localStorage.getItem("cart"))||[];
 cart.push(product);
 localStorage.setItem("cart",JSON.stringify(cart));
 alert("Added to cart");
}

const cartContainer=document.getElementById("cartItems");
if(cartContainer){
 const cart=JSON.parse(localStorage.getItem("cart"))||[];
 let total=0;
 cart.forEach(item=>{
  total+=item.price;
  cartContainer.innerHTML+=`<p>${item.name} - ₹${item.price}</p>`;
 });
 document.getElementById("total").innerText="Total: ₹"+total;
}

function login(){
 fetch(`${API}/login`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
   email:document.getElementById("email").value,
   password:document.getElementById("password").value
  })
 })
 .then(res=>res.json())
 .then(data=>{
  document.getElementById("msg").innerText=data.message;
 });
}