import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, AiSketchPage, SalePlantsPage } from "./pages";
import PublicChat from './components/ChatConsole';
import { ProductDetail } from './components/ECommerce';
import { Chat } from './components/ChatConsole';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ai-sketch" element={<AiSketchPage />} />
        <Route path="/chat-public" element={<PublicChat />} />
        <Route path="/sale-plants" element={<SalePlantsPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/chat" element={<Chat /> }/>
      </Routes>
    </Router>
  );
}

export default App;
