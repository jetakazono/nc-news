import { useContext, useState } from "react"
import { UserContext } from "../../contexts/User"
import { Select } from "../Select"
import { postNewArticle } from "../../utils"

export const NewArticle = ({ topics }) => {
    const { user } = useContext(UserContext) // "author": "icellusedkars",
    const [topic, setTopic] = useState(topics[0])
    const [newItem, setNewItem] = useState({
        title:"",
        topic: "",
        author: user.username,
        body: "",
        article_img_url: "",
    }) 

    const handleSelectChange = (key, value) => {
        const topicSelected = topics.find(topic => topic.slug === value.slug)
        setTopic(topicSelected)
        setNewItem({
            ...newItem,
            ["topic"] : topicSelected.slug
        })
    }

    const handleChangeInputsItem = (e) => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        postNewArticle(newItem).then((result) => {
            console.log(result);
        })
    }
    
    return <form onSubmit={handleSubmit} className="flex flex-col">
        <label
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600">
        <input
            value={newItem.title}
            name='title'
            onChange={handleChangeInputsItem}
            type="text"
            id="title"
            placeholder="Title"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Title</span>
        </label>
        <Select options={topics} label="Topics" name='topics' value={topic.slug} valueKey="slug" labelKey="slug" onChange={handleSelectChange}/>
        <label
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600">
        <input
            name='article_img_url'
            value={newItem.article_img_url}
            onChange={handleChangeInputsItem}
            type="url"
            id="article_img_url"
            placeholder="Image URL here"
            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"/>
        <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Image URL</span>
        </label>
        <textarea 
            name='body'
            value={newItem.body}
            className="border border-black" 
            onChange={handleChangeInputsItem}>
        </textarea>
        <button 
        // disabled={!newComment.length || isLoading} data-disabled={!newComment.length || isLoading}
            className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            value='post-comment'>
            Comment
        </button>
    </form>
}


/*
"article_id": 14,
"title": "test title",
"topic": "paper",
"author": "icellusedkars",
"body": "test body",
"created_at": "2023-06-30T09:53:19.522Z",
"votes": 0,
"article_img_url": "test article img url link"
*/