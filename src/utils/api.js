import axios from "axios"

const instance = axios.create({
    baseURL: "https://nc-news-api-tts7.onrender.com/api/",
})

export const getArticles = (topic, filters) => {
    const { sortBy, order } = filters
    let baseURL = `/articles?`

    if (topic) {
        baseURL += `topic=${topic}&`
    }
    if (sortBy) {
        baseURL += `sort_by=${sortBy}&`
    }
    if (order) {
        baseURL += `order=${order}`
    }
    return instance.get(baseURL).then(({ data }) => {
        return data.articles
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
