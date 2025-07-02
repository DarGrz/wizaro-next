'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Pole-pułapka na boty
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Usuń błędy podczas wpisywania
    if (formErrors[id as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    // Walidacja imienia
    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane';
      isValid = false;
    }
    
    // Walidacja email
    if (!formData.email.trim()) {
      newErrors.email = 'Adres e-mail jest wymagany';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Podaj poprawny adres e-mail';
      isValid = false;
    }
    
    // Walidacja wiadomości
    if (!formData.message.trim()) {
      newErrors.message = 'Treść wiadomości jest wymagana';
      isValid = false;
    }
    
    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sprawdź honeypot - jeśli wypełniony, to prawdopodobnie bot
    if (formData.honeypot) {
      // Udajemy sukces, ale nie wysyłamy formularza
      setSubmitStatus({
        success: true,
        message: 'Wiadomość została wysłana. Dziękujemy za kontakt!'
      });
      setFormData({ name: '', email: '', message: '', honeypot: '' });
      return;
    }
    
    // Waliduj formularz przed wysłaniem
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: 'Wiadomość została wysłana. Dziękujemy za kontakt!'
        });
        // Resetuj formularz po pomyślnym wysłaniu
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'Wystąpił błąd podczas wysyłania wiadomości.'
        });
      }    } catch (err) {
      console.error('Error sending message:', err);
      setSubmitStatus({
        success: false,
        message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10 bg-white">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-8">Kontakt</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dane kontaktowe</h2>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-6">
                <div className="flex flex-col space-y-4">
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Godziny dostępności:</p>
                    <p className="text-gray-700">Poniedziałek - Piątek<br/><span className="font-medium">9:00 – 17:00</span></p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Telefon:</p>
                    <a href="tel:+48792861513" className="text-[#002a5c] hover:underline font-medium text-lg">
                      +48 792 861 513
                    </a>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Email:</p>
                    <a href="mailto:kontakt@wizaro.pl" className="text-[#002a5c] hover:underline">
                      kontakt@wizaro.pl
                    </a>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900 mb-1">Adres:</p>
                    <p className="text-gray-700">Mistrzejowice<br/>Kraków 31-636</p>
                  </div>
                </div>
              </div>
              
              <a
                href="tel:+48792861513"
                className="inline-flex items-center justify-center w-full md:w-auto bg-[#002a5c] text-white py-3 px-6 rounded-lg hover:bg-[#001e47] transition font-medium"
              >
                Zadzwoń teraz
              </a>
            </div>
            
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Formularz kontaktowy</h2>
              
              {submitStatus && (
                <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-[#5BA155] bg-opacity-10 text-[#5BA155] border border-[#5BA155] border-opacity-20' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Honeypot field - hidden for humans, but bots might fill it */}
                <div className="hidden">
                  <input
                    type="text"
                    id="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent`}
                    required
                    disabled={isSubmitting}
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Adres e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full border ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent`}
                    required
                    disabled={isSubmitting}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Wiadomość
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full border ${formErrors.message ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent`}
                    required
                    disabled={isSubmitting}
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#002a5c] text-white py-3 px-6 rounded-lg hover:bg-[#001e47] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Wizaro.pl - Usuwanie negatywnych opinii i profili z internetu</h2>
          
          <div className="text-gray-700 space-y-4">
            <p>
              Specjalizujemy się w ochronie wizerunku firm w sieci. Pomagamy usuwać niechciane treści i profile,
              które mogą negatywnie wpływać na reputację Twojego biznesu.
            </p>
            <p>
              Skontaktuj się z nami, jeśli potrzebujesz profesjonalnej pomocy w zarządzaniu swoją obecnością w internecie.
              Oferujemy kompleksowe usługi oraz indywidualne podejście do każdego klienta.
            </p>
          </div>
          
          <div className="text-center text-gray-500 text-sm mt-6 pt-4 border-t border-gray-100">
            NIP: 6782978644<br />
            Kraków, 31-636
          </div>
        </div>
      </div>
    </div>
  );
}
