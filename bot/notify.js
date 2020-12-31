/*
* Function to notify both the players about the current status of the match.
*/

function notify(bot, player, message) {
    bot.telegram.sendMessage(player.chatId, message);
}


// exports
module.exports = {
    notify
}