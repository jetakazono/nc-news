import axios from "axios"

const instance = axios.create({
    baseURL: "https://nc-news-api-tts7.onrender.com/api",
})

export const getArticles = (topic, sort_by, order) => {
    // const { sortBy, order } = filters
    // let baseURL = `/articles?`

    // if (topic) {
    //     baseURL += `topic=${topic}&`
    // }
    // if (filters.sortBy) {
    //     baseURL += `sort_by=${filters.sortBy}&`
    // }
    // if (filters.order) {
    //     baseURL += `order=${filters.order}`
    // }

    // return instance.get(baseURL).then(({ data }) => data.articles)

    return instance
        .get(`/articles`, { params: { topic, sort_by, order } })
        .then(({ data: { articles } }) => {
            return articles
        })
}

export const getArticleById = (article_id) => {
    return instance.get(`/articles/${article_id}`).then(({ data }) => {
        return data.article
    })
}

export const getTopics = () => {
    return instance.get(`/topics/`).then(({ data }) => {
        return data.topics
    })
}

export const getUsers = () => {
    return instance.get(`/users`).then(({ data }) => {
        return data.users
    })
}

export const getCommentsByArticleId = (article_id) => {
    return instance.get(`/articles/${article_id}/comments`).then(({ data }) => {
        return data.comments
    })
}

export const patchVotes = (comment_id, article_id, vote) => {
    const votes = vote === "like" ? 1 : -1

    if (comment_id)
        return instance.patch(`/comments/${comment_id}`, { inc_votes: votes })

    return instance.patch(`/articles/${article_id}`, { inc_votes: votes })
}

export const postNewCommentForAnArticle = (article_id, username, body) => {
    return instance
        .post(`articles/${article_id}/comments`, {
            username: username,
            body: body,
        })
        .then(({ data }) => {
            return data.comment
        })
}

export const deleteUserComment = (comment_id) => {
    return instance.delete(`/comments/${comment_id}`)
}

export const getUserByUserName = (username) => {
    return instance.get(`/users/${username}`).then(({ data }) => {
        return data.user
    })
}

export const postNewArticle = ({title, topic, author, body, article_img_url} ) => {
    return instance
        .post(`/articles`, {
            title: title,
            topic: topic,
            author: author,
            body: body,
            article_img_url: article_img_url
        })
        .then(({ data }) => {
            return data.article
        })
}

