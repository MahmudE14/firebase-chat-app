const getCurrentUserChats = (chats = [], currentUser) => {
    return chats.filter(chat => chat.users.includes(currentUser.email));
}

export default getCurrentUserChats;