const Contact = require('../models/contacts');

//Get all contacts
module.exports.getAll = async function (req, res, next) {

  //Get all from DB and then send a reponse
    try {
        const contactsList = await Contact.find();
        res.json(contactsList);

    }  catch (err) {
      console.log(err);
      next(err);
    }
};

//Get contact by id
module.exports.getById = async function (req, res, next) {

    try {
      //Find contact using id sent in the paramater of the request
        const contact = await Contact.findById({_id: req.params.id});

        if(!contact) return res.status(404).json({message: 'Contact not found'});
        res.json(contact);
        
    } catch (err) {
      console.log(err);
      next(err);
    }
    
}

//Add new contact 
model.exports.create = async function (req, res, next) {
    
    try {
        const contact = await Contact.create(req.body);
        console.log("Contact: " + contact)
  
        //Send a response
        res.status(201).json({
          success: true,
          message: "Contact created sucessfully",
          id: contact._id
        });

    } catch (err) {
      console.log(err);
      next(err);
    }
};

//update contact by id
exports.update = async (req, res, next) => {

  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Contact not updated. Are you sure it exists?',
    });

} else {
  return res.status(200).json({
    success: true,
    message: 'Contact updated sucessfully',
    data: updated,
  });
}

  } catch (err) {
    next(err);
  }
}

//remove contact by id
exports.delete = async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    res.json({
      success: true,
      message: 'Contact deleted successfully' 
    });
    
  } catch (err) {
    next(err);
  }
};

//remove all contacts
exports.deleteAll = async (req, res, next) => {
  try {
    const result = await Contact.deleteMany();
    res.json({ message: `Deleted ${result.deletedCount} contacts` });
  } catch (err) {
    next(err);
  }
};