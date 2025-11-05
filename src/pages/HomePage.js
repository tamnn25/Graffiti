import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductList } from "../components/ECommerce";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 bg-light d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold">AI Graffiti & Plants</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="btn btn-primary me-2" onClick={() => navigate("/")}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-success me-2" onClick={() => navigate("/ai-sketch")}>
                  AI Sketch
                </button>
              </li>
              <li className="nav-item">
                <button className="btn btn-warning me-2" onClick={() => navigate("/chat-public")}>
                  💬 Public Chat
                </button>
              </li>
              {/* <li className="nav-item">
                <button className="btn btn-info" onClick={() => navigate("/sale-plants")}>
                  🌿 Sale Plants
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      <ProductList />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
