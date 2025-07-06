const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Test endpoint - tidak perlu database
router.get('/test', (req, res) => {
    res.json({ 
        message: 'User routes working!', 
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
