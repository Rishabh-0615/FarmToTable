import React from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';
import VegetablePricePredictor from './model1';
import VegetableDemandPredictor from './Model2'; 


const PredictionMenu = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            Market Predictions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose a prediction method to analyze and forecast market trends for your agricultural products
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
          {/* Predict Demand Button */}
          <button 
            onClick={() => navigate('/Model2')}
            className="w-full md:w-96 h-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden border-2 border-transparent hover:border-green-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1dcc75] to-[#19b25e] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="p-8 flex flex-col items-center justify-center h-full">
              <TrendingUp className="w-16 h-16 text-green-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-xl font-semibold text-green-800 mb-2">Predict Demand</h2>
              <p className="text-gray-600 text-center">
                Analyze market trends and patterns to forecast future demand for your products
              </p>
            </div>
          </button>

          {/* Predict Price Button */}
          <button 
            onClick={() => navigate('/model1')}
            className="w-full md:w-96 h-64 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden border-2 border-transparent hover:border-green-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1dcc75] to-[#19b25e] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="p-8 flex flex-col items-center justify-center h-full">
              <IndianRupee className="w-16 h-16 text-green-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-xl font-semibold text-green-800 mb-2">Predict Price</h2>
              <p className="text-gray-600 text-center">
                Get price forecasts based on market conditions and historical trends
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionMenu;