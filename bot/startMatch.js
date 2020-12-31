/* 
* Function to start the match.
*/

// imports 
const { getChatId } = require('./../database/getChatId')
const { getHandle } = require('./../database/getHandle')
const { getProblemSet } = require('./../codeforces/getProblemSet')
const { conductMatch } = require('./conductMatch');
const { sendChallenge } = require('./sendChallenge');
const { notify } = require('./notify');

function startMatch(bot, db) {
    bot.hears(/\/match\s\w*(\s\d*)+/, async ctx => {
        const message = (ctx.update.message.text).split(' ');
        const opponentHandle = message[1];
        const ownChatId = ctx.update.message.chat.id
        const ownHandle = await getHandle(db, ownChatId);
        var ratings = message.slice(2, message.length - 1);
        const duration = message[message.length - 1] * 12;
        const problemsCount = message.length - 3;
        const opponentChatId = await getChatId(db, opponentHandle);
        await getProblemSet(ownHandle, opponentHandle, ratings)
        .then(problemSet => {
            own = {
                handle: ownHandle,
                chatId: ownChatId
            }
            opponent = {
                handle: opponentHandle,
                chatId: opponentChatId
            }
            sendChallenge(bot, opponent, own, duration, ratings).then(async accepted => {
                if (accepted) {
                    notify(bot, own, 'The opponent accepted your challenge! Starting the match now. GLHF');
                    notify(bot, opponent, 'Starting the match now. GLHF');
                    var problemsStr = "Problems:\n";
                    problemSet.forEach((element, index, array) => {
                        problemsStr += `${(index + 1) * 100}: ${element.problem_link}\n`
                    });
                    notify(bot, own, problemsStr);
                    notify(bot, opponent, problemsStr);
                    await conductMatch(bot, own, opponent, problemSet, duration).then(winner => {
                        if (winner == 1) {
                            notify(bot, own, `${own.handle} has won the match!`);
                            notify(bot, opponent, `${own.handle} has won the match!`);
                        } else if (winner == 2) {
                            notify(bot, own, `${opponent.handle} has won the match!`);
                            notify(bot, opponent, `${opponent.handle} has won the match!`);
                        } else {
                            notify(bot, own, `It was a draw!`);
                            notify(bot, opponent, `It was a draw!`);
                        }
                    });
                } else {
                    notify(bot, own, 'The opponent rejected your challenge!');
                }
            })
        });
    });
}

// Exports
module.exports = {
    startMatch
}