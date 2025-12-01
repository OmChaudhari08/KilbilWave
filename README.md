# kilbilWave

## kilbilWave – Bird Sound Classification System

KilbilWave is a machine learning–based system that identifies bird species from short audio clips.
It includes a FastAPI backend for audio processing and prediction, and a React frontend for interaction and visualization.

This project was built end-to-end, including data preprocessing, feature extraction, model training, backend API development, and frontend interface.

---

## Features

- Classifies bird species from 3-second audio clips
- Audio preprocessing with silence trimming
- MFCC and spectral feature extraction
- Random Forest classification model
- FastAPI backend for real-time prediction
- React frontend with a modern user interface
- Supports .wav audio uploads

---

### Project structure

```
project-root/
│── backend/
│     ├── main.py
│     ├── audio_utils/
│     │      └── preprocess.py
│     ├── model/
│     │      ├── random_forest_bird_model.pkl
│     │      └── label_encoder.pkl
│     ├── requirements.txt
│── frontend/
│     ├── src/App.js
│     ├── public/
│     ├── package.json
│── model_file/
│     └── main.ipynb
│── README.md
```

---

## Model Information

The classification model is built using the RandomForestClassifier from scikit-learn.

### Features used:

- 13 MFCC means
- 13 MFCC standard deviations
- Spectral centroid (mean and std)
- Spectral bandwidth (mean and std)
- Spectral rolloff (mean and std)
- Zero crossing rate (mean and std)

Total features: 32

### Model accuracy:

Approximately 91% on the test dataset.

---

## Running the Backend

Navigate to the backend folder:

```markdown
cd backend
```

Create and activate a virtual environment:

```markdown
python -m venv .venv
source .venv/bin/activate
```

Install backend dependencies:

```markdown
pip install -r requirements.txt

```

Start FastAPI server:

```markdown
uvicorn main:app --reload

```

The API will be available at:

```markdown
[http://localhost:8000](http://localhost:8000/)
[http://localhost:8000/docs](http://localhost:8000/docs)
```

---

## Running the Frontend

Navigate to the frontend folder:

```markdown
cd frontend
```

Install dependencies:

```markdown
npm install
```

Start development server:

```markdown
npm start
```

The application interface will be available at:

```
http://localhost:3000

```

---

## API Endpoint

### POST /predict

Uploads a `.wav` audio file and returns the predicted species and confidence score.

Example response:

```json
{
  "species": "Northern Cardinal",
  "confidence": 92.14
}

```

---

## Notes

- The backend expects `.wav` files.
- Audio longer than 3 seconds will be trimmed to the most active segment.
- Audio shorter than 3 seconds will be padded with silence.