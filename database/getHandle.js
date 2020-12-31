/* 
* Function to get the handle of a chatId.
*/


async function getHandle(db, chatId) {
    var handle = 'USER NOT REGISTERED';
    await db.ref('users').orderByChild('chatId').equalTo(chatId).once('value').then(snapshot => {
        snapshot.forEach(data => {
            handle = data.key;
        })
    })
    return handle;
}

// exports
module.exports = {
    getHandle
}
