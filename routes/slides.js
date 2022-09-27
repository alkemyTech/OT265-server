const router = require("express").Router();

//-------------------Middlewares----------------------//

const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
//-------------------Controllers----------------------//
const {
  listarSlides,
  deleteSlide,
  slideDetails,
  editSlide,
  create_slide,
} = require("../controllers/slides_controllers");

router.put("/:id", [isAuthenticated, isAdmin], editSlide);

router.delete("/:id", [isAuthenticated, isAdmin], deleteSlide);

router.get("/", [isAuthenticated, isAdmin], listarSlides);

router.get("/:id", slideDetails);

router.post("/", [isAuthenticated, isAdmin], create_slide);

module.exports = router;
