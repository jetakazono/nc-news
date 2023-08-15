import { Routes, Route } from 'react-router-dom';
import { Header, Articles, Article, Footer, Error, NewArticle, Loader } from "./components"
import { Toaster, toast } from 'react-hot-toast';
import { getTopics } from "../src/utils/index"
import { useEffect, useState } from 'react';

const toastOptions = {
  position: "bottom-center",
}

function App() {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [apiError, setApiError] = useState(null)

    useEffect(() => {
      getTopics().then((result) => {
          setTopics(result)
    setIsLoading(false)
      }).catch((err) => {
    toast.error('Sorry, topics currently unavailable.');
    setApiError(err)
  })
  }, [])

  if (apiError) {
		return <Error  
		errorStatus={apiError.response.status} 
		errorMessage={apiError.response.data.msg}/>
	} else if(isLoading) return <Loader />
	else {
    return (
      <>
    <Header topics={topics}/>
    <main className="wrapper py-4 md:py-8 mt-16">
      <Routes>
        <Route path="/:topic?" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/new-article" element={<NewArticle topics={topics} />} />
        <Route path="*" element={<Error  
            errorStatus={"404"} 
            errorMessage={"Sorry, We couldn't find what you are looking for!"}
            />} />
      </Routes>
    </main>
    <Toaster {...toastOptions}  />
    <Footer/>
    </>
  )
}
}

export default App
