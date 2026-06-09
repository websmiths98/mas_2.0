"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  X, 
  Ship, 
  Plane, 
  Search, 
  Check, 
  Boxes, 
  Scale, 
  Anchor, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  MapPin, 
  Trash2, 
  Plus, 
  ChevronDown,
  CheckCircle2
} from "lucide-react";

interface GetQuoteFormProps {
  onClose: () => void;
}

interface ContainerRow {
  id: number;
  type: string;
  quantity: number;
  weight: string;
}

const springTransition = {
  type: "spring",
  stiffness: 150,
  damping: 24,
  mass: 0.9
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springTransition
  },
  exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.15 } }
};

const steps = [
  { id: 1, label: "Destinations" },
  { id: 2, label: "Cargo Type" },
  { id: 3, label: "Routing & Hazard" },
  { id: 4, label: "Incoterms & Addons" },
  { id: 5, label: "Addresses & Specs" }
];

export default function GetQuoteForm({ onClose }: GetQuoteFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [transportMode, setTransportMode] = useState<"Sea" | "Air">("Sea");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  
  const [shipmentType, setShipmentType] = useState<"Containerized" | "Oversized" | "">("");
  const [containerLoad, setContainerLoad] = useState<"FCL" | "LCL" | "">("");
  
  const [portLoading, setPortLoading] = useState("");
  const [portDischarge, setPortDischarge] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [commodity, setCommodity] = useState("");
  
  const [isDangerous, setIsDangerous] = useState<"Yes" | "No" | "">("");
  const [classification, setClassification] = useState("");
  const [unNo, setUnNo] = useState("");
  const [hazardFile, setHazardFile] = useState<File | null>(null);
  const [incoTerm, setIncoTerm] = useState("");
  const [originReqSelected, setOriginReqSelected] = useState(false);
  const [originReq, setOriginReq] = useState({ trucking: false, clearance: false, insurance: false });
  const [destReq, setDestReq] = useState({ trucking: false, clearance: false, insurance: false });
  
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cleaned up Row State Structure (Matching the video design items)
  const [containers, setContainers] = useState<ContainerRow[]>([
    { id: Date.now(), type: "", quantity: 1, weight: "" }
  ]);

  const countries = ["Algeria", "Argentina", "Bahrain", "India", "Indonesia", "United Arab Emirates", "United Kingdom", "United States"];
  const loadingPorts = ["DKAAB - AABENRAA", "DEAAH - AACHEN", "INBOM - Nhava Sheva, Mumbai"];
  const dischargePorts = ["INBLS - BALASORE CONCOR ICD", "INBNS6 - AFS Kapashera, Bijwasan Road"];
  const loadingAirports = ["BOM - Mumbai Airport", "DEL - Delhi Airport", "LHR - London Heathrow"];
  const dischargeAirports = ["DXB - Dubai Airport", "JFK - New York JFK", "SIN - Singapore Changi"];

  const isRoutingComplete = portLoading && portDischarge && shippingDate && commodity.trim();
  const isHazardComplete = isDangerous === "No" || (isDangerous === "Yes" && classification.trim() !== "" && unNo.trim() !== "" && hazardFile !== null);
  const isAddressesComplete = pickupAddress.trim() && deliveryAddress.trim();

  const displayInputValue = isCountryDropdownOpen ? countrySearch : selectedCountry;

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
        setCountrySearch(""); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (mode: "Sea" | "Air") => {
    setTransportMode(mode);
    setSelectedCountry("");
    setCountrySearch("");
    setIsCountryDropdownOpen(false);
    setShipmentType("");
    setContainerLoad("");
    setPortLoading("");
    setPortDischarge("");
    setShippingDate("");
    setCommodity("");
    setIsDangerous("");
    setClassification("");
    setUnNo("");
    setHazardFile(null);
    setIncoTerm("");
    setOriginReqSelected(false);
    setOriginReq({ trucking: false, clearance: false, insurance: false });
    setDestReq({ trucking: false, clearance: false, insurance: false });
    setPickupAddress("");
    setDeliveryAddress("");
    setContainers([
      { id: Date.now(), type: "", quantity: 1, weight: "" }
    ]);

    if (formContainerRef.current) {
      formContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isCountryDropdownOpen) return;
    if (!selectedCountry) return;

    if (formContainerRef.current) {
      setTimeout(() => {
        formContainerRef.current?.scrollTo({
          top: formContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 150);
    }
  }, [
    shipmentType, 
    containerLoad, 
    isRoutingComplete, 
    isDangerous, 
    classification,
    unNo,
    hazardFile,
    incoTerm, 
    originReqSelected, 
    isAddressesComplete,
    containers.length,
    isCountryDropdownOpen
  ]);

  const handleAddRow = () => {
    setContainers([...containers, { id: Date.now(), type: "", quantity: 1, weight: "" }]);
  };

  const handleUpdateRow = (id: number, fields: Partial<ContainerRow>) => {
    setContainers(containers.map(row => row.id === id ? { ...row, ...fields } : row));
  };

  const handleRemoveRow = (id: number) => {
    if (containers.length > 1) {
      setContainers(containers.filter(row => row.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // Determine active step based on progression
  const getActiveStep = () => {
    if (!selectedCountry) return 1;
    if (!containerLoad) return 2;
    if (!isRoutingComplete || isDangerous === "" || (isDangerous === "Yes" && !isHazardComplete)) return 3;
    if (!incoTerm || !originReqSelected) return 4;
    return 5;
  };

  const activeStep = getActiveStep();
  const RouteIcon = transportMode === "Air" ? Plane : Anchor;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 backdrop-blur-md pt-28 pb-8 px-4 overflow-hidden text-left selection:bg-emerald-500/10" data-lenis-prevent>
      <div className="absolute inset-0 -z-10 bg-slate-950/10" onClick={onClose} />
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-emerald-500/8 rounded-full blur-[120px] pointer-events-none animate-blob -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-teal-500/8 rounded-full blur-[120px] pointer-events-none animate-blob animation-delay-4000 -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={springTransition}
        className="bg-white/95 border border-slate-200/80 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] w-full max-w-4xl text-slate-800 overflow-hidden flex flex-col max-h-[calc(100vh-9rem)] backdrop-blur-2xl ring-1 ring-slate-200/50"
      >
        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 backdrop-blur-md">
          <div className="flex items-center gap-3 group/header">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600">
              <Compass className="w-6 h-6 animate-pulse group-hover/header:rotate-180 transition-transform duration-700 ease-in-out" />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                Progressive Logistics Wizard
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Create Quote Request</h2>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-slate-500 hover:text-slate-800 font-medium text-lg w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Timeline (Hidden on submission screen) */}
        {!isSubmitted && (
          <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-100 hidden md:block select-none">
            <div className="flex justify-between items-center relative">
              {/* Background Line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
              {/* Fill Line */}
              <motion.div 
                className="absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-emerald-600 to-teal-600 -translate-y-1/2 z-0"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              
              {steps.map((step) => {
                const isCompleted = activeStep > step.id;
                const isActive = activeStep === step.id;
                return (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        backgroundColor: isCompleted ? "#10b981" : isActive ? "#ffffff" : "#f1f5f9",
                        borderColor: isCompleted ? "#10b981" : isActive ? "#10b981" : "#cbd5e1"
                      }}
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-sm transition-all duration-300 ${isActive ? "shadow-emerald-500/10 text-emerald-600" : isCompleted ? "text-white" : "text-slate-400"}`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white stroke-[3.5px]" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </motion.div>
                    <span className={`text-[10px] font-bold mt-2.5 uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-emerald-600" : isCompleted ? "text-slate-700" : "text-slate-400"}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Scrollable Form Body */}
        <div 
          ref={formContainerRef} 
          className="p-8 overflow-y-auto text-sm max-h-full scroll-smooth"
          data-lenis-prevent
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="quote-form"
                onSubmit={handleSubmit} 
                className="space-y-8 pb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* STEP 1 & 2: Transport Mode & Destination Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  
                  {/* Transport Mode */}
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Mode of Transportation</label>
                    <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200/80 backdrop-blur-md relative">
                      <button
                        type="button" 
                        onClick={() => handleTabChange("Sea")}
                        className={`relative flex items-center gap-2.5 py-2.5 px-6 font-bold text-xs rounded-xl transition-all duration-300 cursor-pointer z-10 ${transportMode === "Sea" ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-800"}`}
                      >
                        {transportMode === "Sea" && (
                          <motion.div
                            layoutId="activeTransport"
                            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl -z-10 shadow shadow-emerald-600/10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <Ship className={`w-4 h-4 ${transportMode === "Sea" ? "text-white" : "text-slate-500"}`} />
                        Sea Freight
                      </button>
                      <button
                        type="button" 
                        onClick={() => handleTabChange("Air")}
                        className={`relative flex items-center gap-2.5 py-2.5 px-6 font-bold text-xs rounded-xl transition-all duration-300 cursor-pointer z-10 ${transportMode === "Air" ? "text-white font-extrabold" : "text-slate-600 hover:text-slate-800"}`}
                      >
                        {transportMode === "Air" && (
                          <motion.div
                            layoutId="activeTransport"
                            className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl -z-10 shadow shadow-emerald-600/10"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <Plane className={`w-4 h-4 ${transportMode === "Air" ? "text-white" : "text-slate-500"}`} />
                        Air Freight
                      </button>
                    </div>
                  </div>

                  {/* Destination Country */}
                  <div className="flex flex-col gap-2 relative" ref={countryDropdownRef}>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-emerald-600" /> Target Destination Country
                    </label>
                    
                    <div className="relative flex items-center group">
                      <input 
                        type="text"
                        placeholder="Type to search country..."
                        value={displayInputValue}
                        onChange={(e) => {
                          if (!isCountryDropdownOpen) setIsCountryDropdownOpen(true);
                          setCountrySearch(e.target.value);
                        }}
                        onFocus={() => {
                          setIsCountryDropdownOpen(true);
                          setCountrySearch(""); 
                        }}
                        className="w-full p-3.5 pl-11 pr-10 border border-slate-200 rounded-2xl bg-slate-50 font-semibold text-slate-800 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all duration-300 shadow-sm"
                      />
                      <div className="absolute left-4 text-slate-400 pointer-events-none group-focus-within:text-emerald-600 transition-colors">
                        <Search className="w-4 h-4" />
                      </div>
                      <div 
                        className="absolute right-4 pointer-events-none text-slate-500 transition-transform duration-300"
                        style={{ transform: isCountryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Floating Country List overlay dropdown */}
                    <AnimatePresence>
                      {isCountryDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 8, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.99 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white border border-slate-200 rounded-2xl shadow-[0_20px_40px_rgba(15,23,42,0.08)] z-[100] overflow-y-auto max-h-52 p-2 backdrop-blur-xl ring-1 ring-black/5"
                        >
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                              <div
                                key={country}
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setCountrySearch("");
                                  setIsCountryDropdownOpen(false);
                                  setShipmentType("");
                                  setContainerLoad("");
                                }}
                                className={`px-4 py-2.5 text-xs font-semibold rounded-xl cursor-pointer transition-all duration-150 flex items-center justify-between ${selectedCountry === country ? "bg-emerald-55 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50"}`}
                              >
                                <span>{country}</span>
                                {selectedCountry === country && (
                                  <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                                )}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-4 text-xs text-slate-400 italic text-center">No results found</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* STEP 3: Shipment Type selection */}
                <AnimatePresence initial={false}>
                  {selectedCountry && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="space-y-3 border-t border-slate-100 pt-6"
                    >
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Shipment Type</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Containerized Cargo */}
                        <div 
                          onClick={() => { setShipmentType("Containerized"); setContainerLoad(""); }}
                          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 hover:scale-[1.01] ${shipmentType === "Containerized" ? "bg-emerald-50/30 border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.05)]" : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50"}`}
                        >
                          <div className={`p-3.5 rounded-2xl transition-colors ${shipmentType === "Containerized" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                            <Boxes className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col gap-1 pr-6">
                            <span className="font-extrabold text-slate-800 text-sm">Containerized Cargo</span>
                            <span className="text-xs text-slate-500 leading-normal">Standard general multi-unit container cargo logistics</span>
                          </div>
                          {shipmentType === "Containerized" && (
                            <div className="ml-auto w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center self-center shadow shadow-emerald-500/30 shrink-0">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />
                            </div>
                          )}
                        </div>

                        {/* Oversized Cargo */}
                        <div 
                          onClick={() => { setShipmentType("Oversized"); setContainerLoad("FCL"); }}
                          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 flex items-start gap-4 hover:scale-[1.01] ${shipmentType === "Oversized" ? "bg-emerald-50/30 border-emerald-500 shadow-[0_4px_20px_rgba(16,185,129,0.05)]" : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50"}`}
                        >
                          <div className={`p-3.5 rounded-2xl transition-colors ${shipmentType === "Oversized" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
                            <Scale className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col gap-1 pr-6">
                            <span className="font-extrabold text-slate-800 text-sm">Oversized Cargo</span>
                            <span className="text-xs text-slate-500 leading-normal">Heavy equipment machinery or out of gauge operations</span>
                          </div>
                          {shipmentType === "Oversized" && (
                            <div className="ml-auto w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center self-center shadow shadow-emerald-500/30 shrink-0">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3.5px]" />
                            </div>
                          )}
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 4: Container Load Options */}
                <AnimatePresence initial={false}>
                  {shipmentType === "Containerized" && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-200"
                    >
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Container Load Capacity</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div 
                          onClick={() => setContainerLoad("FCL")}
                          className={`relative p-4 rounded-2xl border-2 cursor-pointer font-bold text-xs transition-all duration-300 text-center shadow-sm z-10 ${containerLoad === "FCL" ? "border-emerald-500 text-emerald-700 font-extrabold" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-600"}`}
                        >
                          {containerLoad === "FCL" && (
                            <motion.div
                              layoutId="activeContainerLoad"
                              className="absolute inset-0 bg-emerald-50 rounded-2xl -z-10"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          Full Container Load (FCL)
                        </div>
                        <div 
                          onClick={() => setContainerLoad("LCL")}
                          className={`relative p-4 rounded-2xl border-2 cursor-pointer font-bold text-xs transition-all duration-300 text-center shadow-sm z-10 ${containerLoad === "LCL" ? "border-emerald-500 text-emerald-700 font-extrabold" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-600"}`}
                        >
                          {containerLoad === "LCL" && (
                            <motion.div
                              layoutId="activeContainerLoad"
                              className="absolute inset-0 bg-emerald-50 rounded-2xl -z-10"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          Less Container Load (LCL)
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 5: Core Port Routing Data */}
                <AnimatePresence initial={false}>
                  {containerLoad && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-slate-100 pt-6"
                    >
                      {/* Port/Airport of Loading */}
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <RouteIcon className="w-3.5 h-3.5 text-emerald-600" /> {transportMode === "Air" ? "Airport of Loading *" : "Port of Loading *"}
                        </label>
                        <div className="relative flex items-center group">
                          <select 
                            value={portLoading} 
                            onChange={(e) => setPortLoading(e.target.value)} 
                            className="w-full p-3.5 pl-10 pr-10 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 appearance-none cursor-pointer transition-all duration-300"
                          >
                            <option value="" className="bg-white text-slate-400">{transportMode === "Air" ? "Select Airport" : "Select Port"}</option>
                            {(transportMode === "Air" ? loadingAirports : loadingPorts).map(p => <option key={p} value={p} className="bg-white text-slate-800">{p}</option>)}
                          </select>
                          <div className="absolute left-3.5 text-slate-400 pointer-events-none group-focus-within:text-emerald-600 transition-colors">
                            <RouteIcon className="w-4 h-4 group-focus-within:rotate-12 group-focus-within:scale-110 transition-all duration-300" />
                          </div>
                          <div className="absolute right-3.5 text-slate-400 pointer-events-none group-focus-within:text-emerald-600 transition-colors">
                            <ChevronDown className="w-4 h-4 group-focus-within:translate-y-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Port/Airport of Discharge */}
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <RouteIcon className="w-3.5 h-3.5 text-teal-600" /> {transportMode === "Air" ? "Airport of Discharge *" : "Port of Discharge *"}
                        </label>
                        <div className="relative flex items-center group">
                          <select 
                            value={portDischarge} 
                            onChange={(e) => setPortDischarge(e.target.value)} 
                            className="w-full p-3.5 pl-10 pr-10 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 appearance-none cursor-pointer transition-all duration-300"
                          >
                            <option value="" className="bg-white text-slate-400">{transportMode === "Air" ? "Select Airport" : "Select Port"}</option>
                            {(transportMode === "Air" ? dischargeAirports : dischargePorts).map(p => <option key={p} value={p} className="bg-white text-slate-800">{p}</option>)}
                          </select>
                          <div className="absolute left-3.5 text-slate-400 pointer-events-none group-focus-within:text-teal-600 transition-colors">
                            <RouteIcon className="w-4 h-4 group-focus-within:rotate-12 group-focus-within:scale-110 transition-all duration-300" />
                          </div>
                          <div className="absolute right-3.5 text-slate-400 pointer-events-none group-focus-within:text-teal-650 transition-colors">
                            <ChevronDown className="w-4 h-4 group-focus-within:translate-y-0.5 transition-all duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Shipping Date */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Shipping Date *
                        </label>
                        <div className="relative flex items-center group">
                          <input 
                            type="date" 
                            value={shippingDate} 
                            onChange={(e) => setShippingDate(e.target.value)} 
                            className="w-full p-3 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Commodity */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" /> Commodity *
                        </label>
                        <div className="relative flex items-center group">
                          <input 
                            type="text" 
                            placeholder="Cargo description..." 
                            value={commodity} 
                            onChange={(e) => setCommodity(e.target.value)} 
                            className="w-full p-3.5 pl-10 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 transition-all duration-300"
                          />
                          <div className="absolute left-3.5 text-slate-400 pointer-events-none group-focus-within:text-emerald-600 transition-colors">
                            <FileText className="w-4 h-4 group-focus-within:scale-110 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 6: Risk Hazard verification parameters */}
                <AnimatePresence initial={false}>
                  {isRoutingComplete && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="space-y-3 border-t border-slate-100 pt-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                        {/* Option buttons */}
                        <div className="md:col-span-3 flex flex-col gap-3">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Is the Commodity Dangerous / Hazardous?
                          </label>
                          <div className="flex gap-4 h-[46px] items-center">
                            <button 
                              type="button" 
                              onClick={() => setIsDangerous("Yes")} 
                              className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-extrabold border-2 transition-all duration-300 cursor-pointer z-10 ${isDangerous === "Yes" ? "border-rose-500 text-rose-700 shadow-[0_4px_12px_rgba(239,68,68,0.05)]" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100"}`}
                            >
                              {isDangerous === "Yes" && (
                                <motion.div
                                  layoutId="activeDangerous"
                                  className="absolute inset-0 bg-rose-50 rounded-2xl -z-10"
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                              )}
                              <AlertTriangle className={`w-4 h-4 transition-colors ${isDangerous === "Yes" ? "text-rose-600" : "text-rose-500"}`} />
                              Yes
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                setIsDangerous("No");
                                setClassification("");
                                setUnNo("");
                                setHazardFile(null);
                              }} 
                              className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-extrabold border-2 transition-all duration-300 cursor-pointer z-10 ${isDangerous === "No" ? "border-emerald-500 text-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.05)]" : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100"}`}
                            >
                              {isDangerous === "No" && (
                                <motion.div
                                  layoutId="activeDangerous"
                                  className="absolute inset-0 bg-emerald-50 rounded-2xl -z-10"
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                              )}
                              <ShieldCheck className={`w-4 h-4 transition-colors ${isDangerous === "No" ? "text-emerald-600" : "text-emerald-500"}`} />
                              No
                            </button>
                          </div>
                        </div>

                        {/* Dangerous goods details fields */}
                        <AnimatePresence>
                          {isDangerous === "Yes" && (
                            <>
                              {/* Classification */}
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="md:col-span-3 flex flex-col gap-2 relative group"
                              >
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                  Classification *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Class 3"
                                  value={classification}
                                  onChange={(e) => setClassification(e.target.value)}
                                  className="w-full p-3.5 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 transition-all duration-300"
                                />
                              </motion.div>

                              {/* UN No */}
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="md:col-span-3 flex flex-col gap-2 relative group"
                              >
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                  UN No *
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. UN 1263"
                                  value={unNo}
                                  onChange={(e) => setUnNo(e.target.value)}
                                  className="w-full p-3.5 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 transition-all duration-300"
                                />
                              </motion.div>

                              {/* Upload DGD/MSDS/COA/PC etc. */}
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="md:col-span-3 flex flex-col gap-2 relative"
                              >
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                  Upload DGD/MSDS/COA/PC etc.*
                                </label>
                                <div className="relative flex items-center">
                                  <input
                                    type="file"
                                    id="hazard-file-upload"
                                    className="hidden"
                                    onChange={(e) => setHazardFile(e.target.files?.[0] || null)}
                                  />
                                  <label
                                    htmlFor="hazard-file-upload"
                                    className="w-full flex items-center justify-between p-3.5 border border-slate-200 bg-slate-50 rounded-2xl focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10 cursor-pointer transition-all duration-300"
                                  >
                                    <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl transition-all border border-slate-200 select-none">
                                      Choose File
                                    </span>
                                    <span className="text-xs text-slate-500 truncate max-w-[100px] font-medium pr-2">
                                      {hazardFile ? hazardFile.name : "No file chosen"}
                                    </span>
                                  </label>
                                </div>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 7: Commercial Terms selection tags */}
                <AnimatePresence initial={false}>
                  {isDangerous && (isDangerous === "No" || isHazardComplete) && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="space-y-3 border-t border-slate-100 pt-6"
                    >
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Commercial Shipping Inco Term</label>
                      <div className="flex flex-wrap gap-2.5">
                        {["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAP", "DDP"].map((term) => (
                          <button
                            key={term} 
                            type="button" 
                            onClick={() => setIncoTerm(term)}
                            className={`px-5 py-2.5 text-xs font-extrabold rounded-xl border-2 transition-all duration-200 cursor-pointer ${incoTerm === term ? "bg-emerald-50 text-emerald-700 border-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.05)] scale-[1.03]" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-850 hover:bg-slate-100"}`}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 8: Extra Requirements metrics */}
                <AnimatePresence initial={false}>
                  {incoTerm && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-200"
                    >
                      {/* Origin Requirements */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-emerald-600" /> Origin Requirements
                        </h4>
                        <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-600">
                          {["trucking", "clearance", "insurance"].map((req) => {
                            const isChecked = (originReq as any)[req];
                            return (
                              <label 
                                key={req} 
                                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 cursor-pointer select-none transition-all duration-205 ${isChecked ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
                              >
                                <input 
                                  type="checkbox" 
                                  checked={isChecked} 
                                  onChange={(e) => { 
                                    setOriginReq({ ...originReq, [req]: e.target.checked }); 
                                    setOriginReqSelected(true); 
                                  }} 
                                  className="hidden"
                                />
                                <div className={`w-4 h-4 rounded flex items-center justify-center transition-all ${isChecked ? "bg-emerald-500 text-white" : "border border-slate-300"}`}>
                                  {isChecked && <Check className="w-3 h-3 stroke-[3.5px]" />}
                                </div>
                                <span className="capitalize">{req}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Destination Requirements */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-teal-650" /> Destination Requirements
                        </h4>
                        <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-600">
                          {["trucking", "clearance", "insurance"].map((req) => {
                            const isChecked = (destReq as any)[req];
                            return (
                              <label 
                                key={req} 
                                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 cursor-pointer select-none transition-all duration-205 ${isChecked ? "bg-teal-50 border-teal-500 text-teal-700" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}
                              >
                                <input 
                                  type="checkbox" 
                                  checked={isChecked} 
                                  onChange={(e) => { 
                                    setDestReq({ ...destReq, [req]: e.target.checked }); 
                                    setOriginReqSelected(true); 
                                  }} 
                                  className="hidden"
                                />
                                <div className={`w-4 h-4 rounded flex items-center justify-center transition-all ${isChecked ? "bg-teal-500 text-white" : "border border-slate-300"}`}>
                                  {isChecked && <Check className="w-3 h-3 stroke-[3.5px]" />}
                                </div>
                                <span className="capitalize">{req}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 9: Pickup & Delivery Location fields */}
                <AnimatePresence initial={false}>
                  {originReqSelected && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6"
                    >
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 animate-pulse" /> Pickup Address *
                        </label>
                        <div className="relative flex items-center group">
                          <input 
                            type="text" 
                            placeholder="Complete address or postal code..." 
                            value={pickupAddress} 
                            onChange={(e) => setPickupAddress(e.target.value)} 
                            className="w-full p-3.5 pl-10 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 transition-all duration-300"
                          />
                          <div className="absolute left-3.5 text-slate-400 pointer-events-none group-focus-within:text-emerald-600 transition-colors">
                            <MapPin className="w-4 h-4 group-focus-within:-translate-y-0.5 group-focus-within:scale-110 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-600 animate-pulse" /> Delivery Address *
                        </label>
                        <div className="relative flex items-center group">
                          <input 
                            type="text" 
                            placeholder="Final drop destination unloading details..." 
                            value={deliveryAddress} 
                            onChange={(e) => setDeliveryAddress(e.target.value)} 
                            className="w-full p-3.5 pl-10 border border-slate-200 bg-slate-50 rounded-2xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none text-xs font-bold text-slate-800 transition-all duration-300"
                          />
                          <div className="absolute left-3.5 text-slate-400 pointer-events-none group-focus-within:text-teal-650 transition-colors">
                            <MapPin className="w-4 h-4 group-focus-within:-translate-y-0.5 group-focus-within:scale-110 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEP 10: Clean Container Selection Rows */}
                <AnimatePresence initial={false}>
                  {isAddressesComplete && (
                    <motion.div 
                      layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                      className="space-y-4 border-t border-slate-100 pt-6"
                    >
                      <label className="text-[11px] font-bold text-slate-500 uppercase block tracking-wider flex items-center gap-1.5">
                        <Boxes className="w-4 h-4 text-emerald-600" /> {transportMode === "Air" ? "Air Cargo Unit Metrics & Load Matrix" : "Container Specification Metrics & Load Matrix"}
                      </label>
                      
                      <div className="space-y-4">
                        {containers.map((row) => (
                          <motion.div 
                            layout 
                            initial={{ opacity: 0, y: 12 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={springTransition}
                            key={row.id} 
                            className="bg-slate-50/50 p-6 rounded-3xl border border-slate-200 relative shadow-sm hover:border-slate-300/80 transition-all duration-300"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                              
                              {/* Type Selection */}
                              <div className="md:col-span-5 flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                  {transportMode === "Air" ? "Air Cargo Unit Type" : "Container Specification Type"}
                                </span>
                                <div className="relative flex items-center">
                                  <select
                                    value={row.type}
                                    onChange={(e) => handleUpdateRow(row.id, { type: e.target.value })}
                                    className="w-full p-3.5 pl-10 pr-10 border border-slate-200 rounded-2xl text-xs bg-white text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold shadow-sm cursor-pointer appearance-none transition-all duration-300"
                                  >
                                    {transportMode === "Air" ? (
                                      <>
                                        <option value="" className="bg-white text-slate-400">-- Select Air Cargo Unit --</option>
                                        <optgroup label="Standard Air ULD Containers" className="bg-white text-emerald-600 font-extrabold">
                                          <option value="LD3 - Standard ULD Container" className="bg-white text-slate-800 font-normal">LD3 - Standard ULD Container</option>
                                          <option value="LD7 - Double-width ULD" className="bg-white text-slate-800 font-normal">LD7 - Double-width ULD</option>
                                          <option value="LD11 - Semi-pallet ULD" className="bg-white text-slate-800 font-normal">LD11 - Semi-pallet ULD</option>
                                        </optgroup>
                                        <optgroup label="Air Cargo Pallets & Loose" className="bg-white text-teal-600 font-extrabold">
                                          <option value="PMC - Main Deck Pallet" className="bg-white text-slate-800 font-normal">PMC - Main Deck Pallet</option>
                                          <option value="Loose Cargo - Cartons / Boxes" className="bg-white text-slate-800 font-normal">Loose Cargo - Cartons / Boxes</option>
                                        </optgroup>
                                      </>
                                    ) : (
                                      <>
                                        <option value="" className="bg-white text-slate-400">-- Select Structural Type --</option>
                                        <optgroup label="Specialized Open Top & Flat Racks" className="bg-white text-emerald-600 font-extrabold">
                                          <option value="20'OT - Open Top" className="bg-white text-slate-800 font-normal">20'OT - Open Top</option>
                                          <option value="40'OT HC - Open Top High Cube" className="bg-white text-slate-800 font-normal">40'OT HC - Open Top High Cube</option>
                                          <option value="20'FR - Flat Rack" className="bg-white text-slate-800 font-normal">20'FR - Flat Rack</option>
                                          <option value="40'FR HC - Flat Rack High Cube" className="bg-white text-slate-800 font-normal">40'FR HC - Flat Rack High Cube</option>
                                        </optgroup>
                                        <optgroup label="Standard Logistics Equipment" className="bg-white text-teal-600 font-extrabold">
                                          <option value="20GP - General Purpose" className="bg-white text-slate-800 font-normal">20GP - General Purpose</option>
                                          <option value="40HC - High Cube" className="bg-white text-slate-800 font-normal">40HC - High Cube</option>
                                          <option value="20RF - Reefer Container" className="bg-white text-slate-800 font-normal">20RF - Reefer Container</option>
                                        </optgroup>
                                      </>
                                    )}
                                  </select>
                                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                                    <Boxes className="w-4 h-4" />
                                  </div>
                                  <div className="absolute right-3.5 text-slate-400 pointer-events-none">
                                    <ChevronDown className="w-4 h-4" />
                                  </div>
                                </div>
                              </div>

                              {/* Quantity */}
                              <div className="md:col-span-3 flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                  {transportMode === "Air" ? "No of Units *" : "No of Containers *"}
                                </span>
                                <input
                                  type="number" 
                                  min={1} 
                                  value={row.quantity}
                                  onChange={(e) => handleUpdateRow(row.id, { quantity: parseInt(e.target.value) || 1 })}
                                  className="w-full p-3.5 border border-slate-200 rounded-2xl text-xs text-center bg-white text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none shadow-sm font-bold transition-all duration-300"
                                />
                              </div>

                              {/* Weight */}
                              <div className="md:col-span-3 flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                  <Scale className="w-3.5 h-3.5 text-emerald-600" /> Gross Weight (KG)
                                </span>
                                <div className="relative flex items-center">
                                  <input
                                    type="text" 
                                    placeholder="0.00" 
                                    value={row.weight}
                                    onChange={(e) => handleUpdateRow(row.id, { weight: e.target.value })}
                                    className="w-full p-3.5 pr-12 border border-slate-200 rounded-2xl text-xs text-right bg-white text-slate-800 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none shadow-sm font-bold transition-all duration-300"
                                  />
                                  <div className="absolute right-3.5 text-slate-400 pointer-events-none font-bold text-[10px]">
                                    KG
                                  </div>
                                </div>
                              </div>

                              {/* Remove Row Button */}
                              <div className="md:col-span-1 flex justify-center pb-1">
                                <button
                                  type="button" 
                                  disabled={containers.length === 1}
                                  onClick={() => handleRemoveRow(row.id)}
                                  className="text-rose-500 hover:bg-rose-50 w-11 h-11 rounded-2xl flex items-center justify-center transition-all disabled:opacity-20 text-xs font-bold border border-slate-200 hover:border-rose-350 cursor-pointer disabled:cursor-not-allowed"
                                  title="Remove Cargo Param Row"
                                >
                                  <Trash2 className="w-4.5 h-4.5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Add Row Button */}
                      <button
                        type="button" 
                        onClick={handleAddRow}
                        className="w-full py-4 border-2 border-dashed border-slate-200 hover:border-emerald-500 text-slate-500 hover:text-emerald-600 font-extrabold text-xs rounded-3xl hover:bg-emerald-50/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> {transportMode === "Air" ? "Append Another Cargo Unit Row" : "Append Another Cargo Parameter Row"}
                      </button>

                      {/* Submission footer */}
                      <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                        <button
                          type="button" 
                          onClick={onClose}
                          className="px-6 py-3.5 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!containers[0].type}
                          className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-2xl hover:from-emerald-500 hover:to-teal-500 shadow hover:shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                        >
                          Complete & Submit Quote ➔
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              // STEP 11: Premium success response state rendering (replaces alert dialog)
              <motion.div 
                key="quote-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={springTransition}
                className="py-12 px-6 flex flex-col items-center text-center max-w-lg mx-auto space-y-6"
              >
                <div className="relative">
                  {/* Decorative green pulse halos */}
                  <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl scale-150 animate-pulse" />
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 relative z-10">
                    <CheckCircle2 className="w-12 h-12 stroke-[2px]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Request Submitted!</h3>
                  <p className="text-slate-650 leading-relaxed text-sm">
                    Thank you. Your logistics quote request has been registered in our system. 
                    Our operations team is analyzing your routing parameters and will reach out with a custom quote within 2 hours.
                  </p>
                </div>

                <div className="pt-4 w-full">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-2xl hover:from-emerald-500 hover:to-teal-500 shadow transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    Finish & Close Wizard
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

