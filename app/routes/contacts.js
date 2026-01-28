const router = require('express').Router();
const contactcontroller = require('../controllers/contact');
const auth = require('../controllers/auth.middleware');

// Public Routes
router.get('/', contactcontroller.getAll);
router.get('/:id', contactcontroller.getById);

// Protected Routes
router.post('/', auth, contactcontroller.create);
router.put('/:id', auth, contactcontroller.update);
router.delete('/:id', auth, contactcontroller.delete);
router.delete('/', auth, contactcontroller.deleteAll);

module.exports = router;

