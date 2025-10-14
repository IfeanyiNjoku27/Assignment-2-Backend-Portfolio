const Contact = require('../models/contacts');

//Get all contacts
module.exports.getAll = async function (req, res, next) {

    try {
        const contacts = await Contact.find();
        res.json(contacts);

    }  catch (err) {
        next(err);
    }
};

//Get contact by id
module.exports.getById = async function (req, res, next) {

    try {
        const contact = await Contact.findById(req.params.id);

        if(!contact) return res.status(404).json({message: 'Contact not found'});
        res.json(contact)
        
    } catch (err) {
        next(err)
    }
    
}

//Create new contact 
model.exports.create = async function (req, res, next) {
    
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(newContact);

    } catch (err) {
        next(err);
    }
};

//update contact by id
exports.update = async (req, res, next) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

//remove contact by id
exports.delete = async (req, res, next) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
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