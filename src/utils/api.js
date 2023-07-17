import axios from "axios"

const instance = axios.create({
    baseURL: "https://nc-news-api-tts7.onrender.com/api/",
})

export const getArticles = () => {
    return instance.get("/articles").then(({ data }) => {
        return data.articles
    })
}
