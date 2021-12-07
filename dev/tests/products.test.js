const app = require("../../app");
const request = require("supertest")(app);

// Imports
const { getProducts, getProduct, getProductsIds, resetDatabase } = require("../db/db");
const { generateUniqueId } = require("../utilities/generic/generators");

beforeEach(() => resetDatabase());
afterEach(() => resetDatabase());

// Global constants
const products = getProducts();
const productsIds = getProductsIds();

describe("Products API endpoints tests", () => {
  it("GET/ Get Products", async () => {
    try {
      const response = await request.get("/api/products").expect("Content-Type", /json/).expect(200);

      expect(products.length).toBe(3);
      expect(response.body.products).toStrictEqual(products);
    } catch (error) {
      console.error(error);
    }
  });

  it("GET/ Get Product", async () => {
    try {
      const product = getProduct(productsIds[0]);

      const response = await request.get(`/api/products/${productsIds[0]}`).expect("Content-Type", /json/).expect(200);

      expect(products.length).toBe(3);
      expect(response.body.product).toStrictEqual(product);
    } catch (error) {
      console.error(error);
    }
  });

  it("POST/ Create Product", async () => {
    try {
      const product = {
        id: generateUniqueId(10),
        name: "ADMI Gaming PC: i5 9400F 4.1GHz Six Core CPU/Nvidia RTX",
        price: 19911
      };

      await request.post("/api/products").expect("Content-Type", /json/).send(product).expect(201);
      const response = await request.get("/api/products").expect("Content-Type", /json/).expect(200);

      expect(products.length).toBe(4);
      expect(response.body.products).toStrictEqual(products);
    } catch (error) {
      console.error(error);
    }
  });

  it("PUT/ Update Product", async () => {
    try {
      const updatedProduct = {
        id: generateUniqueId(10),
        name: "CyberPowerPC Wyvern Gaming PC - Intel Core i5-9400F",
        price: 15095
      };

      await request
        .put(`/api/products/${productsIds[0]}`)
        .send(updatedProduct)
        .expect("Content-Type", /json/)
        .expect(200);
      const response = await request.get("/api/products").expect("Content-Type", /json/).expect(200);

      expect(products.length).toBe(3);
      expect(response.body.products).toStrictEqual(products);
    } catch (error) {
      console.error(error);
    }
  });
});

it("DELETE/ Delete Product", async () => {
  try {
    await request.delete(`/api/products/${productsIds[1]}`).expect("Content-Type", /json/).expect(202);
    const response = await request.get("/api/products").expect("Content-Type", /json/).expect(200);

    expect(products.length).toBe(2);
    expect(response.body.products).toStrictEqual(products);
  } catch (error) {
    console.error(error);
  }
});
