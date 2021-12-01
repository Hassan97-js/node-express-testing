const app = require("../../app");
const request = require("supertest")(app);

// Imports
const { getProducts, getProduct, getProductsIds, resetDatabase } = require("../db/db");
const { generateUniqueId } = require("../utilities/generic/generators");

beforeEach(() => resetDatabase());
afterEach(() => resetDatabase());

describe("API endpoints tests", () => {
  it("GET/ Get Products", async () => {
    try {
      const products = getProducts();
      const response = await request.get("/api/products").expect("Content-Type", /json/).expect(200);

      expect(products.length).toBe(3);
      expect(response.body.products).toStrictEqual(products);
    } catch (error) {
      console.error(error);
    }
  });

  it("GET/ Get Product", async () => {
    try {
      const products = getProducts();
      const productsIds = getProductsIds();
      const product = getProduct(productsIds[0]);
      await request
        .get(`/api/products/${productsIds[0]}`)
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => expect(res.body.product).toStrictEqual(product));

      expect(products.length).toBe(3);
    } catch (error) {
      console.error(error);
    }
  });

  it("POST/ Create Product", async () => {
    try {
      const products = getProducts();
      const product = {
        id: generateUniqueId(10),
        name: "ADMI Gaming PC: i5 9400F 4.1GHz Six Core CPU/Nvidia RTX",
        price: 19911
      };

      await request.post("/api/products").expect("Content-Type", /json/).send(product).expect(201);

      const response = await request.get("/api/products");
      expect(products.length > 3).toBe(true);
      expect(response.body.products).toStrictEqual(products);
    } catch (error) {
      console.error(error);
    }
  });

  it("PUT/ Update Product", async () => {
    try {
      const products = getProducts();
      const productsIds = getProductsIds();
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
      const response = await request.get("/api/products");

      expect(products.length).toBe(3);
      expect(response.body.products).toStrictEqual(products);
    } catch (error) {
      console.error(error);
    }
  });
});
