const router = require('express').Router();
const projectController = require('../controllers/project');
const auth = require('../controllers/auth.middleware');

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', auth, projectController.create);
router.put('/:id', auth, projectController.update);
router.delete('/:id', auth, projectController.delete);
router.delete('/', auth, projectController.deleteAll);

module.exports = router;
