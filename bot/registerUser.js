/* 
* Function to register a new user.
*/

// imports 
const { welcomeMessage, authMessage, authSuccessMessage, authFailMessage } = require('./messages');
const { checkCompError } = require('../codeforces/checkCompError')
const { randomProblemAny } = require('./../codeforces/randomProblemAny');
const { addUser } = require('./../database/addUser')

async function registerUser(bot, db) {
    bot.hears(/^\w*$/, async ctx => {
        handle = ctx.update.message.text;
        replied_to = ctx.update.message.reply_to_message.text;
        if (replied_to == welcomeMessage || replied_to == authFailMessage) {
            // Authenticate the new user
            const problem = await randomProblemAny();
            ctx.reply(authMessage + problem.problem_link);
            checkCompError(handle, problem, 90)
            .then(async auth => {
                if (auth) {
                    await addUser(db, ctx.update.message.chat.id, handle);
                    ctx.reply(authSuccessMessage);
                } else {
                    return ctx.reply(authFailMessage, {
                        reply_markup: {
                            "force_reply": true
                        }
                    });
                }
            })
        }
    });
}

// Exports
module.exports = {
    registerUser
}