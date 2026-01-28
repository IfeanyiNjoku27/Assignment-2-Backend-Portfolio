const router = require('express').Router();
const serviceController = require('../controllers/services');

// Public Routes
router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);

// Protected Routes
router.post('/', serviceController.create);
router.put('/:id', serviceController.update);
router.delete('/:id', serviceController.delete);
router.delete('/', serviceController.deleteAll);

module.exports = router;
