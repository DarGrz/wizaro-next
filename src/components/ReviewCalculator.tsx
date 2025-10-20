"use client";

import { useState } from 'react';
import { Calculator, Star, TrendingUp, Target, AlertCircle, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';

interface ScenarioResult {
  rating: number;
  needed: number | null;
}

export default function ReviewCalculator() {
  // State for current reviews
  const [currentAverage, setCurrentAverage] = useState<number>(4);
  const [totalReviews, setTotalReviews] = useState<number>(10);
  
  // State for target
  const [targetAverage, setTargetAverage] = useState<number>(4.5);
  
  // Input display values (for comma/period handling)
  const [currentAverageInput, setCurrentAverageInput] = useState<string>("4");
  const [totalReviewsInput, setTotalReviewsInput] = useState<string>("10");
  const [targetAverageInput, setTargetAverageInput] = useState<string>("4.5");

  // Results
  const [result, setResult] = useState<{
    type: 'add' | 'remove' | 'impossible' | 'difficult' | null;
    count: number;
    rating?: number;
    scenarios?: ScenarioResult[];
    finalRating?: number;
  } | null>(null);

  // Helper to render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // Helper to parse input that may have comma or period as decimal separator
  const parseNumberInput = (value: string): number => {
    // Replace comma with period for parsing
    const normalizedValue = value.replace(/,/g, '.');
    const parsed = parseFloat(normalizedValue);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Input handlers with improved decimal separator handling
  const handleCurrentAverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input or valid decimal numbers with comma or period
    if (inputValue === '' || /^[0-9]*([.,][0-9]*)?$/.test(inputValue)) {
      setCurrentAverageInput(inputValue);
      
      // Only update the actual state if we have a value
      if (inputValue !== '') {
        const parsedValue = parseNumberInput(inputValue);
        setCurrentAverage(parsedValue);
      } else {
        setCurrentAverage(0);
      }
    }
  };

  const handleTotalReviewsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input or valid integers
    if (inputValue === '' || /^[0-9]*$/.test(inputValue)) {
      setTotalReviewsInput(inputValue);
      
      // Only update the actual state if we have a value
      if (inputValue !== '') {
        const parsedValue = parseInt(inputValue);
        setTotalReviews(isNaN(parsedValue) ? 0 : parsedValue);
      } else {
        setTotalReviews(0);
      }
    }
  };

  const handleTargetAverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty input or valid decimal numbers with comma or period
    if (inputValue === '' || /^[0-9]*([.,][0-9]*)?$/.test(inputValue)) {
      setTargetAverageInput(inputValue);
      
      // Only update the actual state if we have a value
      if (inputValue !== '') {
        const parsedValue = parseNumberInput(inputValue);
        setTargetAverage(parsedValue);
      } else {
        setTargetAverage(0);
      }
    }
  };

  // Helper to get rating text color
  const getRatingColor = (rating: number): string => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  // Helper to get progress bar color
  const getProgressColor = (rating: number): string => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-yellow-500';
    if (rating >= 3.5) return 'bg-orange-500';
    return 'bg-red-500';
  };
  // Calculate reviews needed for a specific rating
  const calculateNeededForRating = (starRating: number): number | null => {
    if (currentAverage >= targetAverage) return null;
    
    const currentSum = currentAverage * totalReviews;
    let needed = 0;
    let tempTotalReviews = totalReviews;
    let tempTotalPoints = currentSum;
    
    // For large review counts, we need a higher limit
    const reviewLimit = Math.max(10000, totalReviews);
    
    while ((tempTotalPoints / tempTotalReviews) < targetAverage && needed < reviewLimit) {
      needed++;
      tempTotalReviews++;
      tempTotalPoints += starRating;
    }
    
    return needed < reviewLimit ? needed : null;
  };

  // Calculate function
  const calculateStrategy = () => {
    if (totalReviews === 0) {
      return;
    }

    if (currentAverage === targetAverage) {
      setResult({
        type: null,
        count: 0,
        rating: currentAverage
      });
      return;
    }

    // Current sum of all ratings
    const currentSum = currentAverage * totalReviews;    
    
    if (targetAverage > currentAverage) {
      // Need to add positive reviews to increase average
      
      // For large review counts, we need a higher limit
      const reviewLimit = Math.max(10000, totalReviews);
      
      // Try adding 5-star reviews
      let fiveStarCount = 0;
      let newAvg = currentAverage;
      
      while (newAvg < targetAverage) {
        fiveStarCount++;
        newAvg = (currentSum + (5 * fiveStarCount)) / (totalReviews + fiveStarCount);
        
        // Check if it's becoming impossible (requiring too many reviews)
        if (fiveStarCount > reviewLimit) {
          setResult({
            type: 'impossible',
            count: 0,
            scenarios: [
              { rating: 5, needed: null },
              { rating: 4, needed: null },
              { rating: 3, needed: null }
            ]
          });
          return;
        }
      }
        // Generate scenarios for different star ratings
      const scenarios: ScenarioResult[] = [
        { rating: 5, needed: calculateNeededForRating(5) },
        { rating: 4, needed: calculateNeededForRating(4) },
        { rating: 3, needed: calculateNeededForRating(3) }
      ];
      
      // If we need more than 100 reviews, mark as difficult
      if (fiveStarCount > 100) {
        setResult({
          type: 'difficult',
          count: fiveStarCount,
          rating: 5,
          scenarios,
          finalRating: newAvg
        });
      } else {
        setResult({
          type: 'add',
          count: fiveStarCount,
          rating: 5,
          scenarios,
          finalRating: newAvg
        });
      }
    } else {
      // Need to remove negative reviews to increase average
      
      // For removing reviews, we need to make some assumptions about the distribution
      // Let's assume a typical distribution and calculate how many 1-star reviews need to be removed
      let oneStarRemovalCount = 0;
      let possibleToAchieve = false;
      const estimatedOneStarCount = Math.round(totalReviews * 0.1); // Assume ~10% are 1-star
      
      // Simulate removing 1-star reviews
      let tempTotalReviews = totalReviews;
      let tempCurrentSum = currentSum;
      let finalRating = currentAverage;
      
      for (let i = 0; i < estimatedOneStarCount; i++) {
        tempTotalReviews--;
        tempCurrentSum -= 1; // Remove a 1-star rating
        
        if (tempTotalReviews <= 0) {
          break;
        }
        
        const tempAvg = tempCurrentSum / tempTotalReviews;
        oneStarRemovalCount++;
        finalRating = tempAvg;
        
        if (Math.abs(tempAvg - targetAverage) < 0.01 || tempAvg > targetAverage) {
          possibleToAchieve = true;
          break;
        }
      }
      
      if (possibleToAchieve) {
        setResult({
          type: 'remove',
          count: oneStarRemovalCount,
          rating: 1,
          finalRating: finalRating
        });
      } else {
        setResult({
          type: 'impossible',
          count: 0
        });
      }
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-3 md:p-8 max-w-4xl w-full mx-auto overflow-x-hidden px-2 md:px-4">
      <div className="text-center mb-4 md:mb-8">
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Calculator className="w-5 h-5 md:w-8 md:h-8 text-[#002a5c]" />
          <h2 className="text-lg md:text-2xl font-bold text-gray-800">
            Kalkulator Opinii Google
          </h2>
        </div>
        <p className="text-xs md:text-base text-gray-600">
          Oblicz, ile opinii musisz dodać lub usunąć, aby osiągnąć wybraną średnią ocenę
        </p>      </div>

      <div className="grid md:grid-cols-2 gap-3 md:gap-6">
        {/* Settings panel */}
        <div className="space-y-3 md:space-y-6">
          <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
            <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-[#002a5c]" />
              Obecny stan
            </h3>
              <div className="space-y-3 md:space-y-6">
              <div>
                <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-base font-medium">
                  Średnia ocena
                </label>
                <div className="flex items-center gap-1 md:gap-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    min="1"
                    max="5"                    
                    value={currentAverageInput}
                    onChange={handleCurrentAverageChange}
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 md:px-3 md:py-3 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c]"
                  />
                  <div className="flex-shrink-0 flex">
                    {renderStars(currentAverage)}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-base font-medium">
                  Łączna liczba opinii
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  min="1"
                  value={totalReviewsInput}
                  onChange={handleTotalReviewsChange}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 md:px-3 md:py-3 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c]"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 md:p-6 rounded-lg">
            <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#002a5c]" />
              Cel
            </h3>
            
            <div>
              <label className="block text-gray-700 mb-1 md:mb-2 text-xs md:text-base font-medium">
                Docelowa średnia ocena
              </label>
              <div className="flex items-center gap-1 md:gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  min="1"
                  max="5"
                  value={targetAverageInput}
                  onChange={handleTargetAverageChange}
                  className="flex-1 border border-gray-300 rounded-md px-2 py-1 md:px-3 md:py-3 text-sm md:text-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c]"
                />
                <div className="flex-shrink-0 flex">
                  {renderStars(targetAverage)}
                </div>
              </div>
            </div>
            <div className="mt-3 md:mt-6">
              <button
                onClick={calculateStrategy}
                className="w-full bg-[#002a5c] hover:bg-[#001e47] text-white font-medium py-2 md:py-3 px-4 rounded-md transition duration-200 text-xs md:text-base"
              >
                Oblicz strategię
              </button>
            </div>
          </div>
        </div>

        {/* Results panel */}
        <div className="space-y-3 md:space-y-6">
          {result && (
            <div className="bg-white border-2 border-blue-200 p-3 md:p-6 rounded-lg">
              <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                Wyniki
              </h3>

              {result.type === null && (
                <div className="text-center p-2 md:p-4 bg-green-50 rounded-lg">
                  <div className="text-green-600 font-medium text-xs md:text-base">
                    Już masz średnią ocenę {currentAverage.toFixed(1)}!
                  </div>
                </div>
              )}
              
              {result.type === 'add' && (
                <div className="space-y-3 md:space-y-4">
                  <div className="text-center p-2 md:p-4 bg-green-50 rounded-lg">
                    <div className="text-xl md:text-3xl font-bold text-green-600 mb-1 md:mb-2">
                      {result.count}
                    </div>
                    <div className="text-xs md:text-sm text-green-700">
                      nowych {result.rating}-gwiazdkowych opinii potrzeba
                    </div>
                  </div>                  <div className="grid grid-cols-2 gap-1 md:gap-4">
                    <div className="text-center p-1 md:p-3 bg-gray-50 rounded">
                      <div className="text-sm md:text-lg font-semibold text-gray-800 break-words overflow-hidden">
                        {(totalReviews + result.count).toLocaleString('pl-PL')}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-600">Łączne opinie</div>
                    </div>
                    <div className="text-center p-1 md:p-3 bg-gray-50 rounded">
                      <div className={`text-sm md:text-lg font-semibold ${getRatingColor(result.finalRating || 0)}`}>
                        {result.finalRating?.toFixed(2)}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-600">Finalna ocena</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-2 md:p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-1 md:mb-2">
                      <span className="text-xs md:text-sm font-medium">Postęp do celu</span>
                      <span className="text-xs md:text-sm text-[#002a5c]">
                        {result.finalRating ? ((result.finalRating / 5) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
                      <div
                        className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${getProgressColor(result.finalRating || 0)}`}
                        style={{ width: `${result.finalRating ? (result.finalRating / 5) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {result.type === 'difficult' && (
                <div className="space-y-3 md:space-y-4">
                  <div className="text-center p-2 md:p-4 bg-orange-50 rounded-lg">
                    <div className="text-xl md:text-3xl font-bold text-orange-600 mb-1 md:mb-2">
                      {result.count}
                    </div>
                    <div className="text-xs md:text-sm text-orange-700">
                      nowych {result.rating}-gwiazdkowych opinii potrzeba
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 md:gap-4">
                    <div className="text-center p-1 md:p-3 bg-gray-50 rounded">
                      <div className="text-sm md:text-lg font-semibold text-gray-800">
                        {(totalReviews + result.count).toLocaleString('pl-PL')}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-600">Łączne opinie</div>
                    </div>
                    <div className="text-center p-1 md:p-3 bg-gray-50 rounded">
                      <div className={`text-sm md:text-lg font-semibold ${getRatingColor(result.finalRating || 0)}`}>
                        {result.finalRating?.toFixed(2)}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-600">Finalna ocena</div>
                    </div>
                  </div>

                  <div className="p-2 md:p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-1 md:gap-2 text-orange-700 mb-1 md:mb-2">
                      <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-xs md:text-sm font-medium">Uwaga: Trudne do osiągnięcia</span>
                    </div>
                    <p className="text-xs md:text-sm text-orange-700">
                      Potrzeba ponad 100 nowych opinii, aby osiągnąć docelową średnią. 
                      Rozważ skorzystanie z profesjonalnej pomocy w zarządzaniu opiniami.
                    </p>
                  </div>
                </div>
              )}

              {result.type === 'remove' && (
                <div className="space-y-3 md:space-y-4">
                  <div className="text-center p-2 md:p-4 bg-yellow-50 rounded-lg">
                    <div className="text-xl md:text-3xl font-bold text-yellow-600 mb-1 md:mb-2">
                      {result.count}
                    </div>
                    <div className="text-xs md:text-sm text-yellow-700">
                      {result.rating}-gwiazdkowych opinii do usunięcia
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1 md:gap-4">
                    <div className="text-center p-1 md:p-3 bg-gray-50 rounded">
                      <div className="text-sm md:text-lg font-semibold text-gray-800 break-words">
                        {(totalReviews - result.count).toLocaleString('pl-PL')}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-600">Pozostałe opinie</div>
                    </div>
                    <div className="text-center p-1 md:p-3 bg-gray-50 rounded">
                      <div className={`text-sm md:text-lg font-semibold ${getRatingColor(result.finalRating || 0)}`}>
                        {result.finalRating?.toFixed(2)}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-600">Finalna ocena</div>
                    </div>
                  </div>
                </div>
              )}
              
              {result.type === 'impossible' && (
                <div className="text-center p-2 md:p-4 bg-red-50 rounded-lg">
                  <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-1 md:mb-2" />
                  <div className="text-red-700 text-xs md:text-sm">
                    Osiągnięcie średniej {targetAverage.toFixed(1)} jest trudne przy obecnych ocenach. Spróbuj innej strategii lub skontaktuj się z nami po profesjonalną pomoc.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Scenarios section */}
          {result?.scenarios && (
            <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
              <h3 className="text-sm md:text-lg font-semibold mb-2 md:mb-4">Scenariusze dla różnych ocen</h3>
              <div className="space-y-2 md:space-y-3">
                {result.scenarios.map((scenario) => (
                  <div key={scenario.rating} className="flex items-center justify-between p-2 md:p-3 bg-white rounded border">
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="flex">
                        {renderStars(scenario.rating)}
                      </div>
                      <span className="text-xs md:text-sm text-gray-600">
                        ({scenario.rating} gwiazdek)
                      </span>
                    </div>
                    <div className="font-medium text-[#002a5c] text-xs md:text-sm">
                      {scenario.needed !== null ? `${scenario.needed} opinii` : 'Niemożliwe'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips section */}
          <div className="bg-yellow-50 p-2 md:p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-1 md:mb-2 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
              <Info className="w-3 h-3 md:w-4 md:h-4" /> Wskazówki
            </h4>
            <ul className="text-xs md:text-sm text-yellow-700 space-y-0.5 md:space-y-1">
              <li>• Im wyższa obecna ocena, tym trudniej ją podnieść</li>
              <li>• 5-gwiazdkowe opinie najszybciej podnoszą średnią</li>
              <li>• Regularne zbieranie opinii jest kluczowe</li>
              <li>• Odpowiadaj na wszystkie opinie - pozytywne i negatywne</li>
              <li>• Negatywne opinie można usunąć w określonych przypadkach</li>
            </ul>
          </div>
          
          {/* CTA box */}          <div className="bg-[#002a5c] text-white p-3 md:p-5 rounded-lg">
            <h4 className="font-bold text-sm md:text-lg mb-1 md:mb-2">Potrzebujesz profesjonalnej pomocy?</h4>
            <p className="text-gray-100 mb-2 md:mb-4 text-xs md:text-sm">
              Nasi specjaliści pomogą Ci zoptymalizować Twój profil Google i usunąć negatywne opinie zgodnie z zasadami Google.
            </p>
            <Link 
              href="/" 
              className="block text-center bg-white text-[#002a5c] font-medium py-1.5 md:py-2 px-3 md:px-4 rounded text-xs md:text-sm hover:bg-blue-50 transition duration-200"
            >
              Sprawdź nasze usługi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
