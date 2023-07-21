import { Routes, Route } from 'react-router-dom';
import { Header, Articles, Article, Footer, Error } from "./components"
import { Toaster } from 'react-hot-toast';

const toastOptions = {
  position: "bottom-center",
}

function App() {
  return (
    <>
    <Header />
    <main className="wrapper py-4 md:py-8 mt-16">
      <Routes>
        <Route path="/:topic?" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="*" element={<Error  
            errorStatus={"4 0 4"} 
            errorMessage={"Sorry, We couldn't find what you are looking for!"}
        />} />
      </Routes>
    </main>
    <Toaster {...toastOptions}  />
    <Footer/>
    </>
  )
}

export default App
