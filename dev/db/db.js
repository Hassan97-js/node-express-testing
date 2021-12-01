// Imports
const { generateUniqueId } = require("../utilities/generic/generators");

const products = [
  {
    id: generateUniqueId(10),
    name: "Shark Gaming Max Bite Kickstarter Speldator",
    price: 4799
  },
  {
    id: generateUniqueId(10),
    name: "Komplett i80 Epic Gaming PC",
    price: 10999
  },
  {
    id: generateUniqueId(10),
    name: "Razer Tomahawk Midi Tower Black",
    price: 2509
  }
];
const users = [];
const carts = [];

// reset all arrays
function resetDatabase() {
  products.splice(3);
  users.splice(0);
  carts.splice(0);
}

// Products
function getProducts() {
  return products;
}

function getProduct(id) {
  return products.find((product) => product.id === id);
}

function getProductsIds() {
  const ids = [];
  for (const product of products) {
    ids.push(product.id);
  }
  return ids;
}

function addProduct(product) {
  products.push(product);
}

function addProducts(...newProducts) {
  for (const newProduct of newProducts) {
    products.push(newProduct);
  }
}

function getProductIndex(product) {
  return products.findIndex((currentProduct) => currentProduct.id === product.id);
}

function updateProduct(productId, newProduct) {
  const product = getProduct(productId);
  const productIndex = getProductIndex(product);

  if (productIndex !== -1) {
    products.splice(productIndex, 1, newProduct);
  }

  return productIndex;
}

function deleteProduct(product) {
  const productIndex = getProductIndex(product);
  products.splice(productIndex, 1);

  return products;
}

// Users
function getUsers() {
  return users;
}

// Carts
function getCarts() {
  return carts;
}

module.exports = {
  resetDatabase,
  getProduct,
  getProducts,
  getProductsIds,
  addProduct,
  addProducts,
  updateProduct,
  deleteProduct
};
