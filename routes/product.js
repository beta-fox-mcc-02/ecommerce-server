const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/product", productController.findAll);

router.post("/product", productController.create);

router.get("/product/:id", productController.findOne);

router.put("/product/:id", productController.update)

router.delete("/product/:id", productController.delete)

module.exports = router;