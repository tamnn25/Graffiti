import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { processImage } from "../api/imageApi";

const AiSketchPage = () => {
  const [selectedApi, setSelectedApi] = useState("sketch");
  const [selectedFile, setSelectedFile] = useState(null);
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false);

  // All available API options
  const apiOptions = [
    { label: "🖊️ Pencil Sketch", value: "sketch" },
    { label: "👤 People Sketch", value: "sketch_people" },
    { label: "🧼 Remove Background", value: "remove_background" },
    { label: "✂️ Crop 3:4", value: "crop_3_4" },
    { label: "🎨 Graffiti Style", value: "graffiti" },
  ];

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResultImg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please upload an image first!");

    setLoading(true);
    try {
      const imgBase64 = await processImage(selectedFile, selectedApi);
      setResultImg(imgBase64);
    } catch (err) {
      console.error("Error processing image:", err);
      alert("⚠️ Error processing image. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        🎨 AI Image Transformation Studio
      </h2>

      {/* API selection */}
      <div className="mb-4 text-center">
        <label className="form-label fw-semibold">Choose Effect:</label>
        <select
          className="form-select w-auto d-inline-block ms-2"
          value={selectedApi}
          onChange={(e) => setSelectedApi(e.target.value)}
        >
          {apiOptions.map((api) => (
            <option key={api.value} value={api.value}>
              {api.label}
            </option>
          ))}
        </select>
      </div>

      {/* Upload form */}
      <form onSubmit={handleSubmit} className="text-center">
        <input
          type="file"
          className="form-control mb-3 w-50 mx-auto"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          className="btn btn-success btn-lg px-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Processing...
            </>
          ) : (
            "Generate"
          )}
        </button>
      </form>

      {/* Preview section */}
      <div className="row mt-5">
        <div className="col-md-6 text-center">
          <h5>📷 Original Image</h5>
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="original"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          ) : (
            <p className="text-muted">No image uploaded yet.</p>
          )}
        </div>

        <div className="col-md-6 text-center">
          <h5>🧠 Processed Image ({selectedApi.replace("_", " ")})</h5>
          {resultImg ? (
            <img
              src={resultImg}
              alt="result"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          ) : (
            <p className="text-muted">
              {loading
                ? "Generating result..."
                : "Result will appear here after processing."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiSketchPage;
