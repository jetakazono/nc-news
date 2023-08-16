import { useContext, useState } from "react"
import { UserContext } from "../../contexts/User"
import { Select } from "../Select"
import { postNewArticle } from "../../utils"
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';

export const NewArticle = ({ topics }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [formNewArticle, setFormNewArticle] = useState({
        title:"",
        topic: "",
        author: user.username,
        body: "",
        article_img_url: "",
    }) 
    const initOption = { slug: "Select a topic", description: "" }
    const topicOptions = [ initOption, ...topics]
    const handleSelectChange = (key, value) => {
        const topicSelected = topicOptions.find(topic => topic.slug === value.slug)
        setFormNewArticle({
            ...formNewArticle,
            ['topic'] : topicSelected.slug
        })
    }

    const handleChangeInputsItem = (e) => {
        setFormNewArticle({
            ...formNewArticle,
            [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        
        if(!formNewArticle.title.length || typeof formNewArticle.title !== "string") {
            toast.error("please give a title for your article.", {
                position:"top-center"
            })
        } else if(formNewArticle.topic === "Select a topic" || !formNewArticle.topic) {
            toast.error("please pick a topic.", {
                position:"top-center"
            })
        } else if(!formNewArticle.article_img_url.length || typeof formNewArticle.article_img_url !== "string") {
            toast.error("don't forget your image!", {
                position:"top-center"
            })
        } else if(!formNewArticle.body.length || typeof formNewArticle.body !== "string") {
            toast.error("hmm, looks like you forgot to write yor article.", {
                position:"top-center"
            })
        } else{
            setIsLoading(true)
                postNewArticle(formNewArticle)
            .then((result)=> {
                console.log(result)
                toast.success("Article published successfully!", {
                    position:"top-center"
                })
                setFormNewArticle({
                    title:"",
                    topic: initOption.slug,
                    author: user.username,
                    body: "",
                    article_img_url: ""
                })
                navigate(`/articles/${result.article_id}`)
            }).catch((error) => {
                console.log(error)
            })
            setIsLoading(false)
        }
    }
    
    return <section className="h-full bg-gray-100 rounded-md bg-opacity-40 border border-gray-200">
    <h2 className="text-2xl p-5">New article</h2>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center p-5 h-96 mb-5">
        <label
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm">
        <input
            
            value={formNewArticle.title}
            name='title'
            onChange={handleChangeInputsItem}
            type="text"
            id="title"
            placeholder="Title"
            className="peer h-8 w-full border-none bg-white p-0 placeholder-transparent focus:border-transparent focus:outline-none sm:text-sm"/>
        <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Title</span>
        </label>
        <div className="grid grid-cols-2">
        <Select className='h-12 w-full' options={topicOptions} name='topics' value={topicOptions[0].slug} valueKey="slug" labelKey="slug" onChange={handleSelectChange}/>
        <label
            className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm">
        <input
            name='article_img_url'
            value={formNewArticle.article_img_url}
            onChange={handleChangeInputsItem}
            type="url"
            id="article_img_url"
            placeholder="Image URL here"
            className="peer h-8 w-full border-none bg-white p-0 placeholder-transparent focus:border-transparent focus:outline-none sm:text-sm"/>
        <span
            className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Image URL</span>
        </label>
        </div>
        <textarea 
            placeholder="Tell your story..."
            name='body'
            value={formNewArticle.body}
            className="border border-gray-200 h-40 rounded-md focus:outline-none  p-2" 
            onChange={handleChangeInputsItem}>
        </textarea>
        <button 
        disabled={isLoading} data-disabled={isLoading}
            className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-10 py-2.5 text-center self-center"
            value='post-comment'>
        Publish
        </button>
    </form>
    </section>
}