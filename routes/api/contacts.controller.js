const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).send({ contacts });
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
    return res
      .status(200)
      .send({ deleteContact })
      .json({ message: "Contact deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const postContact = await addContact(req.body);

    return res.status(200).send({ postContact });
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const forUpdate = await updateContact(req.params.contactId, req.body);

    if (!forUpdate) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).send({ forUpdate });
    }
  } catch (error) {
    console.log(error);
  }
});
router.patch("/:contactId", async (req, res, next) => {
  try {
    const changeFavorite = await updateStatusContact(
      req.params.contactId,
      req.body
    );

    if (!changeFavorite) {
      return res.status(404).json({ message: "Not found" });
    } else {
      return res.status(200).send({ changeFavorite });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
