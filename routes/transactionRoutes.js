const express = require('express');
const router = express.Router();
const { 
    getTransactions, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

// Semua rute di bawah ini akan diproteksi
router.use(protect);

router.route('/')
    .get(getTransactions)
    .post(addTransaction);

router.route('/:id')
    .put(updateTransaction)
    .delete(deleteTransaction);

module.exports = router;
