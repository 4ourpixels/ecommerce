// Select elements
const productEl = document.getElementById("products");
const subTotalAmount = document.getElementById("sub-total");
const cartItemsEl = document.getElementById("cart-info");
const quantity = document.getElementById("quantity");
const totalItemsInCart = document.getElementById("total-items-in-cart");
const cartCount = document.getElementById("cart-count");
const itemPrice = document.getElementById("item-price");
// Render products function

function renderProducts() {
  products.forEach((product) => {
    productEl.innerHTML += `
        <div class="column-4">
          <img src="${product.imgThumbnail}">
          <h4 class="text-black fw-bold">${product.title} ${product.type}</h4>
          <h5>$${product.price}</h5>
          <div class="add-to-cart btn w-100 text-white" onclick="addToCart(${product.id})">
              Add To <i class="fa-solid fa-cart-shopping fa-lg"></i>
          </div>
        </div>
        `;
  });
}
renderProducts();
// Cart array to save all my items in the cart

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// Add to cart function
function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
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
  subTotalAmount.innerHTML = `$${totalPrice}`;
  totalItemsInCart.innerHTML = `${totalItems}`;
  cartCount.innerHTML = `<img src="./images/cart.png" width="30px" height="30px">${totalItems}`;
}

// Render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
      <img class="product-thumbnail" src="${item.imgThumbnail}">
      <div>
          <h5 class="fw-bold">${item.title}</h5>
          <h6>Price: $${item.price}</h6>
          <button class="trash-btn text-danger" class="text-danger" onclick="removeItemFromCart(${item.id})"><i class="fa-solid fa-trash-can fa-lg"></i></button>
      </div>
        `;
    cartItemsElement.innerHTML += cartItemHTML;
  });
}

// Remove items from the cart

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

  updadateCart();
}
