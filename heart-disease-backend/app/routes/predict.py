from fastapi import APIRouter
from app.schemas.predict_schema import HeartData
import pickle
import numpy as np
import os

router = APIRouter(prefix="/predict", tags=["Prediction"])

# Load model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, "models", "model.pkl")
model = pickle.load(open(model_path, "rb"))

FEATURE_ORDER = [
    "Age",
    "Sex",
    "ChestPainType",
    "RestingBP",
    "Cholesterol",
    "FastingBS",
    "RestingECG",
    "MaxHR",
    "ExerciseAngina",
    "Oldpeak",
    "ST_Slope"
]
@router.post("/")
def predict(data: HeartData):
    try:
        # Convert Pydantic model → dict
        input_dict = data.dict()

        # Correct order
        input_data = [input_dict[feature] for feature in FEATURE_ORDER]

        input_array = np.array(input_data).reshape(1, -1)

        prediction = model.predict(input_array)[0]
        probability = model.predict_proba(input_array)[0][1]

        # Get feature importance (works for tree-based models like RandomForest)
        importance = None
        if hasattr(model, "feature_importances_"):
            importance_values = model.feature_importances_
            importance = {
                feature: float(importance_values[i])
                for i, feature in enumerate(FEATURE_ORDER)
            }

        return {
            "prediction": int(prediction),
            "risk": "High Risk" if prediction == 1 else "Low Risk",
            "probability": float(probability),
            "importance": importance
        }

    except Exception as e:
        return {"error": str(e)}