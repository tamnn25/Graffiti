import axios from "axios";

// Base URL for FastAPI backend
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Uploads an image to a selected API endpoint (sketch, graffiti, etc.)
 * and returns a Base64-encoded image string.
 *
 * @param {File} file - The image file to upload.
 * @param {string} selectedApi - The endpoint name (e.g. "sketch", "remove_background").
 * @returns {Promise<string>} - Base64 image data.
 */
export const processImage = async (file, selectedApi) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(`${BASE_URL}/${selectedApi}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const base64 = response.data.sketch;
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
