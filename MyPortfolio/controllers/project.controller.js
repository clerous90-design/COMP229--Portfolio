const Project = require('../models/project');

exports.findAll = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error retrieving projects." });
  }
};

exports.findOne = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving project." });
  }
};

exports.create = async (req, res) => {
  try {
    const project = new Project({
      title: req.body.title,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      completion: req.body.completion,
      description: req.body.description
    });
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error creating project." });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProject) return res.status(404).json({ message: "Project not found." });
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: "Error updating project." });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found." });
    res.json({ message: "Project deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete project." });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Project.deleteMany({});
    res.json({ message: "All projects deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting all projects." });
  }
};