const express = require('express');
const router = express.Router();
const { addSala, getBlocos, 
        getSalaById, getSalasByBloco, 
        updateSala, deleteSala } = require('../controllers/salaController');
        
router.post('/', addSala);
router.get('/blocos', getBlocos);
router.get('/:id', getSalaById);
router.get('/blocos/filter', getSalasByBloco);
router.put('/:id', updateSala);
router.delete('/:id', deleteSala);

module.exports = router;