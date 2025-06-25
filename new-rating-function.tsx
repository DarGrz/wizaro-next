  // Generate star rating display
  const renderStarRating = (rating?: number) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    // Determine star color based on rating thresholds
    let starColor = "text-[#5DA157]"; // Default green for good ratings
    
    if (rating < 3.3) {
      starColor = "text-red-600"; // Red for very bad ratings
    } else if (rating < 4.0) {
      starColor = "text-yellow-500"; // Yellow for bad ratings
    }
    
    return (
      <div>
        <div className="flex items-center mt-1">
          {[...Array(fullStars)].map((_, i) => (
            <svg key={`full-${i}`} className={`w-4 h-4 md:w-5 md:h-5 ${starColor}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          
          {halfStar && (
            <svg className={`w-4 h-4 md:w-5 md:h-5 ${starColor}`} fill="currentColor" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#d1d5db" />
                </linearGradient>
              </defs>
              <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          )}
          
          {[...Array(emptyStars)].map((_, i) => (
            <svg key={`empty-${i}`} className="w-4 h-4 md:w-5 md:h-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          
          <span className={`ml-1 text-xs md:text-sm ${rating < 3.3 ? 'text-red-600 font-medium' : rating < 4.0 ? 'text-yellow-600 font-medium' : 'text-gray-600'}`}>({rating.toFixed(1)})</span>
        </div>
        
        {rating < 3.3 && (
          <div className="mt-1 text-red-600 text-xs md:text-sm font-medium">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Wizytówka nadaje się do usunięcia! Tracisz bardzo dużo klientów przez złe opinie!
            </span>
          </div>
        )}
        
        {rating >= 3.3 && rating < 4.0 && (
          <div className="mt-1 text-yellow-600 text-xs md:text-sm">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              Wizytówka nadaje się do usunięcia. Tracisz dużo klientów przez złe opinie.
            </span>
          </div>
        )}
      </div>
    );
  };
