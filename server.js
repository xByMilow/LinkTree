const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const http = require('http');
const cookieParser = require('cookie-parser');
const router = express.Router();
const mysql = require('mysql2/promise');
const crypto = require('crypto');
let db;
const path = require('path');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const { Client, GatewayIntentBits } = require('discord.js');
var uglify = require('uglify-js');
var winston = require('winston');
var connect = require('connect');
var route = require('connect-route');

const app = express();
const PORT = 8000;
const DISCORD_TOKEN = '';
const GUILD_ID = '';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

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

let serverInfo = { members: 0, online: 0, offline: 0 };

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await updateServerInfo();
});

async function updateServerInfo() {
    try {
        const guild = await client.guilds.fetch(GUILD_ID);
        const members = await guild.members.fetch();
        serverInfo.members = members.size;
        serverInfo.online = members.filter(m => m.presence?.status === 'online').size;
        serverInfo.offline = members.filter(m => !m.presence || m.presence.status === 'offline').size;
    } catch (error) {
        console.error('Error fetching server info:', error);
    }
}

setInterval(updateServerInfo, 1000);

app.get('/api/server/', (req, res) => {
    res.json(serverInfo);
});

client.login(DISCORD_TOKEN);

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
