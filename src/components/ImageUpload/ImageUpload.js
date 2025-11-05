import React, { useState } from "react";

const ImageUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    onFileSelect(file);

    // Create a local URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-3">
      <input
        type="file"
        accept="image/*"
        className="form-control"
        onChange={handleChange}
      />

      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "12px",
              border: "2px solid #ccc",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
