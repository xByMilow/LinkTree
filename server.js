const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const http = require('http');
const cookieParser = require('cookie-parser');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
var uglify = require('uglify-js');
var winston = require('winston');
var connect = require('connect');
var route = require('connect-route');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('Middleware active');
    next();
  });

  app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function initializeServer() {
    try {
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (error) {
        console.error('Failed to initialize server:', error);
        process.exit(1);
    }
}

initializeServer();
module.exports = router;
