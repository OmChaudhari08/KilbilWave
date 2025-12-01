
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a .wav file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">🐦 Bird Sound Classifier</h1>

      <div className="card glass">
        <input type="file" accept=".wav" onChange={handleFileChange} className="file-input" />

        <button onClick={handleUpload} className="btn" disabled={loading}>
          {loading ? "Analyzing..." : "Predict Bird"}
        </button>

        {loading && <div className="loader"></div>}

        {result && (
          <div className="result">
            <h2 className="species">
              {result.species}
            </h2>

            <div className="circle">
              <div
                className="circle-fill"
                style={{ "--percent": result.confidence + "%" }}
              ></div>
              <span className="circle-text">{result.confidence}%</span>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
