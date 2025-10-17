const router = require('express').Router();
const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.delete('/', userController.deleteAll);

module.exports = router;
