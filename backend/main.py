from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import uvicorn

import joblib
from pathlib import Path
import os

from audio_utils.preprocessing import preprocess_for_model


# 1. Create the FastAPI app
app = FastAPI()

# 2. Enable CORS (React frontend will need this)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you will tighten this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load model + label encoder (we will fill this later)
model_path = Path("model/random_forest_bird_model2.pkl")
scaler_path = Path("model/feature_scaler.pkl")
encoder_path = Path("model/label_encoder.pkl")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
label_encoder = joblib.load(encoder_path)


# 4. Prediction endpoint (we will fill inside later)
@app.post("/predict")
async def predict_audio(file: UploadFile = File(...)):
    # Save temp wav
    temp_path = "temp_audio.wav"
    with open(temp_path, "wb") as f:
        f.write(await file.read())
    
    features = preprocess_for_model(temp_path)
    features = np.array(features).reshape(1, -1)

 
    proba = model.predict_proba(features)[0]

  
    pred_idx = np.argmax(proba)

 
    species = label_encoder.inverse_transform([pred_idx])[0]
    confidence = round(float(proba[pred_idx]) * 100,2)

 
    os.remove(temp_path)

    return {"species": species, "confidence": confidence}



# 5. If running locally
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
