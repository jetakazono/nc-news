import { Routes, Route } from 'react-router-dom';
import { Header, Articles, Article, Footer } from "./components"
function App() {
  return (
    <>
    <Header />
    <main className="wrapper py-4 md:py-8 mt-16">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/:topic" element={<Articles />} />
      </Routes>
    </main>
    <Footer/>
    </>
  )
}

export default App
