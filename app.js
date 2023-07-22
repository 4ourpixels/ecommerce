const productsElement = document.getElementById("products");
const cartItemsElement = document.getElementById("cart-info");
const cartDetailsElement = document.getElementById("cart-details");
const subTotal = document.getElementById("sub-total");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
  products.forEach((product) => {
    productsElement.innerHTML += `
    <div class="col-4 mb-4 p-4">
      <img class="bg-light rounded" style="object-fit: cover" src="${product.imgThumbnail}">
      <hr/>
      <div class="d-flex justify-content-between row">
        <h4>${product.type}</h4>
        <div class="add-to-cart" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-shopping fa-lg"></i>
        </div>
      </div>
      <h4>$${product.price}</h4>
      <small>Available in ${product.color}</small>
    </div>
    `;
  });
}

renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id) {
  // check if product already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });

    updateCart();
  }
}

// udpate cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  cartCount.innerHTML = `<img src="./images/cart.png" width="30px" height="30px">${totalItems}</a>`;
}

// render cart items
function renderCartItems() {
  cartItemsElement.innerHTML = "";
  cart.forEach((item) => {
    cartItemsElement.innerHTML += `
      <div class="cart-info border mb-3 p-3">
          <img height="75" width="auto" src="${item.imgThumbnail}" alt="${item.title}">
          <div class="text-start">
              <h4>${item.title}</h4>
              <h6>Price: $${item.price}</h6>
              <small onclick="removeItemFromCart(${item.id})"><i class="fa-solid fa-trash fa-lg"></i></small>
              <br>
              <div class="d-flex justify-content-center">
              <button class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
              <h4 id="quantity">${item.numberOfUnits}</h4>
              <button class="btn plus" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
              </div>
          </div>
      </div>
    `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}
