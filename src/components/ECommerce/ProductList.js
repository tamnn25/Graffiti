// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../api/productApi";

const ProductList = () => {
  const [products, setProducts] = useState([]); // <-- initialize as empty array

  useEffect(() => {
    getProducts().then((data) => {
      console.log("Fetched products:", data); // debug
      if (Array.isArray(data)) setProducts(data);
    });
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">🌿 Plants on Sale</h2>
      <div className="row g-4">
        {products.length === 0 ? (
          <p className="text-center text-muted">No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
