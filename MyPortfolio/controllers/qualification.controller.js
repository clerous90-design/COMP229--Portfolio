const Qualification = require('../models/qualification');

exports.findAll = async (req, res) => {
  try {
    const qualifications = await Qualification.find();
    res.json(qualifications);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error retrieving qualifications." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) return res.status(404).json({ message: "Qualification not found." });
    res.json(qualification);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving qualification." });
  }
};

exports.create = async (req, res) => {
  try {
    const qualification = new Qualification({
      title: req.body.title,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      completion: req.body.completion,
      description: req.body.description
    });
    const savedQualification = await qualification.save();
    res.json(savedQualification);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error creating qualification." });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedQualification = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQualification) return res.status(404).json({ message: "Qualification not found." });
    res.json(updatedQualification);
  } catch (err) {
    res.status(500).json({ message: "Error updating qualification." });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedQualification = await Qualification.findByIdAndDelete(req.params.id);
    if (!deletedQualification) return res.status(404).json({ message: "Qualification not found." });
    res.json({ message: "Qualification deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete qualification." });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.json({ message: "All qualifications deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting all qualifications." });
  }
};