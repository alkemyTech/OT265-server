const router = require("express").Router();
const { check } = require("express-validator");

//import Controllers:
const validarCampos = require("../middlewares/validar_campos");

//Import middlewares:
const CategoryController = require("../controllers/category_controllers");
const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");

/* Get all categories endpoint */
router.get("/", CategoryController.get);

/* create category endpoint */
router.post(
  "/",
  [
    isAuthenticated,
    isAdmin,
    check("name", "El nombre es obligatorio y debe ser un string.")
      .not()
      .isEmpty()
      .isString(),
    validarCampos,
  ],
  CategoryController.create
);

/* Get category detail endpoint */
router.get("/:id", CategoryController.getOne); /* Corregir devolución del 404 */

/* Category update endpoint */
router.put("/:id", [isAuthenticated, isAdmin], CategoryController.update);

/* Category delete endpoint */
router.delete("/:id", [isAuthenticated, isAdmin], CategoryController.delete);

module.exports = router;
