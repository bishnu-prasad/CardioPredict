from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict

app = FastAPI(title="Heart Disease Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(predict.router)

@app.get("/")
def root():
    return {"message": "API is running 🚀"}