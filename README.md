# ❤️ CardioPredict

### AI-Assisted Heart Disease Risk Prediction Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-CardioPredict-00C853?style=for-the-badge)](https://cardio-predict-ten.vercel.app/)
[![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=flat-square\&logo=python\&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=flat-square\&logo=fastapi\&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square\&logo=react\&logoColor=black)](https://react.dev/)
[![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=flat-square\&logo=scikit-learn\&logoColor=white)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**CardioPredict** is a full-stack machine learning application that estimates heart disease risk from clinical and cardiac parameters.

It combines a trained **Scikit-learn machine learning model**, **FastAPI REST API**, and **React frontend** to provide an interactive risk prediction experience.

> ⚠️ **Medical Disclaimer:** CardioPredict is an educational and research project. It is **not a medical diagnostic system** and should not be used as a substitute for professional medical advice, diagnosis, or treatment.

---

## 🌐 Live Demo

### 🚀 [Open CardioPredict](https://cardio-predict-ten.vercel.app/)

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [System Architecture](#-system-architecture)
* [Machine Learning](#-machine-learning)
* [Input Features](#-input-features)
* [Project Structure](#-project-structure)
* [Prerequisites](#-prerequisites)
* [Installation](#-installation)

  * [Clone Repository](#1-clone-the-repository)
  * [Windows](#2-windows)
  * [macOS](#3-macos)
  * [Linux](#4-linux)
  * [Frontend Setup](#5-frontend-setup)
* [Running the Application](#-running-the-application)
* [API Documentation](#-api-documentation)
* [API Example](#-api-example)
* [Deployment](#-deployment)
* [Limitations](#-limitations)
* [Future Improvements](#-future-improvements)
* [Author](#-author)
* [License](#-license)

---

# 📌 Overview

Cardiovascular disease is one of the major causes of mortality worldwide. Early identification of important risk factors can support preventive health awareness and encourage timely medical consultation.

**CardioPredict** provides an interactive platform where users can enter selected clinical parameters and receive a machine-learning-based prediction.

### Prediction Pipeline

```text
┌──────────────────────────┐
│     Patient Health Data  │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      React Frontend      │
│   Form + Visualization   │
└────────────┬─────────────┘
             │
             │ HTTP POST
             ▼
┌──────────────────────────┐
│      FastAPI Backend     │
│  Pydantic + REST API     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    Feature Standardizer  │
│      StandardScaler      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    Scikit-learn Model    │
│       Prediction         │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Prediction + Probability │
│       Risk Result        │
└──────────────────────────┘
```

---

# ✨ Features

### 🩺 Interactive Risk Assessment

Users can enter 13 clinical and cardiac parameters through an interactive frontend form.

### ⚡ FastAPI Backend

A lightweight REST API handles:

* Request validation
* Feature processing
* Model loading
* Prediction
* Probability calculation
* API responses

### 🤖 Machine Learning

The project uses supervised machine learning algorithms for heart disease classification.

Models explored include:

* Logistic Regression
* Support Vector Classifier
* Random Forest
* Decision Tree

### 📊 Probability Prediction

The API returns both:

* Predicted class
* Estimated probability
* Risk status

Example:

```json
{
  "prediction": 1,
  "risk_status": "High Risk",
  "probability": 0.85
}
```

### 📱 Responsive UI

The frontend is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       User           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │                      │
                    │  Form / UI / Result  │
                    └──────────┬───────────┘
                               │
                         HTTP Request
                               │
                               ▼
                    ┌──────────────────────┐
                    │   FastAPI Backend    │
                    │                      │
                    │ Pydantic Validation  │
                    │ CORS Middleware      │
                    │ REST API             │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Data Preprocessing  │
                    │                      │
                    │    StandardScaler    │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   ML Classification  │
                    │                      │
                    │   Scikit-learn       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Prediction Result  │
                    │                      │
                    │ Risk + Probability   │
                    └──────────────────────┘
```

---

# 🧠 Machine Learning

## Dataset

The model is designed around 13 commonly used clinical and cardiac indicators.

The project includes a model-training notebook:

```text
notebooks/model_training.ipynb
```

## Preprocessing

Numerical features are standardized using:

```python
StandardScaler
```

The trained preprocessing artifacts are serialized for inference.

```text
backend/models/
├── model.pkl
└── scaler.pkl
```

## Classification Algorithms

The project explores:

| Algorithm                 | Purpose                                 |
| ------------------------- | --------------------------------------- |
| Logistic Regression       | Linear classification baseline          |
| Support Vector Classifier | Margin-based classification             |
| Random Forest             | Ensemble tree-based classification      |
| Decision Tree             | Interpretable tree-based classification |

---

# 📊 Input Features

CardioPredict accepts the following 13 features.

|  # | Feature    | Description                               |
| -: | ---------- | ----------------------------------------- |
|  1 | `age`      | Age in years                              |
|  2 | `sex`      | Biological sex (`1 = male`, `0 = female`) |
|  3 | `cp`       | Chest pain type                           |
|  4 | `trestbps` | Resting blood pressure in mm Hg           |
|  5 | `chol`     | Serum cholesterol in mg/dl                |
|  6 | `fbs`      | Fasting blood sugar > 120 mg/dl           |
|  7 | `restecg`  | Resting electrocardiographic result       |
|  8 | `thalach`  | Maximum heart rate achieved               |
|  9 | `exang`    | Exercise-induced angina                   |
| 10 | `oldpeak`  | Exercise-induced ST depression            |
| 11 | `slope`    | Slope of peak exercise ST segment         |
| 12 | `ca`       | Number of major vessels                   |
| 13 | `thal`     | Thalassemia classification                |

---

## Categorical Values

### Chest Pain — `cp`

```text
0 → Typical angina
1 → Atypical angina
2 → Non-anginal pain
3 → Asymptomatic
```

### Resting ECG — `restecg`

```text
0 → Normal
1 → ST-T wave abnormality
2 → Probable or definite left ventricular hypertrophy
```

### Exercise ST Segment Slope — `slope`

```text
0 → Upsloping
1 → Flat
2 → Downsloping
```

### Thalassemia — `thal`

```text
1 → Normal
2 → Fixed defect
3 → Reversible defect
```

---

# 🎯 Prediction Target

The target variable is:

| Target | Meaning                               |
| -----: | ------------------------------------- |
|    `0` | Low Risk / Absence of heart disease   |
|    `1` | High Risk / Presence of heart disease |

> **Note:** These labels represent machine-learning classifications and should not be interpreted as a clinical diagnosis.

---

# 📁 Project Structure

```text
CardioPredict/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── schema.py
│   │   └── utils/
│   │       └── model_loader.py
│   │
│   ├── models/
│   │   ├── model.pkl
│   │   └── scaler.pkl
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   │       └── api.js
│   │
│   └── package.json
│
├── notebooks/
│   └── model_training.ipynb
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# 💻 Prerequisites

Before installing CardioPredict, make sure you have the following installed.

### Required Software

| Software | Version               |
| -------- | --------------------- |
| Python   | 3.9 or higher         |
| Node.js  | 18 or higher          |
| npm      | Included with Node.js |
| Git      | Latest recommended    |

Check your installed versions:

```bash
python --version
node --version
npm --version
git --version
```

> On some Linux/macOS systems, use `python3` instead of `python`.

---

# 🚀 Installation

## 1. Clone the Repository

Open your terminal or command prompt:

```bash
git clone https://github.com/bishnu-prasad/CardioPredict.git
cd CardioPredict
```

---

# 🪟 2. Windows Installation

## Step 1 — Open Command Prompt or PowerShell

Navigate to the project:

```powershell
cd CardioPredict
```

## Step 2 — Create Python Virtual Environment

```powershell
cd backend
python -m venv venv
```

## Step 3 — Activate Virtual Environment

### Command Prompt

```cmd
venv\Scripts\activate
```

### PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then activate again:

```powershell
.\venv\Scripts\Activate.ps1
```

## Step 4 — Install Backend Dependencies

```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

## Step 5 — Start Backend

```powershell
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

Keep this terminal running.

---

# 🍎 3. macOS Installation

## Step 1 — Open Terminal

Navigate to the project:

```bash
cd CardioPredict
```

## Step 2 — Create Virtual Environment

```bash
cd backend
python3 -m venv venv
```

## Step 3 — Activate Virtual Environment

```bash
source venv/bin/activate
```

After activation, your terminal should display something similar to:

```text
(venv) user@Mac backend %
```

## Step 4 — Upgrade pip

```bash
python3 -m pip install --upgrade pip
```

## Step 5 — Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 6 — Start Backend

```bash
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

# 🐧 4. Linux Installation

## Step 1 — Clone Repository

```bash
git clone https://github.com/bishnu-prasad/CardioPredict.git
cd CardioPredict
```

## Step 2 — Install Python and Node.js

On Ubuntu/Debian-based distributions:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv nodejs npm git
```

Verify:

```bash
python3 --version
node --version
npm --version
git --version
```

## Step 3 — Create Virtual Environment

```bash
cd backend
python3 -m venv venv
```

## Step 4 — Activate Virtual Environment

```bash
source venv/bin/activate
```

## Step 5 — Upgrade pip

```bash
python3 -m pip install --upgrade pip
```

## Step 6 — Install Backend Dependencies

```bash
pip install -r requirements.txt
```

## Step 7 — Start Backend

```bash
uvicorn app.main:app --reload --port 8000
```

Backend:

```text
http://localhost:8000
```

API documentation:

```text
http://localhost:8000/docs
```

---

# ⚛️ 5. Frontend Setup

The frontend requires **Node.js 18+**.

Open a **new terminal** while keeping the backend running.

From the project root:

```bash
cd CardioPredict/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

Depending on the project configuration, it may also run on:

```text
http://localhost:3000
```

---

# ▶️ Running the Complete Application

You need **two terminals**.

## Terminal 1 — Backend

### Windows

```powershell
cd CardioPredict\backend
venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

### macOS / Linux

```bash
cd CardioPredict/backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

---

## Terminal 2 — Frontend

All platforms:

```bash
cd CardioPredict/frontend
npm install
npm run dev
```

Then open the frontend URL shown by Vite/your frontend tooling.

---

# 🔌 API Documentation

The backend provides a REST API powered by FastAPI.

When the backend is running, open:

### Swagger UI

```text
http://localhost:8000/docs
```

### ReDoc

```text
http://localhost:8000/redoc
```

---

# ❤️ Health Check API

### Endpoint

```http
GET /
```

### Example Response

```json
{
  "status": "healthy",
  "message": "CardioPredict API is running"
}
```

---

# 🔮 Prediction API

### Endpoint

```http
POST /predict
```

### Request

```json
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
```

### Response

```json
{
  "prediction": 1,
  "risk_status": "High Risk",
  "probability": 0.85
}
```

---

# 🧪 Testing the API

Once the backend is running, you can test the API using Swagger UI:

```text
http://localhost:8000/docs
```

Or using `curl`:

```bash
curl -X POST "http://localhost:8000/predict" \
-H "Content-Type: application/json" \
-d '{
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
}'
```

---

# ☁️ Deployment

CardioPredict is designed around a separated frontend/backend architecture.

### Frontend

The React application can be deployed using:

```text
Vercel
```

### Backend

The FastAPI service can be deployed using:

```text
Render
```

or another cloud platform capable of running Python/FastAPI applications.

### Production Architecture

```text
                   Internet
                      │
                      ▼
             ┌─────────────────┐
             │     Vercel      │
             │ React Frontend  │
             └────────┬────────┘
                      │
                   HTTPS
                      │
                      ▼
             ┌─────────────────┐
             │     Render      │
             │ FastAPI Backend │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Scikit-learn ML │
             │     Model       │
             └─────────────────┘
```

---

# ⚠️ Limitations

CardioPredict has several important limitations:

* The model is trained using publicly available reference datasets.
* The model has not been clinically validated for diagnostic use.
* The system uses structured clinical parameters rather than raw ECG waveforms.
* Family history is not currently included as a model feature.
* The model may not generalize equally across different populations.
* Prediction probability does not represent a medically validated risk score.
* Results should not be used to make medical decisions.

> **Always consult a qualified healthcare professional regarding symptoms, diagnosis, treatment, or other medical concerns.**

---

# 🔐 Security & Privacy

CardioPredict is an educational project and should not be used with personally identifiable or sensitive patient information in an unsecured environment.

For production healthcare applications, additional measures would be required, including:

* Authentication and authorization
* Encryption
* Secure data storage
* Audit logging
* Access control
* Data retention policies
* Regulatory and clinical compliance

---

# 🔮 Future Improvements

Planned or potential improvements include:

* [ ] Hyperparameter optimization
* [ ] Cross-validation
* [ ] Model performance comparison
* [ ] ROC-AUC and precision/recall reporting
* [ ] Model calibration
* [ ] SHAP-based explainable AI
* [ ] Improved error handling
* [ ] Automated testing
* [ ] Docker support
* [ ] CI/CD pipeline
* [ ] Authentication
* [ ] Prediction history
* [ ] Model monitoring
* [ ] Real-time ECG analysis
* [ ] Larger and clinically validated datasets

---

# 📈 Model Evaluation

For future production-oriented development, the following metrics should be evaluated:

```text
Accuracy
Precision
Recall
F1-Score
ROC-AUC
Confusion Matrix
Calibration
```

Particular attention should be given to **recall/sensitivity**, since false negatives can be especially important in medical-risk prediction systems.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### 1. Fork the Repository

```bash
git clone https://github.com/bishnu-prasad/CardioPredict.git
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes

Implement and test your changes.

### 4. Commit

```bash
git add .
git commit -m "Add: your feature description"
```

### 5. Push

```bash
git push origin feature/your-feature-name
```

### 6. Open a Pull Request

Create a pull request on GitHub with a clear description of your changes.

---

# 👨‍💻 Author

## Bishnu Prasad

GitHub:

**[@bishnu-prasad](https://github.com/bishnu-prasad)**

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

# ⚕️ Medical Disclaimer

**CardioPredict is strictly an educational and research project.**

The predictions generated by this application are based on a machine learning model and should **not** be considered medical advice, diagnosis, prognosis, or treatment recommendations.

The application has not been clinically validated and should not be used to make healthcare decisions.

If you have concerns about your heart health or experience symptoms, consult a qualified healthcare professional.

---

# ⭐ Support the Project

If you find CardioPredict useful or interesting:

⭐ **Star the repository**

🍴 **Fork the project**

🐛 **Report issues**

💡 **Suggest improvements**

🤝 **Contribute to the project**

---

<p align="center">
  Made with ❤️ using React, FastAPI & Scikit-learn
</p>
