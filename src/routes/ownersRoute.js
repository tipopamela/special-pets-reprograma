const controller = require('../controller/ownersController')

const express = require('express')

const router = express.Router()


router.get("/all", controller.allOwners);
router.get("/:id", controller.ownerById);
router.post("/add", controller.addNewOwner);
router.post("/login", controller.ownerLogin);
router.patch("/:id", controller.authenticateOwner, controller.updateOwner);
router.delete("/:id", controller.authenticateOwner, controller.deleteOwner);


module.exports = router
