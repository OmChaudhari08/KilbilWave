// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setResult(null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a .wav file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/predict",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setResult(res.data);

//     } catch (err) {
//       console.error(err);
//       alert("Prediction failed.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Bird Sound Classifier</h1>

//       <div style={styles.card}>
//         <input type="file" accept=".wav" onChange={handleFileChange} />

//         <button onClick={handleUpload} style={styles.button} disabled={loading}>
//           {loading ? "Analyzing..." : "Predict Bird"}
//         </button>

//         {loading && <div style={styles.spinner}></div>}

//         {result && (
//           <div style={styles.result}>
//             <h2>Species: <span style={styles.highlight}>{result.species}</span></h2>

//             <p>Confidence: <strong>{result.confidence}%</strong></p>

//             <div style={styles.progressWrapper}>
//               <div
//                 style={{
//                   ...styles.progressBar,
//                   width: `${result.confidence}%`,
//                 }}
//               ></div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     fontFamily: "sans-serif",
//     padding: "30px",
//     display: "flex",
//     justifyContent: "center",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   card: {
//     padding: "20px",
//     width: "350px",
//     borderRadius: "10px",
//     background: "#f5f5f5",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   },
//   button: {
//     marginTop: "15px",
//     padding: "10px 20px",
//     background: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
//   spinner: {
//     margin: "10px auto",
//     border: "4px solid #ddd",
//     borderTop: "4px solid #4CAF50",
//     borderRadius: "50%",
//     width: "30px",
//     height: "30px",
//     animation: "spin 1s linear infinite",
//   },
//   result: {
//     marginTop: "20px",
//   },
//   highlight: {
//     color: "#4CAF50",
//   },
//   progressWrapper: {
//     marginTop: "10px",
//     width: "100%",
//     height: "10px",
//     background: "#ddd",
//     borderRadius: "5px",
//   },
//   progressBar: {
//     height: "100%",
//     background: "#4CAF50",
//     borderRadius: "5px",
//   },
// };

// // Little spinner animation
// const styleSheet = document.styleSheets[0];
// styleSheet.insertRule(`
// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }`, styleSheet.cssRules.length);

// export default App;
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
