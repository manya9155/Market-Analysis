import React, { useState } from "react";
import "./CustomerSegment.css"

export const MarketCompetition = () => {
    const [formData, setFormData] = useState({
      Competitor_Sales: "",
      Advertising_Spend: "",
      Price: "",
      Customer_Rating: "",
      Product_Availability: "",
    });
    const [predictionResult, setPredictionResult] = useState(null);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://127.0.0.1:5000/market_share_prediction", {
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
        <h2 className="title">Market Share Prediction</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label>Competitor Sales:</label>
          <input type="number" name="Competitor_Sales" value={formData.Competitor_Sales} onChange={handleChange} required />
          <label>Advertising Spend:</label>
          <input type="number" name="Advertising_Spend" value={formData.Advertising_Spend} onChange={handleChange} required />
          <label>Price:</label>
          <input type="number" name="Price" value={formData.Price} onChange={handleChange} required />
          <label>Customer Rating:</label>
          <input type="number" name="Customer_Rating" value={formData.Customer_Rating} onChange={handleChange} required />
          <label>Product Availability:</label>
          <input type="number" name="Product_Availability" value={formData.Product_Availability} onChange={handleChange} required />
          <button type="submit" className="submit-button">Predict Market Share</button>
        </form>
  
        {predictionResult && (
          <div className="result-card">
            <h3>Prediction Results</h3>
            <p>Predicted Market Share: {predictionResult.prediction[0].toFixed(2)}%</p>
          </div>
        )}
      </div>
    );
};



// export const MarketCompetition = () => {
//     const [formData, setFormData] = useState({
//       Competitor_Sales: "",
//       Advertising_Spend: "",
//       Price: "",
//       Customer_Rating: "",
//       Product_Availability: "",
//     });
//     const [predictionResult, setPredictionResult] = useState(null);
  
//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       try {
//         const response = await fetch("http://127.0.0.1:5000/market_share_prediction", {
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
//           {/* <BarChart2 className="w-6 h-6 text-blue-400" /> */}
//           <h2 className="text-xl font-bold text-white">Market Share Prediction</h2>
//         </div>
  
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <FormInput
//               label="Competitor Sales"
//               name="Competitor_Sales"
//               value={formData.Competitor_Sales}
//               onChange={handleChange}
//             />
//             <FormInput
//               label="Advertising Spend"
//               name="Advertising_Spend"
//               value={formData.Advertising_Spend}
//               onChange={handleChange}
//             />
//             <FormInput
//               label="Price"
//               name="Price"
//               value={formData.Price}
//               onChange={handleChange}
//             />
//             <FormInput
//               label="Customer Rating"
//               name="Customer_Rating"
//               value={formData.Customer_Rating}
//               onChange={handleChange}
//             />
//             <FormInput
//               label="Product Availability"
//               name="Product_Availability"
//               value={formData.Product_Availability}
//               onChange={handleChange}
//             />
//             <button
//               type="submit"
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
//             >
//               Predict Market Share
//             </button>
//           </div>
  
//           {predictionResult && (
//             <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
//               <h3 className="text-lg font-medium text-gray-300 mb-4">Prediction Results</h3>
//               <ResultCard
//                 title="Predicted Market Share"
//                 value={`${predictionResult.prediction[0].toFixed(2)}%`}
//               />
//             </div>
//           )}
//         </form>
//       </div>
//     );
//   };