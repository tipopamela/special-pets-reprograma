const petsModel = require("../models/petsModel");

const ownersModel = require("../models/ownersModel");

const allPets = async (req, res) => {
  try {
    const allPets = await petsModel.find().populate("owners");
    res.status(200).json(allPets);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

const petById = async (req, res) => {
  try {
    const findPet = await petsModel.findById(req.params.id).populate("owners");
    if (findPet == null) {
      res.status(404).json({ message: "Pet not available" });
    }
    res.status(200).json(findPet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNewPet = async (req, res) => {
  try {
    const {
      ownersId,
      name,
      age,
      gender,
      breed,
      size,
      weight,
      condition,
      adopted,
      type,
      description,
    } = req.body;

    const findOwner = await ownersModel.findById(ownersId);
    const newPet = new petsModel({
      owners: ownersId,
      name,
      age,
      gender,
      breed,
      size,
      weight,
      condition,
      adopted,
      type,
      description,
    });
    const savedPet = await newPet.save();
    res.status(200).json({ "New pet successfully added": savedPet });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const updatePet = async (req, res) => {
  try {
    const findPet = await petsModel.findById(req.params.id);
    const reqBody = req.body;

    const petBody = (value) => {
      if (reqBody[value]) {
        findPet[value] = reqBody[value];
      }
    };

    if (findPet == null) {
      res.status(404).json({ message: "Pet not found." });
    }

    petBody("owners");
    petBody("name");
    petBody("age");
    petBody("size");
    petBody("weight");
    petBody("condition");
    petBody("adopted");
    petBody("description");

    const updatedPet = await findPet.save();
    res.status(200).json({ "Pet successfully updated": updatedPet });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const petByType = async (req, res) => {
  try {
    const findPetByType = req.query.type;
    const regex = new RegExp(findPetByType, "i");
    const findByType = await petsModel.find({ type: { $regex: regex } });
    if (findByType.length < 1) {
      res.status(404).json({ message: `No ${findPetByType} available.` });
    }
    res.status(200).json(findByType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const petByGender = async (req, res) => {
  try {
    const findPetByGender = req.query.gender;
    const findByGender = await petsModel.find({ gender: findPetByGender });
    if (findByGender.length < 1) {
      res.status(404).json({ message: `Invalid gender.` });
    }
    res.status(200).json(findByGender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const findPet = await petsModel.findById(id);
    if (findPet == null) {
      return res.status(404).json({ message: `Pet with ${id} not found` });
    }
    await findPet.remove();
    res.status(200).json({
      message: `Pet ${findPet.name} with id: ${id} was successfully deleted.`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  allPets,
  petById,
  addNewPet,
  updatePet,
  petByType,
  petByGender,
  deletePet,
};
