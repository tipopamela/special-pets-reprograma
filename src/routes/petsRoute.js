const controller = require('../controller/petsController')

const express = require('express')

const router = express.Router()


router.get("/all", controller.allPets);
router.get("/search/:petbytype", controller.petByType);
router.get("/searchgender/:petbygender", controller.petByGender);
router.get("/:id", controller.petById);
router.post("/add", controller.addNewPet);
router.patch("/:id", controller.updatePet);
router.delete("/:id", controller.deletePet);


module.exports = router
