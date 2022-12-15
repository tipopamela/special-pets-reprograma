const ownersModel = require("../models/ownersModel");
const SECRET = process.env.SECRET
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const addNewOwner = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const { name, birthDate, cpf, address, phone, email, password } = req.body;
    const addNewOwner = new ownersModel({
      name,
      birthDate,
      cpf,
      address,
      phone,
      email,
      password
    });

    const savedOwner = await addNewOwner.save();
    res.status(201).json({ "New owner successfully added": savedOwner });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const allOwners = async (req, res) => {
  try {
    const allOwners = await ownersModel.find();
    res.status(200).json(allOwners);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

const ownerById = async (req, res) => {
  try {
    const findOwner = await ownersModel.findById(req.params.id);
    if (findOwner == null) {
      res.status(404).json({ message: "Owner not available" });
    }
    res.status(200).json(findOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOwner = async (req, res) => {
  try {
    const findOwner = await ownersModel.findById(req.params.id);
    const reqBody = req.body;

    const ownerBody = (value) => {
      if (reqBody[value]) {
        findOwner[value] = reqBody[value];
      }
    };

    if (findOwner == null) {
      res.status(404).json({ message: "Owner not found." });
    }
    ownerBody("name");
    ownerBody("address");
    ownerBody("phone");
    ownerBody("email");

    const updatedOwner = await findOwner.save();
    res.status(200).json({ "Owner successfully updated": updatedOwner });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const findOwner = await ownersModel.findById(id);
    if (findOwner == null) {
      return res.status(404).json({ message: `Owner with ${id} not found` });
    }
    await findOwner.remove();
    res
      .status(200)
      .json({
        message: `Owner ${findOwner.name} with id: ${id} was successfully deleted.`,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authenticateOwner = (req, res, next) => {
  const token = req.get("authorization");

  if (!token) {
    return res.status(401).json({ message: "Invalid token!" });
  }

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    res.status(400).json({ message: "Access not allowed." });
  }
};

const ownerLogin = (req, res) => {
  try {
    ownersModel.findOne({ email: req.body.email }, function (error, owner) {
      if (!owner) {
        return res.status(404).json(`Owner ${req.body.name} was not found.`);
      }

      const validpassword = bcrypt.compareSync(
        req.body.password,
        owner.password
      );

      if (!validpassword) {
        return res
          .status(403)
          .json("Invalid password, please check and try again.");
      }

      const token = jwt.sign({ email: req.body.email }, SECRET);
      res.status(200).json({ message: "Successfully authenticated.", token });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewOwner,
  allOwners,
  ownerById,
  updateOwner,
  deleteOwner,
  authenticateOwner,
  ownerLogin
};

