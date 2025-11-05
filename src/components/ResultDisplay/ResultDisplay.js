import React from "react";

const ResultDisplay = ({ resultUrl }) => {
  if (!resultUrl) return null;

  return (
    <div className="mt-3">
      <img
        src={resultUrl}  // <-- now this works
        alt="Sketch"
        style={{
          maxWidth: "100%",
          borderRadius: "12px",
          border: "2px solid #ccc",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}
      />
    </div>
  );
};

export default ResultDisplay;
