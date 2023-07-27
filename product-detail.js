// product-detail.js
document.addEventListener("DOMContentLoaded", function () {
  // Function to get the query parameter value by name
  function getQueryParam(name) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(name);
  }

  // Get the product ID from the query parameter
  const productId = getQueryParam("productId");

  // Find the product with the given ID from the products array in products.js
  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  // Render the product details on the page
  const productDetailsContainer = document.getElementById(
    "product-details-container"
  );

  const productTitle = document.getElementById("product-title");
  const productPrice = document.getElementById("product-price");
  const productDetails = document.getElementById("product-details");
  const productType = document.getElementById("product-type");
  const pageTitle = document.getElementById("page-title");
  const productImg = document.getElementById("ProductImg");

  if (product) {
    productTitle.innerHTML = `${product.title}`;
    productPrice.innerHTML = `$${product.price}`;
    productDetails.innerHTML = `${product.description}`;
    productType.innerHTML = `${product.color} ${product.type}`;
    pageTitle.innerHTML = `Arap Trap - ${product.title}`;
    productImg.src = product.imgMedium;
  } else {
    productDetailsContainer.innerHTML = "<p>Product not found.</p>";
  }
});
