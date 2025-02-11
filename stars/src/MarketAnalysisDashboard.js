import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Users, Tag, BarChart2 } from 'lucide-react';
import { CustomerSegment } from './components/CustomerSegment';
import { PricingStrategy } from './components/PricingStrategy';
import { MarketCompetition } from './components/MarketCompetition';


const NavLink = ({ to, icon, text }) => (
  <Link to={to} className="group flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700 transition duration-300">
    <span className="mr-2">{icon}</span>
    {text}
  </Link>
);

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <nav className="backdrop-blur-md bg-opacity-80 bg-gray-900 border-b border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          <h1 className="text-3xl font-extrabold text-blue-400 drop-shadow-lg">Market Analyzer Pro</h1>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/customer" icon={<Users className="w-5 h-5 text-blue-300" />} text="Customer Segmentation" />
            <NavLink to="/price" icon={<Tag className="w-5 h-5 text-green-300" />} text="Pricing Strategy" />
            <NavLink to="/shares" icon={<BarChart2 className="w-5 h-5 text-yellow-300" />} text="Market Share" />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-gray-900/80 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-gray-700">
          {children}
        </div>
      </main>
    </div>
  );
};

const MarketAnalysisDashboard = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/customer" element={<CustomerSegment />} />
          <Route path="/price" element={<PricingStrategy />} />
          <Route path="/shares" element={<MarketCompetition />} />
          <Route path="/" element={
            <div className="text-center py-12">
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-xl">Welcome to Market Analyzer Pro</h2>
              <p className="text-lg text-gray-300 mb-10">Choose a tool from the navigation menu to get started</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[{ to: '/customer', text: 'Customer Segmentation', icon: <Users className='w-12 h-12 text-blue-400' /> },
                  { to: '/price', text: 'Pricing Strategy', icon: <Tag className='w-12 h-12 text-green-400' /> },
                  { to: '/shares', text: 'Market Share', icon: <BarChart2 className='w-12 h-12 text-yellow-400' /> }
                ].map(({ to, text, icon }) => (
                  <div key={to} className="transition transform hover:scale-105 active:scale-95">
                    <Link to={to} className="block p-6 bg-gray-900/80 rounded-xl border border-gray-700 shadow-xl hover:shadow-2xl">
                      <div className="flex flex-col items-center">
                        {icon}
                        <h3 className="text-xl font-semibold text-white mt-3">{text}</h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          } />
        </Routes>
      </Layout>
    </Router>
  );
};

export default MarketAnalysisDashboard;

// import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import { CustomerSegment } from './components/CustomerSegment';
// import { PricingStrategy } from './components/PricingStrategy';
// import { MarketCompetition } from './components/MarketCompetition';
// import "./dashboardStyles.css";

// const NavLink = ({ to, text }) => (
//   <Link to={to} className="nav-link">{text}</Link>
// );

// const Layout = ({ children }) => {
//   return (
//     <div className="container">
//       <nav className="navbar">
//         <h1 className="logo">Market Analyzer Pro</h1>
//         <div className="nav-links">
//           <NavLink to="/customer" text="Customer Segmentation" />
//           <NavLink to="/price" text="Pricing Strategy" />
//           <NavLink to="/shares" text="Market Share" />
//         </div>
//       </nav>
//       <main className="content">{children}</main>
//     </div>
//   );
// };

// const MarketAnalysisDashboard = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           <Route path="/customer" element={<CustomerSegment />} />
//           <Route path="/price" element={<PricingStrategy />} />
//           <Route path="/shares" element={<MarketCompetition />} />
//           <Route path="/" element={
//             <div className="welcome">
//               <h2 className="welcome-title">Welcome to Market Analyzer Pro</h2>
//               <p className="welcome-text">Choose a tool from the navigation menu to get started</p>
//               <div className="grid-container">
//                 {[{ to: '/customer', text: 'Customer Segmentation' },
//                   { to: '/price', text: 'Pricing Strategy' },
//                   { to: '/shares', text: 'Market Share' }
//                 ].map(({ to, text }) => (
//                   <div key={to} className="grid-item">
//                     <Link to={to} className="grid-link">{text}</Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           } />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default MarketAnalysisDashboard;
