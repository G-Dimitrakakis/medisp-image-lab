import { useState } from "react";

document.body.style.backgroundColor = "#1a1a2e";
document.body.style.margin = "0";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState("");
  const [processedImageUrl, setProcessedImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setSelectedFile(null);
      setOriginalImageUrl("");
      setProcessedImageUrl("");
      return;
    }

    setSelectedFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setProcessedImageUrl("");
    setErrorMessage("");
  };

  const handleProcessImage = async () => {
    if (!selectedFile) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/process-image/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image processing failed.");
      }

      setProcessedImageUrl(`data:image/png;base64,${data.image}`);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const panelStyle = {
    flex: 1,
    minWidth: "280px",
    border: "1px solid #444466",
    borderRadius: "8px",
    padding: "12px",
    backgroundColor: "#16213e",
    color: "#e0e0e0",
  };

  const imageStyle = {
    width: "100%",
    maxHeight: "420px",
    objectFit: "contain",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    border: "1px solid #ececec",
  };

  return (
    <main
    style={{
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "'Inter', sans-serif",
    backgroundColor: "#1a1a2e",
    minHeight: "100vh",
    color: "#e0e0e0",
          }}
    >
    <h1 style={{ color: "#e94560" }}>Day 2 - Image Processing Demo</h1>
    <p>Upload an image to convert it to grayscale and apply Gaussian Blur using the Django API.</p>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px", flexWrap: "wrap" }}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button
        onClick={handleProcessImage}
        disabled={!selectedFile || isLoading}
        style={{
        padding: "10px 24px",
        backgroundColor: "#e94560",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "16px",
        }}
        >
        {isLoading ? "Processing..." : "Process Image"}
        </button>
      </div>

      {errorMessage && <p style={{ color: "#b00020" }}>{errorMessage}</p>}

      <section style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={panelStyle}>
          <h2 style={{ color: "#a0a0c0" }}>Original Image</h2>
          {originalImageUrl ? (
            <img src={originalImageUrl} alt="Original upload" style={imageStyle} />
          ) : (
            <p>Select an image to preview it here.</p>
          )}
        </div>

        <div style={panelStyle}>
          <h2 style={{ color: "#a0a0c0" }}>Processed Image (Grayscale + Blur)</h2>
          {processedImageUrl ? (
            <img src={processedImageUrl} alt="Processed grayscale output" style={imageStyle} />
          ) : (
            <p>Processed image will appear here.</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
