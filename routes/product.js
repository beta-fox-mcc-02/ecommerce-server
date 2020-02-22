const router = require("express").Router();
const productController = require("../controllers/productController");

router.get("/product", productController.findAll);

router.post("/product/create", productController.create);

router.get("/product/:id/update", productController.findOne);

router.put("/product/:id/update", productController.update)

router.delete("/product/:id/delete", productController.delete)

module.exports = router;