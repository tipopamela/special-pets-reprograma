const ownersModel = require("../models/ownersModel");


const addNewOwner = async (req, res) => {
  try {
    const { name, birthDate, cpf, address, phone, email } = req.body;
    const addNewOwner = new ownersModel({
      name,
      birthDate,
      cpf,
      address,
      phone,
      email,
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

module.exports = {
  addNewOwner,
  allOwners,
  ownerById,
  updateOwner,
  deleteOwner,
};
