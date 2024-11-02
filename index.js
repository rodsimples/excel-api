const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Root
app.get('/', (req, res) => {
    res.json({
        message: 'Fire Excel Manager API',
        version: '1.0.0',
        status: 'running'
    });
});

// Health
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});