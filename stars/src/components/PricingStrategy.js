import React, { useState } from "react";

// const PricingStrategy = () => {
//     const [formData, setFormData] = useState({
//         Previous_Year_Price: "",
//         Competitor_Price: "",
//         Previous_Year_Sales: "",
    
//     });

//     const [predictionResult, setPredictionResult] = useState(null);

//     // Handle input changes
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
        
//         // Convert form data to a list of numerical values
//         const formattedData = Object.values(formData).map(Number);

//         try {
//             const response = await fetch("http://127.0.0.1:5000/predict_price", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ features: formattedData }), // Send as a list
//             });

//             const result = await response.json();
//             setPredictionResult(result); // Update UI with the prediction
//         } catch (error) {
//             console.error("Error fetching API:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Pricing Strategy</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>Previous Year Price:</label>
//                 <input 
//                   type="number" 
//                   name="Previous_Year_Price" 
//                   value={formData.Previous_Year_Price} 
//                   onChange={handleChange} 
//                   required 
//                 /><br />

//                 <label>Competitor Price:</label>
//                 <input 
//                   type="number" 
//                   name="Competitor_Price" 
//                   value={formData.Competitor_Price} 
//                   onChange={handleChange} 
//                   required 
//                 /><br />

//                 <label>Previous Year Sales:</label>
//                 <input 
//                   type="number" 
//                   name="Previous_Year_Sales" 
//                   value={formData.Previous_Year_Sales} 
//                   onChange={handleChange} 
//                   required 
//                 /><br />

//                 <button type="submit">Analyze</button>
//             </form>

//             {predictionResult && (
//                 <div className="result">
//                     <h3>Prediction:</h3>
//                     <p>Predicted Price: {predictionResult?.predicted_price}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PricingStrategy;
// export const PricingStrategy = () => {
//     const [formData, setFormData] = useState({
//       Previous_Year_Price: "",
//       Competitor_Price: "",
//       Previous_Year_Sales: "",
//     });
//     const [predictionResult, setPredictionResult] = useState(null);
  
//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       try {
//         const response = await fetch("http://127.0.0.1:5000/predict_price", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             features: Object.values(formData).map(Number)
//           }),
//         });
//         const result = await response.json();
//         setPredictionResult(result);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
//     const FormInput = ({ label, name, type = "number", value, onChange, required = true }) => (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             required={required}
//             className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
//           />
//         </div>
//       );
      
//       const ResultCard = ({ title, value }) => (
//         <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
//           <h3 className="text-lg font-medium text-gray-300 mb-2">{title}</h3>
//           <p className="text-2xl font-bold text-blue-400">{value}</p>
//         </div>
//       );
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center space-x-2 mb-6">
//           {/* <Tag className="w-6 h-6 text-blue-400" /> */}
//           <h2 className="text-xl font-bold text-white">Pricing Strategy</h2>
//         </div>
  
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <FormInput
//               label="Previous Year Price"
//               name="Previous_Year_Price"
//               value={formData.Previous_Year_Price}
//               onChange={handleChange}
//             />
//             <FormInput
//               label="Competitor Price"
//               name="Competitor_Price"
//               value={formData.Competitor_Price}
//               onChange={handleChange}
//             />
//             <FormInput
//               label="Previous Year Sales"
//               name="Previous_Year_Sales"
//               value={formData.Previous_Year_Sales}
//               onChange={handleChange}
//             />
//             <button
//               type="submit"
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
//             >
//               Analyze Pricing
//             </button>
//           </div>
  
//           {predictionResult && (
//             <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
//               <h3 className="text-lg font-medium text-gray-300 mb-4">Analysis Results</h3>
//               <ResultCard
//                 title="Recommended Price"
//                 value={`$${predictionResult.predicted_price}`}
//               />
//             </div>
//           )}
//         </form>
//       </div>
//     );
//   };
import "./CustomerSegment.css";

export const PricingStrategy = () => {
    const [formData, setFormData] = useState({
      Previous_Year_Price: "",
      Competitor_Price: "",
      Previous_Year_Sales: "",
    });
    const [predictionResult, setPredictionResult] = useState(null);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://127.0.0.1:5000/predict_price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            features: Object.values(formData).map(Number)
          }),
        });
        const result = await response.json();
        setPredictionResult(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <div className="container">
        <h2 className="title">Pricing Strategy</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label>Previous Year Price:</label>
          <input type="number" name="Previous_Year_Price" value={formData.Previous_Year_Price} onChange={handleChange} required />
          <label>Competitor Price:</label>
          <input type="number" name="Competitor_Price" value={formData.Competitor_Price} onChange={handleChange} required />
          <label>Previous Year Sales:</label>
          <input type="number" name="Previous_Year_Sales" value={formData.Previous_Year_Sales} onChange={handleChange} required />
          <button type="submit" className="submit-button">Analyze Pricing</button>
        </form>
  
        {predictionResult && (
          <div className="result-card">
            <h3>Analysis Results</h3>
            <p>Recommended Price: ${predictionResult.predicted_price}</p>
          </div>
        )}
      </div>
    );
};
