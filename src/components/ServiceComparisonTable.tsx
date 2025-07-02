"use client";

import React, { useState } from "react";

export default function ServiceComparisonTable() {
  const [activeTab, setActiveTab] = useState("nasza-firma");
  
  const comparisonData = [
    {
      aspect: "Skuteczność",
      ourCompany: { value: "✅ 98%", highlight: true },
      selfAction: { value: "❌ niska", highlight: false },
      marketingAgency: { value: "⚠️ zależna od zakresu", highlight: false },
    },
    {
      aspect: "Czas realizacji",
      ourCompany: { value: "✅ do 21 dni", highlight: true },
      selfAction: { value: "❌ brak gwarancji", highlight: false },
      marketingAgency: { value: "⚠️ różnie", highlight: false },
    },
    {
      aspect: "Obsługa formalna",
      ourCompany: { value: "✅ kompleksowa", highlight: true },
      selfAction: { value: "❌ samodzielna", highlight: false },
      marketingAgency: { value: "⚠️ zależna", highlight: false },
    },
    {
      aspect: "Koszty",
      ourCompany: { value: "✅ stałe / niskie", highlight: true },
      selfAction: { value: "❌ czas = koszt", highlight: false },
      marketingAgency: { value: "⚠️ wysokie", highlight: false },
    },
  ];

  return (
    <div className="w-full py-10 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Porównanie naszych usług z alternatywami
      </h2>
      
      {/* Desktop view - hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#002a5c] text-white">
              <th className="px-4 py-3 text-left border border-gray-300 rounded-tl-lg">Usługa</th>
              <th className="px-4 py-3 text-center border border-gray-300">Nasza firma</th>
              <th className="px-4 py-3 text-center border border-gray-300">Samodzielne działanie</th>
              <th className="px-4 py-3 text-center border border-gray-300 rounded-tr-lg">Agencja marketingowa</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr 
                key={index} 
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 font-medium border border-gray-300">{row.aspect}</td>
                <td className={`px-4 py-3 text-center border border-gray-300 ${row.ourCompany.highlight ? "bg-blue-50" : ""}`}>
                  <div className="text-md">{row.ourCompany.value}</div>
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <div className="text-md">{row.selfAction.value}</div>
                </td>
                <td className="px-4 py-3 text-center border border-gray-300">
                  <div className="text-md">{row.marketingAgency.value}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile view - visible only on small screens */}
      <div className="md:hidden">
        {/* Tabs for mobile */}
        <div className="flex rounded-t-lg overflow-hidden mb-4 border border-gray-200">
          <button 
            className={`flex-1 py-3 px-2 text-sm font-medium text-center ${activeTab === 'nasza-firma' ? 'bg-[#002a5c] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('nasza-firma')}
          >
            Nasza firma
          </button>
          <button 
            className={`flex-1 py-3 px-2 text-sm font-medium text-center ${activeTab === 'samodzielnie' ? 'bg-[#002a5c] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('samodzielnie')}
          >
            Samodzielnie
          </button>
          <button 
            className={`flex-1 py-3 px-2 text-sm font-medium text-center ${activeTab === 'agencja' ? 'bg-[#002a5c] text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('agencja')}
          >
            Agencja
          </button>
        </div>
        
        {/* Content based on active tab */}
        <div className="border border-gray-200 rounded-b-lg bg-white p-4">
          <div className="space-y-4">
            {comparisonData.map((row, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="font-medium">{row.aspect}</div>
                {activeTab === 'nasza-firma' && (
                  <div className="text-right font-medium text-[#002a5c]">{row.ourCompany.value}</div>
                )}
                {activeTab === 'samodzielnie' && (
                  <div className="text-right text-red-500">{row.selfAction.value}</div>
                )}
                {activeTab === 'agencja' && (
                  <div className="text-right text-yellow-600">{row.marketingAgency.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Wybierając naszą usługę, zyskujesz gwarancję skuteczności, szybkości działania i transparentnych kosztów.
      </div>
    </div>
  );
}

