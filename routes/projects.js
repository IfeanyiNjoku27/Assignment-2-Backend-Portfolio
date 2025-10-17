const router = require('express').Router();
const projectController = require('../controllers/project');

router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);
router.delete('/', projectController.deleteAll);

module.exports = router;
