import axios from "axios"

const instance = axios.create({
    baseURL: "https://nc-news-api-tts7.onrender.com/api/",
})

export const getArticles = (topic) => {
    if (topic) {
        return instance.get(`/articles?topic=${topic}`).then(({ data }) => {
            return data.articles
        })
    }

    return instance.get("/articles").then(({ data }) => {
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
