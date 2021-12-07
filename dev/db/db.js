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

const users = [
  {
    name: "Olof Ulfsson",
    login: generateUniqueId(3)
  },
  {
    name: "Meja Alfredsson",
    login: generateUniqueId(3)
  },
  {
    name: "Tessan Alexandersson",
    login: generateUniqueId(3)
  }
];

const cart = [
  {
    userLogin: getUsersLogins()[0],
    productId: getProductsIds()[0],
    amount: 2
  }
];

// reset all arrays
function resetDatabase() {
  products.splice(3);
  users.splice(3);
  cart.splice(1);
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

function getProductIndex(product) {
  return products.findIndex((currentProduct) => currentProduct.id === product.id);
}

function updateProduct(productId, newProduct) {
  const product = getProduct(productId);

  if (product) {
    const productIndex = getProductIndex(product);
    products.splice(productIndex, 1, newProduct);
    return true;
  }

  return false;
}

function deleteProduct(productId) {
  const product = getProduct(productId);

  if (product) {
    const productIndex = getProductIndex(product);
    products.splice(productIndex, 1);
    return true;
  }
  return false;
}

// Users
function getUsers() {
  return users;
}

function getUser(login) {
  return users.find((user) => user.login === login);
}

function getUsersLogins() {
  const logins = [];
  for (const user of users) {
    logins.push(user.login);
  }
  return logins;
}

function addUser(user) {
  users.push(user);
}

function getUserIndex(login) {
  return users.findIndex((currentUser) => currentUser.login === login);
}

function deleteUser(login) {
  const user = getUser(login);
  if (user) {
    const userIndex = getUserIndex;
    users.splice(userIndex, 1);
    return true;
  }
  return false;
}

// Cart
function getCart() {
  return cart;
}

function getOrder(id, userLogin) {
  return cart.find((order) => order.productId === id && order.userLogin === userLogin);
}

function getOrderIndex(id) {
  return cart.findIndex((order) => order.productId === id);
}

function addOrder(order) {
  cart.push(order);
}

function updateOrder(orderId, userLogin, newOrder) {
  const order = getOrder(orderId, userLogin);

  if (order) {
    const orderIndex = getOrderIndex(order);
    cart.splice(orderIndex, 1, newOrder);
    return true;
  }

  return false;
}

function deleteOrder(orderId, userLogin) {
  const order = getOrder(orderId, userLogin);

  if (order) {
    const orderIndex = getOrderIndex(order);
    cart.splice(orderIndex, 1);
    return true;
  }

  return false;
}

module.exports = {
  resetDatabase,
  getProduct,
  getProducts,
  getProductsIds,
  addProduct,
  updateProduct,
  deleteProduct,
  getUsers,
  getUser,
  getUsersLogins,
  addUser,
  deleteUser,
  getCart,
  addOrder,
  updateOrder,
  deleteOrder
};
