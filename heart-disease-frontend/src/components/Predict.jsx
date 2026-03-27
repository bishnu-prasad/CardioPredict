import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Tooltip from "./Tooltip"; // ADDED

// ─── Field Config ──────────────────────────────────────
const FIELDS = [
  { key: "Age",            label: "Age",                        type: "number", placeholder: "e.g. 52 (1–120)",     hint: "Years", min: 1, max: 120 },
  { key: "Sex",            label: "Biological Sex",             type: "select",
    options: [{ value:"", label:"Select…" },{ value:"1", label:"Male" },{ value:"0", label:"Female" }] },
  { key: "ChestPainType",  label: "Chest Pain Type",            type: "select",
    tooltip: "Type of chest pain experienced by the patient",
    options: [{ value:"", label:"Select…" },{ value:"0", label:"Typical Angina" },{ value:"1", label:"Atypical Angina" },{ value:"2", label:"Non-Anginal Pain" },{ value:"3", label:"Asymptomatic" }] },
  { key: "RestingBP",      label: "Blood Pressure",             type: "number", placeholder: "e.g. 120 (80–200)",   hint: "Resting mm Hg", min: 80, max: 200,
    tooltip: "Blood pressure indicates the force of blood flow in arteries" },
  { key: "Cholesterol",    label: "Cholesterol",                type: "number", placeholder: "e.g. 200 (100–600)",  hint: "mg/dl serum", min: 100, max: 600,
    tooltip: "High cholesterol can increase risk of heart disease" },
  { key: "FastingBS",      label: "Fasting Blood Sugar",        type: "select",
    tooltip: "Measures blood sugar levels after fasting",
    options: [{ value:"", label:"Select…" },{ value:"1", label:"> 120 mg/dl (High)" },{ value:"0", label:"≤ 120 mg/dl (Normal)" }] },
  { key: "RestingECG",     label: "ECG Result",                 type: "select",
    options: [{ value:"", label:"Select…" },{ value:"0", label:"Normal" },{ value:"1", label:"ST-T Abnormality" },{ value:"2", label:"Ventricular Hypertrophy" }] },
  { key: "MaxHR",          label: "Max Heart Rate",             type: "number", placeholder: "e.g. 150 (60–220)",   hint: "bpm achieved", min: 60, max: 220,
    tooltip: "Maximum heart rate achieved during exercise" },
  { key: "ExerciseAngina", label: "Exercise Angina",            type: "select",
    options: [{ value:"", label:"Select…" },{ value:"1", label:"Yes" },{ value:"0", label:"No" }] },
  { key: "Oldpeak",        label: "ST Depression",              type: "number", placeholder: "e.g. 1.5 (0–6)",      hint: "Oldpeak", min: 0, max: 6,
    tooltip: "ST depression induced by exercise (heart stress indicator)" },
  { key: "ST_Slope",       label: "ST Slope",                   type: "select",
    tooltip: "ECG pattern that may indicate heart strain",
    options: [{ value:"", label:"Select…" },{ value:"0", label:"Upsloping" },{ value:"1", label:"Flat" },{ value:"2", label:"Downsloping" }] },
];

const EMPTY_FORM = FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {});

function FormField({ field, value, onChange, error }) {
  const labelWithTooltip = field.tooltip ? (
    <Tooltip text={field.tooltip}>{field.label}</Tooltip>
  ) : field.label;

  if (field.type === "select") {
    return (
      <div className="form-group">
        <label className="form-label">{labelWithTooltip}</label>
        <div className="select-wrap">
          <select name={field.key} value={value} onChange={onChange} className={`form-select ${error ? 'error' : ''}`}>
            {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <span className="select-arrow">▾</span>
        </div>
      </div>
    );
  }
  return (
    <div className="form-group">
      <label className="form-label">{labelWithTooltip}</label>
      <input type="number" name={field.key} value={value} onChange={onChange} placeholder={field.placeholder} className={`form-input ${error ? 'error' : ''}`} step="any" min={field.min} max={field.max} />
      {error ? <span className="form-error-text">{error}</span> : field.hint && <span className="form-hint">{field.hint}</span>}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <motion.div 
      className="skeleton-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="skeleton-shimmer sk-icon" />
      <div className="skeleton-shimmer sk-title" />
      <div className="skeleton-shimmer sk-text" />
      <div className="skeleton-shimmer sk-text short" />
      <div className="skeleton-shimmer sk-progress" />
      <div className="skeleton-shimmer sk-text" />
      <div className="skeleton-shimmer sk-text short" />
    </motion.div>
  );
}

export default function Predict({ result, setResult, formData: sharedData, setFormData: setSharedData }) {
  const [formData, setLocalData] = useState(sharedData || EMPTY_FORM);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const formRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current.querySelectorAll('.form-group'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, []);

  const validateField = (name, value) => {
    const field = FIELDS.find(f => f.key === name);
    if (!field || field.type !== "number") return null;
    if (value === "") return null;
    const num = Number(value);
    if (field.min !== undefined && num < field.min) return `${field.label} must be at least ${field.min}`;
    if (field.max !== undefined && num > field.max) return `${field.label} must be at most ${field.max}`;
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(p => ({ ...p, [name]: value }));
    const error = validateField(name, value);
    setErrors(p => ({ ...p, [name]: error }));
  };

  const isFormValid = FIELDS.every(f => {
    const val = formData[f.key];
    if (val === "") return false;
    if (f.type === "number") {
      if (validateField(f.key, val)) return false;
    }
    return true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true); 
    setResult(null); 

    const startTime = Date.now();

    try {
      const payload = {};
      FIELDS.forEach(f => payload[f.key] = Number(formData[f.key]));
      
      const res = await fetch("https://cardiopredict-bbzb.onrender.com/predict", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 1200 - elapsed);
      await new Promise(r => setTimeout(r, remaining));

      setSharedData(formData);
      setResult(data);
      navigate("/dashboard");
    } catch (err) {
      alert("Error reaching backend. Is FastAPI running on port 8000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }} style={{ width: '100%' }}>
      <section id="predict" className="section form-section" style={{ paddingTop: '40px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-3)', fontSize: '14px', margin: '0 0 25px 0', alignSelf: 'flex-start', display: 'inline-block', fontWeight: 600 }}>← Back to Home</Link>
        <h2 className="section-title" style={{ width: '100%', textAlign: 'left', marginBottom: '24px' }}>Enter Patient Details</h2>
        
        <div className="glass-card" style={{ marginBottom: loading ? '60px' : '0' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-body">
              <div ref={formRef} className="form-grid">
                {FIELDS.map((field) => <FormField key={field.key} field={field} value={formData[field.key]} onChange={handleChange} error={errors[field.key]} />)}
              </div>
              <button type="submit" className="submit-btn" disabled={loading || !isFormValid}>
                {loading ? "Analyzing Models..." : "Generate Prediction"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.section 
            key="loading" 
            className="section"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            style={{ paddingBottom: '100px' }}
          >
            <SkeletonLoading />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
