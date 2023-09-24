const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
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
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).send({ deleteContact });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const postContact = await addContact(req.body);
    return res.status(200).send({ postContact });
  } catch (error) {}
  return res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (updateContact === false) {
      return res.status(404).json({ message: "testst" });
    } else {
      const forUpdate = await updateContact(req.params.contactId, req.body);
      if (!forUpdate) {
        return res.status(404).json({ message: "Not found" });
      } else {
        return res.status(200).send({ forUpdate });
      }
    }
  } catch (error) {}
});

module.exports = router;
