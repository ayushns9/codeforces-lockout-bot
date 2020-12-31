/*
* Function to send the challenge to opponent.
*/

// imports
const { notify } = require("./notify")

function sendChallenge(bot, opponent, own, duration, ratings) {
    notify(bot, opponent, `${own.handle} has challenged you with a lockout match of ${duration} minutes and the following rating difficulties for the 100, 200 ... n*100 points problems respectively:\n${ratings.toString()}`);
    notify(bot, opponent, 'Send a /accept command within the next 90 seconds to accept the match or /decline to decline.');
    accepted = false;
    return new Promise((resolve, reject) => {
        var counter = 0;
        timer = setInterval(() => {
            bot.hears('/accept', ctx => {
                accepted = true;
                clearInterval(timer);
                resolve(accepted);
            })
            
            bot.hears('/decline', ctx => {
                clearInterval(timer);
                resolve(accepted);
            })

            if (counter >= 90) {
                clearInterval(timer);
                resolve(accepted);
            }
            ++counter;
        }, 1000);
    })
   
}

// exports
module.exports = {
    sendChallenge
}