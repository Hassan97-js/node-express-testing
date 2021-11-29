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
  products = [{}];
  users = [];
  carts = [];
}

// Products
function getProducts() {
  return products;
}

function getProduct(id) {
  return products.find((product) => product.id === id);
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
  return products.findIndex((currentProduct) => currentProduct === product.id);
}

function updateProduct(product) {
  const productIndex = getProductIndex(product);
  const productToUpdate = products[productIndex];
  productToUpdate = product;
  products.splice(productIndex, 1);

  return products;
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
  addProduct,
  addProducts,
  updateProduct,
  deleteProduct
};
