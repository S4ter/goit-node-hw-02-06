const { Contact } = require("./contacts.model");

const listContacts = async () => {
  try {
    return await Contact.find();
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
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
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
};
