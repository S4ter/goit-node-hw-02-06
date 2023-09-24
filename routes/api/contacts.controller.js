const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.service");

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
    return res
      .status(200)
      .send({ deleteContact })
      .json({ message: "Contact deleted" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (
    name === "" ||
    !name ||
    email === "" ||
    !email ||
    phone === "" ||
    !phone
  ) {
    return res.status(400).json({ message: "missing required fields" });
  } else {
    try {
      const postContact = await addContact(req.body);

      return res.status(200).send({ postContact });
    } catch (error) {
      return res.status(404).json({ message: "Not found" });
    }
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (
    name === "" ||
    !name ||
    email === "" ||
    !email ||
    phone === "" ||
    !phone
  ) {
    return res.status(400).json({ message: "missing required fields" });
  } else {
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
  }
});

module.exports = router;
