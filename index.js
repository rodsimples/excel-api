const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configuração inicial
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rota principal
app.get('/', (req, res) => {
    res.json({
        message: 'Excel Manager API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            info: '/info'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Info route
app.get('/info', (req, res) => {
    res.json({
        name: 'Excel Manager API',
        version: '1.0.0',
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message,
        timestamp: new Date().toISOString()
    });
});

// Start server
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Start time: ${new Date().toISOString()}`);
}).on('error', (err) => {
    console.error('Server failed to start:', err);
});