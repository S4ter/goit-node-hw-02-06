const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve(__dirname, "./contacts.json");
const shortid = require("shortid");
const readContactsFromFile = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    return [err];
  }
};
const listContacts = async () => {
  try {
    const contacts = await readContactsFromFile();
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await readContactsFromFile();
    const index = contacts.find((contact) => contact.id === contactId);
    return index;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await readContactsFromFile();
    const index = contacts.find((contact) => contact.id === contactId);
    contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error writing contacts file:", err);
        return;
      }

      console.log(`Kontakt o ID ${contactId} został usunięty.`);
    });
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const generateID = shortid.generate();
    const contacts = await readContactsFromFile();
    const newContact = { id: generateID, ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Nowy kontakt został dodany: ${JSON.stringify(newContact)}`);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
