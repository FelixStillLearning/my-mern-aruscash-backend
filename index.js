const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// CORS middleware
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

// Test endpoints (no database required)
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'API Test endpoint working!', 
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/test', (req, res) => {
    res.json({ 
        message: 'POST request received!', 
        data: req.body,
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// Database connection status endpoint
app.get('/api/db-status', (req, res) => {
    const dbStatus = {
        connected: false,
        readyState: 0,
        name: 'Not connected'
    };
    
    if (require('mongoose').connection.readyState === 1) {
        dbStatus.connected = true;
        dbStatus.readyState = 1;
        dbStatus.name = require('mongoose').connection.name;
    }
    
    res.json({
        database: dbStatus,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ 
        message: 'ArusCash API is running...', 
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'ArusCash Backend',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});
