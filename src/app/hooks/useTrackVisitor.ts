import { useEffect } from 'react';

export function useTrackVisitor() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const url = new URL(window.location.href);

        const utm = {
          source: url.searchParams.get('utm_source'),
          medium: url.searchParams.get('utm_medium'),
          campaign: url.searchParams.get('utm_campaign'),
          term: url.searchParams.get('utm_term'),
          keyword: url.searchParams.get('utm_keyword'),
        };

        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip_address: null, // Możesz pobrać na backendzie z nagłówka x-forwarded-for
            user_agent: navigator.userAgent,
            referrer: document.referrer,
            landing_page: window.location.pathname,
            utm,
          }),
        });
      } catch (error) {
        console.error('Visitor tracking failed:', error);
      }
    };

    trackVisitor();
  }, []);
}
