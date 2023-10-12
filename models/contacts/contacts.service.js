const { Contact } = require("./contacts.model");

const listContacts = async (ownerId, limit, skip, favorite) => {
  try {
    let findData = {};
    if (favorite === "true") {
      findData = { owner: ownerId, favorite: "true" };
    } else {
      findData = { owner: ownerId };
    }

    return await Contact.find(findData).limit(limit).skip(skip);
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (err) {
    console.log(err);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndDelete(contactId);
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (contact) => {
  try {
    const newContact = new Contact(contact);
    const saveContact = await newContact.save();
    return saveContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  console.log(body);
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (err) {
    console.log(err);
    return null;
  }
};
const updateStatusContact = async (contactId, favorite) => {
  console.log(favorite);
  try {
    return await Contact.findByIdAndUpdate(contactId, favorite, { new: true });
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
