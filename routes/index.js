const express = require("express");
const adminControllers = require("../controllers/admin");
const verifyToken = require("../middleware/verifyToken");
const Product = require("../models/Product");
const upload = require("../controllers/uploadFiles");
const router = express.Router();
const { placeOrder } = require("../controllers/placeOrder");
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
//IMAGE
//Upload image
router.post("/post-image", upload.uploadFiles);
//PRODUCT
//Add new product
router.post("/add-product", verifyToken, adminControllers.postProduct);
//Edit product
router.post("/edit-product", verifyToken, adminControllers.editProduct);
//Get products
router.get("/products", adminControllers.fetchAllProducts);
//Get product details by ID
router.post("/product/:id", (req, res, next) => {
  const pid = req.params["id"].trim();
  console.log(pid);
  Product.getProductById(pid).then((response) => {
    console.log(response);
    if (response) return res.status(200).json(response);
    else return res.status(204).json({ product: null });
  });
});
//MENU
//Get Menus
router.get("/menu", adminControllers.getMenu);
//Add new menu
router.post("/add-menu", verifyToken, adminControllers.addMenu);
//Edit menu
router.post("/edit-menu", verifyToken, adminControllers.editMenu);
//Delete menu
router.post("/delete-menu", verifyToken, adminControllers.deleteMenu);
//ORDER
//Place order
router.post("/place-order", verifyToken, placeOrder);
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
//Access Token Check
router.post("/verify-token", verifyToken, (req, res) => {
  return res.json({
    user: req.user.user,
    verified: req.user.verified,
    isAdmin: req.user.isAdmin,
  });
});
//Register Token Check
router.get("/:userId/verify/:token", adminControllers.verifyEmail);
//Resend Verification Email
router.post(
  "/resend-verification",
  verifyToken,
  adminControllers.resendVerification
);
module.exports = router;
