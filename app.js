// Select elements
const productEl = document.getElementById("products");
const subTotalAmount = document.getElementById("sub-total");
const cartItemsEl = document.getElementById("cart-info");
const quantity = document.getElementById("quantity");
const totalItemsInCart = document.getElementById("total-items-in-cart");
const cartBtn = document.getElementById("cart-btn");
const itemPrice = document.getElementById("item-price");
const cartContainer = document.getElementById("cart-details");
// Render products function

function renderProducts() {
  products.forEach((product) => {
    productEl.innerHTML += `
        <div class="column-4 ">
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
  cartBtn.innerHTML = `<img src="./images/cart.png" width="30px" height="30px">${totalItems}`;
}

// Render cart items
function renderCartItems() {
  let totalPrice = 0;
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    totalPrice = item.price * item.numberOfUnits;
    cartItemsEl.innerHTML += `
      <tr>
          <th scope="row"><img style="height: 70px; width:auto; object-fit: cover" src="${item.imgThumbnail}"></th>
          <td>
            ${item.title} ${item.type}<br/>
            <div class="trash-btn" onclick="removeItemFromCart(${item.id})">
              <i class="fa-solid fa-trash"></i>
            </div>
          </td>
          <td>
            <div class="row text-center">
              <button class="cart-quantity-btn" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>
              <h5>${item.numberOfUnits}</h5>
              <button class="cart-quantity-btn" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
            </div>
          </td>
          <td>$${totalPrice}</td>
      </tr>
        `;
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

  updateCart();
}

// Function to toggle the cart-details element
function toggleCartDetails() {
  var cartDetails = document.getElementById("cart-details");
  if (cartDetails.classList.contains("hidden")) {
    cartDetails.classList.remove("hidden");
  } else {
    cartDetails.classList.add("hidden");
  }
}
cartBtn.addEventListener("click", toggleCartDetails);
