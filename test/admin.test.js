const request = require("supertest");
const app = require("../app");
const Sequelize = require("sequelize");
const {
  Admin,
  sequelize
} = require("../models");
const {
  queryInterface
} = sequelize;

describe("User register", () => {

  afterAll(done => {
    queryInterface
      .bulkDelete("Admins", {})
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe("Admin register success", () => {
    test("should return status 201", done => {
      request(app)
        .post("/admin/register")
        .send({
          // email: "yupi41@mail.com",
          // password: "yupi"
          email: "admin@mail.com",
          password: "admin"
        })
        .end((err, response) => {
          expect(err).toBe(null);
          expect(response.body).toHaveProperty("email");
          expect(response.body).toHaveProperty("password");
          expect(response.body).toHaveProperty("msg");
          expect(response.status).toBe(201);
          done();
        });
    });
  });

  describe("Admin register validation failed", () => {
    test("should return status 400", done => {
      request(app)
        .post("/admin/register")
        .send({
          username: "yupi",
          email: "yupinotmail.com",
          password: "yui",
          role: 1
        })
        .end((err, response) => {
          // expect(err).toBe(null);
          // console.log(response.body.msg[0], "---------------------");
          // console.log(response.body.err, "error email register")
          expect(response.body).toHaveProperty("msg");
          expect(response.status).toBe(400);
          done();
        });
    });
  });

  describe("Admin register input failed", () => {
    test("should return status 400", done => {
      request(app)
        .post("/admin/register")
        .send({
          username: "",
          email: "",
          password: "",
          role: 0
        })
        .end((err, response) => {
          // expect(err).toBe(null);
          // console.log(response.body, "---------------------");
          expect(response.body).toHaveProperty("msg");
          expect(response.status).toBe(400);
          done();
        });
    });
  });
});

describe("Admin Login", () => {
  describe("Admin login success", () => {
    test("it should return email, token and status 200", done => {
      request(app)
        .post("/admin/login")
        .send({
          email: "yupi41@mail.com",
          password: "yupi"
        })
        .end((err, response) => {
          expect(err).toBe(null);
          // console.log(response.body);
          expect(response.body).toHaveProperty("email");
          expect(response.body).toHaveProperty("token");
          expect(response.status).toBe(200);
          done();
        });
    });
  });

  describe("User login failed", () => {
    test("it should return status 404", done => {
      request(app)
        .post("/admin/login")
        .send({
          email: "yup@mail.com",
          password: "yui"
        })
        .end((err, response) => {
          expect(response.body).toHaveProperty("err");
          expect(response.body).toHaveProperty("msg");
          expect(response.status).toBe(404);
          done();
        });
    });
  });
});