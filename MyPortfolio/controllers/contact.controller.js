const Contact = require('../models/contact');

// Get all contacts
exports.findAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while retrieving contacts." });
  }
};

// Get contact by id
exports.findOne = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found with id " + req.params.id });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving contact with id " + req.params.id });
  }
};

// Add new contact
exports.create = async (req, res) => {
  try {
    const contact = new Contact({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    });
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while creating the contact." });
  }
};

// Update contact by id
exports.update = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: "Contact not found." });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: "Error updating contact." });
  }
};

// Remove contact by id
exports.delete = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: "Contact not found." });
    res.json({ message: "Contact was deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete contact." });
  }
};

// Remove all contacts
exports.deleteAll = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.json({ message: "All contacts were deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while removing all contacts." });
  }
};