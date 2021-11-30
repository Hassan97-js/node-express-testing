const app = require("../../app");
const request = require("supertest")(app);

// Imports
const { getProducts, getProduct, getProductsIds, resetDatabase } = require("../db/db");

beforeEach(() => resetDatabase());
afterEach(() => resetDatabase());

let productId;

// get products
describe("API endpoints", () => {
  it("GET/ Products", (done) => {
    const products = getProducts();
    expect(products.length).toBe(3);

    const response = request.get("/api/products");
    response
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.products = products;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });

  // get product
  it("GET/ Product", (done) => {
    const products = getProducts();
    const productsIds = getProductsIds();
    const product = getProduct(productsIds[0]);
    const response = request.get(`/api/products/${productsIds[0]}`);

    expect(products.length).toBe(3);

    response
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.product).toStrictEqual(product);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
