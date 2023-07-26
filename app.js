// Select elements
const productEl = document.getElementById("products");
const subTotalAmount = document.getElementById("sub-total");
const cartItemsEl = document.getElementById("cart-info");
const quantity = document.getElementById("quantity");
const totalItemsInCart = document.getElementById("total-items-in-cart");
const cartBtn = document.getElementById("cart-btn");
const itemPrice = document.getElementById("item-price");
const cartContainer = document.getElementById("cart-details");
const lipaNaMpesaBtn = document.getElementById("lipa-na-mpesa-btn");

// Render products function

function renderProducts() {
  products.forEach((product) => {
    productEl.innerHTML += `
        <div class="col mb-5">
          <div class="h-100">
            <a class="underline" href="./product-detail.html?productId=${product.id}">
              <img
                class="card-img-top"
                src="${product.imgThumbnail}"
              >
            </a>
            <hr />
            <h4 class="text-black text-start fw-bold">
              <a class="underline text-black" href="./product-detail.html?productId=${product.id}">
                ${product.color} ${product.type}
              </a>
            </h4>
            <h6 class="text-start text-black fw-bold">${product.title} Edition</h6>
            <h5 class="my-2 text-start">$${product.price}</h5>
            <button class="add-to-cart w-100 text-white" onclick="addToCart(${product.id})">
                Add To <i class="fa-solid fa-cart-shopping fa-lg"></i>
            </button>
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

    // Update the button text to "Added in the Bag" after adding to cart
    const addButton = document.querySelector(`[onclick="addToCart(${id})"]`);
    addButton.innerText = `In the Bag`;
    addButton.disabled = true; // Disable the button after adding to cart
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
  // Check if the cart is empty and display "No items in cart" if it is
  const cartMessage = document.getElementById("cart-message");
  const paypalButtonContainer = document.getElementById(
    "paypal-button-container"
  );
  if (cart.length === 0) {
    cartMessage.innerHTML = "No items in the bag!";
    paypalButtonContainer.classList.add("hidden");
    lipaNaMpesaBtn.classList.add("hidden");
  } else {
    paypalButtonContainer.classList.remove("hidden");
    lipaNaMpesaBtn.classList.remove("hidden");
    cartMessage.innerHTML = "";
  }
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
            ${item.color} ${item.type}<br/>
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

function sortProducts() {
  const sortingOptions = document.getElementById("sortingOptions");
  const selectedOption = sortingOptions.value;

  switch (selectedOption) {
    case "popular":
      products.sort((a, b) => b.instock - a.instock); // Sort by popularity (descending order of instock)
      break;
    case "latest":
      products.sort((a, b) => b.id - a.id); // Sort by the latest (descending order of id)
      break;
    case "default":
    default:
      // If "Default Sorting" or invalid option selected, reset the array to its original order
      products.sort((a, b) => a.id - b.id);
      break;
  }

  // After sorting, update the rendered products in the HTML
  productEl.innerHTML = ""; // Clear existing product elements
  renderProducts();
}
