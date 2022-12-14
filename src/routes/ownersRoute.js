const controller = require('../controller/ownersController')

const express = require('express')

const router = express.Router()


router.get("/all", controller.allOwners);
router.get("/:id", controller.ownerById);
router.post("/add", controller.addNewOwner);
router.patch("/:id", controller.updateOwner);
router.delete("/:id", controller.deleteOwner);


module.exports = router
