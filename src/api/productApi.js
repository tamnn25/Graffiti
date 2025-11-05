// src/api/productApi.js
import { ENDPOINTS } from "./enums";

// Fetch all products
export const getProducts = async () => {
  try {
    const res = await fetch(ENDPOINTS.GET_PRODUCTS);
    if (!res.ok) {
      console.error("Failed to fetch products:", res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const res = await fetch(ENDPOINTS.ADD_PRODUCT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      console.error("Failed to add product:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error adding product:", err);
    return null;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${ENDPOINTS.GET_PRODUCTS}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product detail");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};