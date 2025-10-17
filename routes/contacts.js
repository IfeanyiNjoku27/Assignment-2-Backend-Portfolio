const router = require('express').Router();
const contactcontroller = require('../controllers/contact');

router.get('/', contactcontroller.getAll);
router.get('/:id', contactcontroller.getById);
router.post('/', contactcontroller.create);
router.put('/:id', contactcontroller.update);
router.delete('/:id', contactcontroller.delete);
router.delete('/', contactcontroller.deleteAll);

module.exports = router;

