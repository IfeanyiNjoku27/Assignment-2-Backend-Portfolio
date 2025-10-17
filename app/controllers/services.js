const Service = require('../models/services');

//Get all services
module.exports.getAll = async function (req, res, next) {

  //Get all from DB and then send a reponse
    try {
        const servicesList = await Service.find();
        res.json(servicesList);

    }  catch (err) {
      next(err);
    }
};

//Get services by id
exports.getById = async function (req, res, next) {

    try {
      //Find service using id sent in the paramater of the request
        const service = await Service.findById(req.params.id);

        if(!service) return res.status(404).json({message: 'Service not found'});
        res.json(service);
        
    } catch (err) {
      next(err);
    }
    
}

//Add new service 
exports.create = async function (req, res, next) {
    
    try {
        const service = await Service.create(req.body);
  
        //Send a response
        res.status(201).json({
          success: true,
          message: "Service created sucessfully",
          id: service._id
        });

    } catch (err) {
      next(err);
    }
};

//update service by id
exports.update = async (req, res, next) => {

  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Service not updated. Are you sure it exists?',
    });

} else {
  return res.status(200).json({
    success: true,
    message: 'Service updated sucessfully',
    data: updated,
  });
}

  } catch (err) {
    next(err);
  }
}

//remove service by id
exports.delete = async (req, res, next) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Service not found' });
    res.json({
      success: true,
      message: 'Service deleted successfully' 
    });

  } catch (err) {
    next(err);
  }
};

//remove all services
exports.deleteAll = async (req, res, next) => {
  try {
    const result = await Service.deleteMany();
    res.json({ message: `Deleted ${result.deletedCount} services` });
  } catch (err) {
    next(err);
  }
};