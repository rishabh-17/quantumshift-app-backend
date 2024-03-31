const Section = require("../models/Section");

exports.getAll = async (req, res) => {
  try {
    const section = await Section.find({}).select(["-createdAt"]);
    res.status(200).json({ success: true, data: section });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching section failed, please try again",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const section = await Section.findOne({ _id: req.params.id });
    res.json(section);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

exports.create = async (req, res) => {
  try {
    const { video, thumbnail, audios, title, description } = req.body;
    const newSection = new Section({
      video,
      thumbnail,
      audios,
      title,
      description,
    });
    await newSection.save();
    res.status(201).json({ success: true, data: newSection });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Unable to create a section, please try again",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
