// Imports
const { Telegraf } = require('telegraf');
const { start  } = require('./bot/start');
const { startMatch } = require('./bot/startMatch');
const { db } = require('./database/initDB');

// initialize the bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// init functions
start(bot, db);
startMatch(bot, db);

bot.launch();