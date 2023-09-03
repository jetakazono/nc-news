import { useContext, useState } from "react"
import { UserContext } from "../../contexts/User"
import { postNewArticle } from "../../utils"
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import {Editor} from "../index"

export const NewArticle = ({ topics }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (data) => {
            setIsLoading(true)
            postNewArticle({author: user.username, ...data})
            .then((result)=> {
                toast.success("Article published successfully!", {
                    position:"top-center"
                })
                navigate(`/articles/${result.article_id}`)
            }).catch((error) => {
                console.log(error)
            })
            setIsLoading(false)
    }
    
    return <section className="h-full bg-gray-100 rounded-md bg-opacity-40 border border-gray-200">
        <h2 className="text-2xl p-5">New article</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 justify-center p-5 h-96 mb-5">
        <div>
            <label
                className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm">
                <input
                    {...register("title", { required: true, minLength: 3 })}
                    name='title'
                    type="text"
                    id="title"
                    placeholder="Title"
                    className="peer h-8 w-full border-none bg-white p-0 placeholder-transparent focus:border-transparent focus:outline-none sm:text-sm"/>
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Title</span>
            </label>
            {errors.title && <span className="text-red-700 italic text-xs">Title is required</span>}
        </div>
        <div className="grid grid-cols-2 gap-5">
            <div>
                <select 
                    {...register("topic", { required: true})} 
                    className={`h-12 w-full cursor-pointer outline-none border rounded-lg border-gray-200 text-sm px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-primary focus:ring-primary focus:text-primary`} >
                <option value="" key="init">Select a topic</option>
                { topics.map((topic) => <option key={topic.slug} value={topic.slug}>
                    {topic.slug}
                </option>)}
            </select>
                {errors.topic && <span className="text-red-800 italic text-xs">Please pick a topic.</span>}
            </div>

            <div>
                <label
                    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm">
                <input
                    {...register("article_img_url", { required: true})}
                    type="url"
                    id="article_img_url"
                    placeholder="Image URL here"
                    className="peer h-8 w-full border-none bg-white p-0 placeholder-transparent focus:border-transparent focus:outline-none sm:text-sm"/>
                <span
                    className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">Image URL</span>
                </label>
                {errors.article_img_url && <span className="text-red-800 italic text-xs text-right">don't forget your image!</span>}
            </div>
        </div>
        {/* <textarea 
            {...register("body", { required: true})}
            placeholder="Tell your story..."
            name='body'
            className="border border-gray-200 h-40 rounded-md focus:outline-none p-2" 
            >
        </textarea> */}
        <Editor {...register("body", { required: true})} />
            {errors.body && <span className="text-red-800 italic text-xs">hmm, looks like you forgot to write yor article.</span>}
        <button type="submit"
            disabled={isLoading} data-disabled={isLoading}
            className="data-[disabled=true]:cursor-not-allowed text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg text-sm px-10 py-2.5 text-center self-center"
        >
        Publish
        </button>
    </form>
    </section>
}