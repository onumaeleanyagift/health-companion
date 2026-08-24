import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";

function Topics() {
  return <h1>Topics</h1>;
}

function AskHealth() {
  return <h1>Ask a Question</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/ask" element={<AskHealth />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
