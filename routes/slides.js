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
} = require("../controllers/slides_controllers");

router.put("/:id", [isAuthenticated, isAdmin], editSlide);

router.delete("/:id", [isAuthenticated, isAdmin], deleteSlide);

router.get("/", [isAuthenticated, isAdmin], listarSlides);

router.get("/:id", slideDetails);

router.post('/', decodeBase64Image, create_slide);

module.exports = router;
