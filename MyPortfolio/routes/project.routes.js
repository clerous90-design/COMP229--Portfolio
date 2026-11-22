const express = require("express");
const router = express.Router();
const controller = require("../controllers/project.controller");
const { verifyJWT, isAdmin } = require("../middlewares/auth.middleware");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Authorization, Origin, Content-Type, Accept"
  );
  next();
});

// Public read so visitors & Users can view projects
router.get("/", controller.findAll);

// Admin-only write routes
router.post("/", verifyJWT, isAdmin, controller.create);

if (controller.update) {
  router.put("/:id", verifyJWT, isAdmin, controller.update);
}

if (controller.delete) {
  router.delete("/:id", verifyJWT, isAdmin, controller.delete);
}

module.exports = router;