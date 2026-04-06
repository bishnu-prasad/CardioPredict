import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, ArrowLeft, Info } from "lucide-react";
import Tooltip from "./Tooltip";

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
  const labelWithTooltip = (
    <div className="flex items-center gap-1.5 mb-2">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{field.label}</label>
      {field.tooltip && (
        <Tooltip text={field.tooltip}>
          <Info size={14} className="text-[#6B6B6B] cursor-help hover:text-[#E10600] transition-all duration-300 ease-in-out" />
        </Tooltip>
      )}
    </div>
  );

  const inputClasses = `w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500
hover:border-gray-400 transition-all duration-200
${error ? 'border-red-500 bg-red-50 placeholder:text-red-300' : ''}`;

  if (field.type === "select") {
    return (
      <div className="flex flex-col group">
        {labelWithTooltip}
        <div className="relative">
          <select 
            name={field.key} 
            value={value} 
            onChange={onChange} 
            className={`${inputClasses} appearance-none cursor-pointer`}
          >
            {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-all duration-200">
            <Loader2 size={16} className="animate-none" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {labelWithTooltip}
      <input 
        type="number" 
        name={field.key} 
        value={value} 
        onChange={onChange} 
        placeholder={field.placeholder} 
        className={inputClasses}
        step="any" 
        min={field.min} 
        max={field.max} 
      />
      {error ? (
        <span className="text-[10px] font-bold text-red-500 mt-1.5 uppercase ml-1 tracking-tight">{error}</span>
      ) : field.hint && (
        <span className="text-[10px] font-medium text-[#6B6B6B] mt-1.5 uppercase ml-1 tracking-tight">{field.hint}</span>
      )}
    </div>
  );
}

export default function Predict({ result, setResult, formData: sharedData, setFormData: setSharedData }) {
  const [formData, setLocalData] = useState(sharedData || EMPTY_FORM);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const field = FIELDS.find(f => f.key === name);
    if (!field || field.type !== "number") return null;
    if (value === "") return null;
    const num = Number(value);
    if (field.min !== undefined && num < field.min) return `Min: ${field.min}`;
    if (field.max !== undefined && num > field.max) return `Max: ${field.max}`;
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
      
      if (!res.ok) throw new Error("Server error");
      
      const data = await res.json();
      
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 1500 - elapsed);
      await new Promise(r => setTimeout(r, remaining));

      setSharedData(formData);
      setResult(data);
      navigate("/dashboard");
    } catch (err) {
      setErrorMsg("Unable to reach server. Please try again.");
      setTimeout(() => setErrorMsg(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }} 
      className="w-full max-w-[1200px] mx-auto px-6 py-12"
    >
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-[#6B6B6B] font-semibold text-xs uppercase tracking-widest hover:text-black transition-all duration-300 ease-in-out mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Home
      </Link>

      <div className="mb-12 pb-10 border-b border-[#E5E5E5]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6B6B6B] mb-4">Clinical intake</p>
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4">
          Patient analysis
        </h2>
        <p className="text-[#6B6B6B] font-medium max-w-lg leading-relaxed">
          Complete all fields to generate a risk estimate. All inputs are required.
        </p>
      </div>
      
      <div className="mb-16">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FIELDS.map((field) => (
              <FormField 
                key={field.key} 
                field={field} 
                value={formData[field.key]} 
                onChange={handleChange} 
                error={errors[field.key]} 
              />
            ))}
          </div>

          <div className="mt-14 flex flex-col items-stretch max-w-2xl mx-auto w-full">
            <button 
              type="submit" 
              className="w-full flex items-center justify-center gap-3 bg-[#E10600] text-white px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-widest transition-all duration-300 ease-in-out hover:bg-[#c70500] hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-[#E10600]" 
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing Patient Data...
                </>
              ) : (
                <>
                  Generate Intelligence Report
                  <ArrowRight size={20} />
                </>
              )}
            </button>
            
            <p className="mt-4 text-center text-[10px] font-medium text-[#6B6B6B] uppercase tracking-widest">
              All fields required
            </p>
          </div>
        </form>
      </div>

      <p className="max-w-2xl mx-auto text-center text-xs text-[#6B6B6B] leading-relaxed px-4">
        This application is for educational purposes only. Results may not be accurate. Consult a medical professional.
      </p>

      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-md bg-white border border-[#E5E5E5] text-black -translate-x-1/2 transition-all duration-300 ease-in-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AlertCircle size={18} className="text-red-500" />
            <span className="font-bold text-sm">{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ArrowRight({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
