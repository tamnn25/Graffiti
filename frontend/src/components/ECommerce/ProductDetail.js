// src/components/ProductDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-4">Loading product...</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success">${product.price}</h4>
          <p>{product.description}</p>
          <p>
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
