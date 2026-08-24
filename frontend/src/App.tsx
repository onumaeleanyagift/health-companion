import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Topics from "./pages/Topics";
import TopicArticles from "./pages/TopicArticles";
import ArticlePage from "./pages/ArticlePage";
import AskHealth from "./pages/AskHealth";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicId" element={<TopicArticles />} />
          <Route path="/articles/:articleId" element={<ArticlePage />} />
          <Route path="/ask" element={<AskHealth />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
