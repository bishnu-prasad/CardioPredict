<img width="2913" height="1737" alt="Image 06-04-26 at 4 29 PM" src="https://github.com/user-attachments/assets/40e4a77e-fa8c-4ee3-99c0-c5b2e1e9cb5a" />
CardioPredict
AI-Assisted Heart Disease Risk Prediction Platform
CardioPredict is a full-stack machine learning application designed to estimate heart disease risk from patient health and cardiac parameters.
The system combines a trained machine learning model with a FastAPI backend and a React-based frontend to provide an interactive prediction experience.
Disclaimer: CardioPredict is an educational and research project. It is not a medical diagnostic system and should not be used as a substitute for professional medical advice.
Live Application
Open CardioPredict
Overview
CardioPredict allows users to enter relevant cardiac and clinical parameters and receive a machine-learning-based heart disease risk prediction.
The application follows a simple pipeline:
Patient Health Data
        ↓
React Frontend
        ↓
FastAPI REST API
        ↓
Trained ML Model
        ↓
Prediction + Probability
        ↓
Risk Visualization

Problem Statement
Cardiovascular disease remains one of the leading global causes of mortality. Early identification of cardiac risk factors can assist in proactive lifestyle changes and timely medical consultations. CardioPredict offers a streamlined tool to process patient clinical indicators and estimate risk probability instantly.
Features
⚬ Interactive Risk Form: Modern UI for capturing clinical indicators and biological metrics.
⚬ FastAPI Backend: Asynchronous REST service validating payloads via Pydantic and executing model inference.
⚬ Machine Learning Engine: Trained classification pipeline using feature scaling and model inference.
⚬ Probability Scoring: Returns estimated probability percentages alongside high/low risk categorization.
⚬ Responsive Interface: Designed for accessibility across desktop and mobile screens.
Machine Learning
Dataset & Input Features
The machine learning model processes 13 clinical indicators:
1. Age (age): Patient age in years.
2. Sex (sex): Biological sex (1 = male, 0 = female).
3. Chest Pain Type (cp): ⚬ 0: Typical angina ⚬ 1: Atypical angina ⚬ 2: Non-anginal pain ⚬ 3: Asymptomatic
4. Resting Blood Pressure (trestbps): Resting blood pressure (in mm Hg).
5. Serum Cholesterol (chol): Serum cholesterol (in mg/dl).
6. Fasting Blood Sugar (fbs): Fasting blood sugar > 120 mg/dl (1 = true, 0 = false).
7. Resting Electrocardiographic Results (restecg): ⚬ 0: Normal ⚬ 1: Having ST-T wave abnormality ⚬ 2: Showing probable or definite left ventricular hypertrophy
8. Maximum Heart Rate Achieved (thalach): Maximum heart rate during exercise.
9. Exercise-Induced Angina (exang): Exercise-induced angina (1 = yes, 0 = no).
10. ST Depression (oldpeak): ST depression induced by exercise relative to rest.
11. Slope of Peak Exercise ST Segment (slope): ⚬ 0: Upsloping ⚬ 1: Flat ⚬ 2: Downsloping
12. Number of Major Vessels (ca): Major vessels (0–3) colored by fluoroscopy.
13. Thalassemia (thal): ⚬ 1: Normal ⚬ 2: Fixed defect ⚬ 3: Reversible defect
Target Variable
⚬ Target (target): ⚬ 0: Low Risk (Absence of heart disease) ⚬ 1: High Risk (Presence of heart disease)
Model Pipeline
⚬ Preprocessing: Feature standardization via StandardScaler.
⚬ Classification Models: Supervised algorithms (Logistic Regression, Support Vector Classifier, Random Forest, Decision Tree).
⚬ Serialization: Saved as pre-trained model artifacts using joblib / pickle.
System Architecture
+-----------------------+
|    React Frontend     |
|   (UI Component /     |
|    Form State)        |
+-----------------------+
            |
            | HTTP POST request
            v
+-----------------------+
|    FastAPI Backend    |
| (Pydantic Schema /    |
|   CORS Middleware)    |
+-----------------------+
            |
            | Load model & scale
            v
+-----------------------+
|  Scikit-Learn Engine  |
|  (Inference / Risk    |
|   Probability)        |
+-----------------------+

API Documentation
Health Check
⚬ Endpoint: GET /
⚬ Response:
{
  "status": "healthy",
  "message": "CardioPredict API is running"
}

Predict Heart Disease Risk
⚬ Endpoint: POST /predict
⚬ Request Body:
{
  "age": 52,
  "sex": 1,
  "cp": 0,
  "trestbps": 125,
  "chol": 212,
  "fbs": 0,
  "restecg": 1,
  "thalach": 168,
  "exang": 0,
  "oldpeak": 1.0,
  "slope": 2,
  "ca": 2,
  "thal": 3
}

⚬ Response Body:
{
  "prediction": 1,
  "risk_status": "High Risk",
  "probability": 0.85
}

Project Structure
CardioPredict/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── schema.py
│   │   └── utils/
│   │       └── model_loader.py
│   ├── models/
│   │   ├── model.pkl
│   │   └── scaler.pkl
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │       └── api.js
│   └── package.json
├── notebooks/
│   └── model_training.ipynb
├── .gitignore
└── README.md

Installation & Setup
Prerequisites
⚬ Python 3.9+
⚬ Node.js 18+ and npm
⚬ Git
1. Clone Repository
git clone https://github.com/bishnu-prasad/CardioPredict.git
cd CardioPredict

2. Backend Setup
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

Backend server runs at http://localhost:8000 (API Docs available at http://localhost:8000/docs).
3. Frontend Setup
cd ../frontend
npm install
npm run dev

Frontend runs locally at http://localhost:3000 or http://localhost:5173.
Deployment
⚬ Frontend: Deployed on Vercel
⚬ Backend: Deployed on Render / cloud host serving the FastAPI server
Limitations
⚬ Trained on public reference datasets; requires clinical validation prior to diagnostic use.
⚬ Evaluates discrete numerical parameters without considering real-time patient ECG waveforms or family history.
Author
Bishnu Prasad
⚬ GitHub: @bishnu-prasad
License
This project is licensed under the MIT License.
