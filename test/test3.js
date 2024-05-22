// TODO aici gestionăm operațiile CRUD (create, read, update, delete) și returnam un răspuns către client. Aici gestionăm interacțiunea cu utilizatorul final:
// TODO GET (LIST):
/* GET localhost:3000/api/contacts */
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res
      .status(STATUS_CODES.success)
      .json({ message: "The list was successfully returned", data: contacts });
  } catch (error) {
    respondWithError(res, error);
  }
});

// TODO Aici interacționăm cu baza de date:
// TODO LIST Contacts:
const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error(error);
    throw new Error(`Error listing contacts: ${error.message}`);
  }
};
