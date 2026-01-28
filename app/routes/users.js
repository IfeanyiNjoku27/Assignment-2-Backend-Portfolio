const router = require('express').Router();
const userController = require('../controllers/users');
const auth = require('../controllers/auth.middleware');

// Public Routes
router.post('/signin', userController.signin);
router.post('/signup', userController.create);


// Protected Routes
router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', auth, userController.create);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController.delete);

module.exports = router;
