const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await listContacts();
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const getContact = await getContactById(req.params.contactId);
    if (!getContact) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).send({ getContact });
    }
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:contactId", async (req, res, next) => {
  try {
    const deleteContact = await removeContact(req.params.contactId);
    if (!deleteContact) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).send({ deleteContact });
    }
  } catch (error) {}
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
