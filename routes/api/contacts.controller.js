const express = require("express");
const { authMiddleware } = require("../../models/auth/auth.middleware");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts/contacts.service");

const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page, limit, favorite } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await listContacts(userId, limit, skip, favorite);
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

router.post("/", authMiddleware, async (req, res, next) => {
  console.log(req.user._id);
  try {
    const { name, email, phone, favorite } = req.body;

    const userId = req.user._id;
    const contactData = {
      name,
      email,
      phone,
      favorite,
      owner: userId,
    };
    const postContact = await addContact(contactData);

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
