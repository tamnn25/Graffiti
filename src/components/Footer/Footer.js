// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="text-uppercase">AI Graffiti & Plants</h5>
            <p className="small">
              Create, explore, and chat about AI-generated art and plants.
            </p>
          </div>

          <div className="col-md-4 mb-3 mb-md-0">
            <h6 className="text-uppercase">Contact</h6>
            <p className="small mb-1">📧 info@aigraffiti.com</p>
            <p className="small mb-1">📍 San Francisco, CA</p>
          </div>

          <div className="col-md-4">
            <h6 className="text-uppercase">Follow Us</h6>
            <a href="#" className="text-light me-3">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-light me-3">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="text-light">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>

        <hr className="border-secondary my-3" />
        <p className="small mb-0">
          © {new Date().getFullYear()} AI Graffiti & Plants — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
