/* 
* Function to start the bot.
*/

// imports 
const { welcomeMessage } = require('./messages');
const { registerUser } = require('./registerUser')

function start(bot, db) {
    bot.start((ctx) => {
        // Reply with a welcome message
        return ctx.reply(welcomeMessage, {
            reply_markup: {
                "force_reply": true
            }
        });
    });
    registerUser(bot, db);
}

// Exports
module.exports = {
    start
}