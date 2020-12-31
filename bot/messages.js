/*
* Module to manage all the text replies the bot sends.
*/


welcomeMessage = "Hello! I am lockout bot. I conduct lockout matches using problems from codeforces. Let's first get you registered. Please send me your codeforces handle";
authMessage = "Great! Submit a compilation error within 90 seconds to the following problem with this handle to make me believe it's really you: "
authSuccessMessage = "Great! You are now registered with me! To challenge any of your registered freinds, just use the following command:- \n/match <handle-opponent> <rating-1> <rating-2> ... <rating-n> <duration>\nWhere, rating[1-n] is the difficulty of the 100, 200 ... n*100 points problem respectively and <duration> is the match duration in minutes(keep it a multiple of 5)."
authFailMessage = "Sorry, I couldn't authenticate you! :( \nLet's try again. Send me your handle."

// exports
module.exports = {
    welcomeMessage,
    authMessage,
    authSuccessMessage,
    authFailMessage
}