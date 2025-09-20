'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Trash2, RotateCcw, ShieldX, ArrowRight, Building2, Globe, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import CompanyFormReviewsGoogle from './CompanyFormReviewsGoogle';
import GoogleRemovalForm from './gmbremoval/GoogleRemovalForm';

interface CompanyData {
  name: string;
  address: string;
  phoneNumber?: string;
  rating?: number;
  reviewCount?: number;
  googleMapsUrl?: string;
  placeId?: string;
  website?: string;
  photos?: string[];
  user_ratings_total?: number;
}

const serviceOptions = [
  {
    id: 'reviews',
    title: 'Usuwanie Opinii Google',
    description: 'Profesjonalne usuwanie negatywnych opinii z Google Maps',
    icon: Trash2,
    color: 'from-red-500 to-pink-600',
    hoverColor: 'hover:from-red-400 hover:to-pink-500',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    features: [
      'Usuwanie fałszywych opinii',
      'Zgłaszanie niewłaściwych komentarzy', 
      'Monitoring nowych opinii',
      'Raportowanie postępów'
    ]
  },
  {
    id: 'reset',
    title: 'Resetowanie wizytówki Google',
    description: 'Kompleksowe odświeżenie profilu Google Business',
    icon: RotateCcw,
    color: 'from-blue-500 to-cyan-600',
    hoverColor: 'hover:from-blue-400 hover:to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    features: [
      'Resetowanie negatywnych opinii',
      'Odświeżenie informacji firmowych',
      'Poprawa widoczności w wyszukiwaniu',
      'Nowy start dla Twojej firmy'
    ]
  },
  {
    id: 'removal',
    title: 'Usuwanie Wizytówki Google',
    description: 'Całkowite usunięcie profilu z Google Maps i wyszukiwarki',
    icon: ShieldX,
    color: 'from-gray-600 to-gray-800',
    hoverColor: 'hover:from-gray-500 hover:to-gray-700',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600',
    features: [
      'Pełne usunięcie z Google Maps',
      'Zniknięcie z wyników wyszukiwania',
      'Ochrona prywatności',
      'Legalny proces usuwania'
    ]
  }
];

export default function FormularzGooglePage() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Pobieranie danych firmy z URL params lub localStorage
    const name = searchParams.get('name');
    const address = searchParams.get('address');
    const phone = searchParams.get('phone');
    const rating = searchParams.get('rating');
    const reviewCount = searchParams.get('reviewCount');
    const placeId = searchParams.get('placeId');
    const website = searchParams.get('website');

    if (name && address) {
      setCompanyData({
        name,
        address,
        phoneNumber: phone || undefined,
        rating: rating ? parseFloat(rating) : undefined,
        reviewCount: reviewCount ? parseInt(reviewCount) : undefined,
        user_ratings_total: reviewCount ? parseInt(reviewCount) : undefined,
        placeId: placeId || undefined,
        website: website || undefined
      });
    } else {
      // Fallback - próba pobrania z localStorage
      const savedData = localStorage.getItem('selectedCompany');
      if (savedData) {
        try {
          setCompanyData(JSON.parse(savedData));
        } catch (error) {
          console.error('Błąd parsowania danych firmy:', error);
        }
      }
    }
  }, [searchParams]);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    
    // Zapisanie wybranej usługi i danych firmy
    if (companyData) {
      localStorage.setItem('selectedService', serviceId);
      localStorage.setItem('selectedCompany', JSON.stringify(companyData));
      
      // Ustawienie danych w localStorage w formacie oczekiwanym przez istniejące komponenty
      if (serviceId === 'reviews') {
        localStorage.setItem('selectedBusiness', JSON.stringify({
          name: companyData.name,
          address: companyData.address,
          placeId: companyData.placeId,
          rating: companyData.rating,
          user_ratings_total: companyData.user_ratings_total
        }));
      } else if (serviceId === 'reset' || serviceId === 'removal') {
        localStorage.setItem('selectedGmb', JSON.stringify({
          name: companyData.name,
          address: companyData.address,
          phoneNumber: companyData.phoneNumber,
          website: companyData.website,
          photos: companyData.photos || [],
          placeId: companyData.placeId,
          rating: companyData.rating,
          user_ratings_total: companyData.user_ratings_total
        }));
      }
    }

    setShowForm(true);
  };

  if (showForm && selectedService && companyData) {
    if (selectedService === 'reviews') {
      return <CompanyFormReviewsGoogle />;
    } else if (selectedService === 'reset' || selectedService === 'removal') {
      return <GoogleRemovalForm />;
    }
  }

  if (!companyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Brak danych firmy</h2>
          <p className="text-gray-600 mb-6">Wróć do wyszukiwania i wybierz firmę ponownie.</p>
          <Link 
            href="/unozg"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Wróć do wyszukiwania
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#002a5c] mb-4">
            Wybierz odpowiednią usługę
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dopasuj rozwiązanie do swoich potrzeb biznesowych
          </p>
        </motion.div>

        {/* Company Card - using the same style as search page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#002a5c] mb-2">
                    {companyData.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{companyData.address}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    {companyData.rating && (
                      <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-400 mr-2 fill-current" />
                        <span className="font-semibold text-gray-800">
                          {companyData.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-600 ml-1">
                          ({companyData.user_ratings_total || companyData.reviewCount} opinii)
                        </span>
                      </div>
                    )}

                    {companyData.phoneNumber && (
                      <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg">
                        <Phone className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-gray-800 font-medium">{companyData.phoneNumber}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{companyData.address}</span>
                    </div>
                    
                    {companyData.website && (
                      <div className="flex items-center">
                        <Globe className="w-5 h-5 text-gray-400 mr-3" />
                        <a 
                          href={companyData.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#002a5c] hover:underline flex items-center"
                        >
                          Strona internetowa
                          <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Options */}
        <div className="space-y-6">
          {serviceOptions.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleServiceSelect(service.id)}
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-start space-x-6">
                  <div className={`
                    w-16 h-16 rounded-xl flex items-center justify-center
                    ${service.bgColor} group-hover:scale-110 transition-transform duration-300
                  `}>
                    <service.icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#002a5c]">
                        {service.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#002a5c] group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#002a5c] rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link
            href="/unozg"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition-colors duration-300 shadow-sm"
          >
            ← Wróć do wyszukiwania
          </Link>
        </motion.div>
      </div>
    </div>
  );
}