from pydantic import BaseModel, Field

class HeartData(BaseModel):
    Age: int = Field(ge=1, le=120)
    Sex: int
    ChestPainType: int
    RestingBP: int = Field(ge=80, le=200)
    Cholesterol: int = Field(ge=100, le=600)
    FastingBS: int = Field(ge=0, le=1)
    RestingECG: int
    MaxHR: int = Field(ge=60, le=220)
    ExerciseAngina: int
    Oldpeak: float = Field(ge=0.0, le=6.0)
    ST_Slope: int