const request = require("supertest");
const app = require("../app");
const Sequelize = require("sequelize");
const {
    Admin,
    Product,
    sequelize
} = require("../models");
const {
    queryInterface
} = sequelize;

afterAll(done => {
    queryInterface
      .bulkDelete("Products", {})
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

let idFindOne = ''

beforeAll(done => {
    Product.create({
        name: "Teh",
        image_url: "https://static.republika.co.id/uploads/images/inpicture_slide/secangkir-teh-_190524103045-721.jpg",
        price: 6000,
        stocks: 108
    })
      .then(data => {
        idFindOne = data.id
        done()
      })
      .catch(err => {
        done(err)
      })
  })


describe("Product test", () => {

    describe("Read/Get all product", () => {
        test("it should return product list  and status 200", done => {
            request(app)
                .get("/admin/product")
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });

    describe("Create newproduct", () => {
        test("should return status 201", done => {
            request(app)
                .post("/admin/product/create")
                .send({
                    name: "Teh",
                    image_url: "https://static.republika.co.id/uploads/images/inpicture_slide/secangkir-teh-_190524103045-721.jpg",
                    price: 6000,
                    stocks: 108
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("name");
                    expect(response.body).toHaveProperty("image_url");
                    expect(response.body).toHaveProperty("price");
                    expect(response.body).toHaveProperty("stocks");
                    expect(response.status).toBe(201);
                    done();
                });
        });
    });

    describe("Failed to create new product negative price", () => {
        test("should return status 400", done => {
            request(app)
                .post("/admin/product/create")
                .send({
                    name: "Radeon VII",
                    image_url: "http://tinyurl.com/9q8ry2983h",
                    price: -28722,
                    stocks: 28
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body.err, 'error create product')
                    // expect(response.body).toHaveProperty("err");
                    expect(response.status).toBe(400);
                    done();
                });
        });
    });

    describe("Failed to create new product negative stocks", () => {
        test("should return status 400", done => {
            request(app)
                .post("/admin/product/create")
                .send({
                    name: "Radeon VII",
                    image_url: "http://tinyurl.com/9q8ry2983h",
                    price: 98722,
                    stocks: -28
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body.err, 'error create product')
                    // expect(response.body).toHaveProperty("err");
                    expect(response.status).toBe(400);
                    done();
                });
        });
    });

    describe("Read/Get specific product by id", () => {
        test("it should return product list and status 200", done => {
            request(app)
                .get(`/admin/product/${idFindOne}/update`)
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("name");
                    expect(response.body).toHaveProperty("image_url");
                    expect(response.body).toHaveProperty("price");
                    expect(response.body).toHaveProperty("stocks");
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });

    describe("Failed to Read/Get specific product by id", () => {
        test("it should return status 404", done => {
            request(app)
                .get("/admin/product/12/update")
                .end((err, response) => {
                    // expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("err");
                    expect(response.body).toHaveProperty("msg");
                    expect(response.status).toBe(404);
                    done();
                });
        });
    });

    describe("Update product by id", () => {
        test("it should return new product value and status 201", done => {
            request(app)
                .put(`/admin/product/${idFindOne}/update`)
                .send({
                    name: "kopi luwak",
                    image_url: "http://www.imageurl.com",
                    price: 12000,
                    stocks: 29
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("name");
                    expect(response.body).toHaveProperty("image_url");
                    expect(response.body).toHaveProperty("price");
                    expect(response.body).toHaveProperty("stocks");
                    expect(response.status).toBe(201);
                    done();
                });
        });
    });

    describe("Failed to update product by id", () => {
        test("should return status 400", done => {
            request(app)
                .put("/admin/product/1/update")
                .send({
                    name: "",
                    image_url: "",
                    price: 0,
                    stocks: 0
                })
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body.err, 'error create product')
                    expect(response.body).toHaveProperty("err");
                    expect(response.status).toBe(400);
                    done();
                });
        });
    });

    describe("Delete product by id", () => {
        test("it should return status 200", done => {
            request(app)
                .delete(`/admin/product/${idFindOne}/delete`)
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("msg");
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });

    describe("Failed to Delete product by id", () => {
        test("it should return status 200", done => {
            request(app)
                .delete("/admin/product/3920/delete")
                .end((err, response) => {
                    expect(err).toBe(null);
                    // console.log(response.body)
                    expect(response.body).toHaveProperty("msg");
                    expect(response.status).toBe(200);
                    done();
                });
        });
    });
});