import { Routes, Route } from 'react-router-dom';
import { Header, Articles, Article, Footer, Error } from "./components"
function App() {
  return (
    <>
    <Header />
    <main className="wrapper py-4 md:py-8 mt-16">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/:topic" element={<Articles />} />
        <Route path="*" element={<Error  
            errorStatus={"4 0 4"} 
            errorMessage={"Sorry, We couldn't find what you are looking for!"}
        />} />
      </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App
