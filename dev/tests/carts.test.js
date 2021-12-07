const app = require("../../app");
const request = require("supertest")(app);

// Imports
const { getProducts, getCart, getUser, getUsersLogins, resetDatabase, getProductsIds } = require("../db/db");

beforeEach(() => resetDatabase());
afterEach(() => resetDatabase());

// Global constants
const carts = getCart();
const products = getProducts();

describe("Carts Routes Endpoints Tests", () => {
  it("GET/ Get Cart", async () => {
    try {
      const userLogin = getUsersLogins()[0];
      const response = await request.get(`/api/carts/${userLogin}`).expect("Content-Type", /json/).expect(200);

      expect(carts.length).toBe(1);
      expect(response.body).toStrictEqual({ cart: carts });
    } catch (error) {
      console.error(error);
    }
  });

  it("POST/ Create Order", async () => {
    try {
      const userLogin = getUsersLogins()[0];
      const order = {
        productId: getProductsIds()[1],
        userLogin: getUsersLogins()[2],
        amount: 6
      };

      await request.post(`/api/carts/${userLogin}`).send(order).expect("Content-Type", /json/).expect(201);
      const response = await request.get(`/api/carts/${userLogin}`).expect("Content-Type", /json/).expect(200);

      expect(carts.length).toBe(2);
      expect(response.body.cart).toStrictEqual(carts);
    } catch (error) {
      console.error(error);
    }
  });

  it("PUT/ Update Cart", async () => {
    try {
      const userLogin = getUsersLogins()[0];
      const orderId = products[0].id;
      const order = {
        productId: getProductsIds()[1],
        userLogin: getUsersLogins()[2],
        amount: 6
      };

      await request.put(`/api/carts/${userLogin}/${orderId}`).send(order).expect("Content-Type", /json/).expect(200);
      const response = await request.get(`/api/carts/${userLogin}`).expect("Content-Type", /json/).expect(200);

      expect(carts.length).toBe(1);
      expect(response.body.cart).toStrictEqual(carts);
    } catch (error) {
      console.error(error);
    }
  });

  it("DELETE/ Delete Cart", async () => {
    try {
      const orderId = getProductsIds()[1];
      const userLogin = getUsersLogins()[2];

      await request.delete(`/api/carts/${userLogin}/${orderId}`).expect("Content-Type", /json/).expect(202);
      const response = await request.get(`/api/carts/${userLogin}`).expect("Content-Type", /json/).expect(200);

      expect(carts.length).toBe(0);
      expect(response.body.cart).toStrictEqual(carts);
    } catch (error) {
      console.error(error);
    }
  });
});
