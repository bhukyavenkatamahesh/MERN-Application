const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(201).json({ mssg: "Message Sent Successfully" });
  } catch (error) {
    return res.status(500).json({ mssg: "Message not Delivered" });
  }
};

module.exports = contactForm;
