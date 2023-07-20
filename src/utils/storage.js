export const getItem = (key) => {
    const storage = localStorage.getItem(key)
    return storage ? JSON.parse(storage) : null
}
export const addItem = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value))
export const removeItem = (key) => localStorage.removeItem(key)

export const addVote = (action, user, articleId, commentId) => {
    const key = "user"
    const storage = getItem(key)
    const section = "comments" // or articles

    const voteObj = (voteAction) =>
        action === voteAction ? { [articleId]: [commentId] } : {}

    const userObj = [
        {
            user,
            comments: {
                like: voteObj("like"),
                dislike: voteObj("dislike"),
            },
        },
    ]

    if (!storage) return addItem(key, userObj)

    const userExist = () => storage.find((item) => item.user === user)
    const articleExist = () => userExist()[section][action][articleId]

    if (userExist()) {
        if (articleExist()) {
            articleExist().push(parseInt(commentId))
        } else {
            userExist()[section][action][articleId] = [commentId]
        }

        addItem(key, storage)
    }

    /* TO DO: 
    - Implement same logic to main Article
    - Implement remove items from storage
    - Apply current storage to react state
     */
}
