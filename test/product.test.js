const request = require("supertest");
const app = require("../app");
const Sequelize = require("sequelize");
const { Product } = require("../models");
const uploadFile = require("../middlewares/uploadFile");
const multer = require("multer");

jest.mock("multer");
jest.mock("../middlewares/uploadFile", () =>
  jest.fn((req, res, next) => {
    req.file.cloudStoragePublicUrl = "image.png";
    next();
  })
);

multer.single.mockImplementation(image => {
  return jest.fn((req, res, next) => {
    req.file = image;
    next();
  });
});
// multer.single.mockResolvedValue = function(req, res, next) {
//   req.file.cloudStoragePublicUrl = "image.png";
//   next();
// };

describe("product test", () => {
  afterAll(done => {
    queryInterface
      .bulkDelete("Products", {})
      .then(response => {
        done();
      })
      .catch(err => done(err));
  });

  describe("add product Test", () => {
    test("it should return new user object and status 200", done => {
      request(app)
        .post("/product")
        .send({
          name: "sarung",
          price: 2000,
          stock: 5,
          CategoryId: 1
        })
        .attach(
          "image",
          "/home/haekal/hacktiv8/haekaly.h8/phase02/e-commerce-cms/ecommerce-server/assets/ayam.jpg"
        )
        .end((err, response) => {
          expect(err).toBe(null);
          console.log(response.body, "[][][][][][][][][ ini body");
          expect(image).toHaveBeenCalledTimes(1);
          // expect(response.body).toHaveProperty('name', 'sarung')
          // expect(response.body).toHaveProperty('image_url', expect.any(String))
          // expect(response.body).toHaveProperty('price', 2000)
          // expect(response.body).toHaveProperty('stock', 5)
          expect(response.status).toBe(200);
          done();
        });
    });
  });
});
