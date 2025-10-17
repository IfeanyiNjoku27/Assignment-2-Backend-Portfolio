const Project = require('../models/projects');

//Get all projects
exports.getAll = async function (req, res, next) {

  //Get all from DB and then send a reponse
    try {
        const projectsList = await Project.find();
        res.json(projectsList);

    }  catch (err) {
      next(err);
    }
};

//Get project by id
exports.getById = async function (req, res, next) {

    try {
      //Find project using id sent in the paramater of the request
        const project = await Project.findById(req.params.id);

        if(!project) return res.status(404).json({message: 'Project not found'});
        res.json(project);
        
    } catch (err) {
      next(err);
    }
    
}

//Add new project 
exports.create = async function (req, res, next) {
    
    try {
        const project = await Project.create(req.body);
  
        //Send a response
        res.status(201).json({
          success: true,
          message: "Project created sucessfully",
          id: project._id
        });

    } catch (err) {
      next(err);
    }
};

//update project by id
exports.update = async (req, res, next) => {

  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({
      success: false,
      message: 'Project not updated. Are you sure it exists?',
    });

} else {
  return res.status(200).json({
    success: true,
    message: 'Project updated sucessfully',
    data: updated,
  });
}

  } catch (err) {
    next(err);
  }
}

//remove project by id
exports.delete = async (req, res, next) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Project not found' });
    res.json({
      success: true,
      message: 'Project deleted successfully' 
    });

  } catch (err) {
    next(err);
  }
};

//remove all projects
exports.deleteAll = async (req, res, next) => {
  try {
    const result = await Project.deleteMany();
    res.json({ message: `Deleted ${result.deletedCount} projects` });
  } catch (err) {
    next(err);
  }
};