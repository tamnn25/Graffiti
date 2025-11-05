import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="card h-100 shadow-sm" onClick={() => navigate(`/product/${product.id}`)} style={{ cursor: "pointer" }}>
      <img src={product.image} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "contain" }} />
      <div className="card-body">
        <h6 className="card-title">{product.title}</h6>
        <p className="card-text text-success fw-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
