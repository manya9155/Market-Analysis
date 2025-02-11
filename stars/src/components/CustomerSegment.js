import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// const CustomerSegment = () => {
//     const [formData, setFormData] = useState({
//         sales: "",
//         price: "",
    
//     });
//     const navigate = useNavigate()
//     const gotToNewPage=()=>{
//         navigate("/customer");
//       }

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
    
//         // Ensure we send an array (not an object)
//         const formattedData = [
//             Number(formData.sales), 
//             Number(formData.price)
//         ];
    
//         console.log("Sending data:", JSON.stringify({ features: formattedData })); // Debugging log
    
//         try {
//             const response = await fetch("http://127.0.0.1:5000/segment_customer", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ features: formattedData }), // Send as an array
//             });
    
//             const result = await response.json();
//             console.log("API response:", result);
//             setPredictionResult(result);
//         } catch (error) {
//             console.error("Error fetching API:", error);
//         }
//     };
    

//     return (
//         <div>
//             <h2>Customer Segmentation</h2>
//             <form onSubmit={handleSubmit}>
//             <label>Sales:</label>
//                      <input type="number" name="sales"  value={formData.sales} onChange={handleChange} required /><br />
//                      <label>Price:</label>
//                      <input type="number" name="price"  value={formData.price} onChange={handleChange} required /><br />
//                 <button type="submit">Segment</button>
//             </form>

//             {predictionResult && (
//                 <div className="result">
//                     <p>Customer belongs to cluster number: {predictionResult.cluster}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CustomerSegment;
// export const CustomerSegment = () => {
//     const [formData, setFormData] = useState({
//       sales: "",
//       price: "",
//     });
//     const [predictionResult, setPredictionResult] = useState(null);
  
//     const handleChange = (event) => {
//       const { name, value } = event.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       try {
//         const response = await fetch("http://127.0.0.1:5000/segment_customer", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             features: [Number(formData.sales), Number(formData.price)]
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
//           {/* <Users className="w-6 h-6 text-blue-400" /> */}
//           <h2 className="text-xl font-bold text-white">Customer Segmentation</h2>
//         </div>
  
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <FormInput
//               label="Sales"
//               name="sales"
//               value={formData.sales}
//               onChange={handleChange}
//             />
//             <FormInput
//               label="Price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//             />
//             <button
//               type="submit"
//               className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors duration-200"
//             >
//               Analyze Segment
//             </button>
//           </div>
  
//           {predictionResult && (
//             <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
//               <h3 className="text-lg font-medium text-gray-300 mb-4">Segmentation Results</h3>
//               <ResultCard
//                 title="Customer Cluster"
//                 value={`Segment ${predictionResult.cluster}`}
//               />
//             </div>
//           )}
//         </form>
//       </div>
//     );
//   };

import "./CustomerSegment.css";

export const CustomerSegment = () => {
    const [formData, setFormData] = useState({
      sales: "",
      price: "",
    });
    const [predictionResult, setPredictionResult] = useState(null);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://127.0.0.1:5000/segment_customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            features: [Number(formData.sales), Number(formData.price)]
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
        <h2 className="title">Customer Segmentation</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label>Sales:</label>
          <input type="number" name="sales" value={formData.sales} onChange={handleChange} required />
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          <button type="submit" className="submit-button">Analyze Segment</button>
        </form>
  
        {predictionResult && (
          <div className="result-card">
            <h3>Segmentation Results</h3>
            <p>Customer belongs to cluster number: {predictionResult.cluster}</p>
          </div>
        )}
      </div>
    );
};
