const router = require("express").Router();
const authUser = require("../middleware/authenticator");
let Contact = require("../models/contact.model");

router.post("/addcontact", authUser, async (req, res) => {
  const { contactName, contactNumber } = req.body;
  console.log(req.body);
  console.log(req.id);
  if (contactName == "" || contactNumber == "") {
    return res.status(400).json({
      msg: "Please Fill Contacts Form",
      errReason: "Empty Field Submitted",
    });
  }

  //   let user = await User.findOne({ email });
  //   if (user) {
  //     return res.status(400).json({ msg: "User Exist !" });
  //   }
  const newContact = new Contact({
    contactName: req.body.contactName,
    contactNumber: req.body.contactNumber,
    userId: req.id,
  });

  newContact
    .save()
    .then(() => {
      res.status(201).json({ msg: "Contact Saved Successful" });
    })
    .catch((err) => res.status(400).json({ msg: "Error", errReason: err }));
});

router.get("/savedcontacts", authUser, async (req, res) => {
  const userId = req.id;

  Contact.find(
    { userId: userId },
    { _id: false, createdAt: false, updatedAt: false }
  )
    .select(["contactName", "contactNumber"])
    .then((fetchedContacts) => {
      console.log(fetchedContacts);
      res.status(200).json({
        msg: "Retrieved Contacts Successfully",
        contacts: fetchedContacts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: "No contacts found", errReason: err });
    });
});

router.delete("/deleteContact", async (req, res) => {
  let contact = req.body.contact;
  console.log("ContactNUmber->", contact);

  Contact.deleteOne({ contactNumber: contact })
    .then((updatedUser) => {
      console.log(updatedUser);
      res.status(200).json({ msg: "Contact Deleted" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
