/* 
* Function to add a new user to the databsase.
*/


async function addUser(db, chatId, handle) {
    await db.ref('users/' + handle).set({
        chatId: chatId
    });
}

// exports
module.exports = {
    addUser
}
