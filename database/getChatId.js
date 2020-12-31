/* 
* Function to get the chatId of a user.
*/


async function getChatId(db, handle) {
    await db.ref('users/' + handle).once('value')
    .then(snapshot => {
        chatId = (snapshot.val() && snapshot.val().chatId) || 'USER NOT FOUND';
    });
    return chatId;
}

// exports
module.exports = {
    getChatId
}
