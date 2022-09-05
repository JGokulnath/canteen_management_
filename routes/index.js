const express = require("express");
const adminControllers = require("../controllers/admin");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

//Sample Message
router.post("/welcome", (req, res, next) => {
  console.log(req.body);
  return res.json({
    products: [
      { name: "Product1", price: "12" },
      { name: "Product3", price: "12" },
      { name: "Product2", price: "12" },
    ],
  });
});
//PRODUCT
//Add new product
router.post("/add-product", verifyToken, adminControllers.postProduct);
//Get products
router.get("/products", verifyToken, adminControllers.fetchAllProducts);

//ORDER
//Place order
router.post("/place-order", verifyToken, adminControllers.placeOrder);
//fetch all orders
router.get("/orders", verifyToken, adminControllers.getAllOrders);
//fetch user orders
router.get("/get-orders", verifyToken, adminControllers.fetchUserOrders);
//cancel order
router.put("/cancel-order", verifyToken, adminControllers.cancelOrder);
//process order
router.put("/process-order", verifyToken, adminControllers.processOrder);

//USER
//Register user
router.post("/register", adminControllers.registerUser);
//Login user
router.post("/login", adminControllers.loginUser);

//TOKEN
router.post("/verify-token", verifyToken, (req, res) => {
  return res.json({ user: req.user.user });
});

module.exports = router;
