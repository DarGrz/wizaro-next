import { useEffect } from 'react';

export function useTrackVisitor() {
  useEffect(() => {
    // Check if we're running in the browser
    if (typeof window === 'undefined') return;

    function getUrlParams() {
      const params = new URLSearchParams(window.location.search);
      let keyword = params.get('keyword') || 'No Keyword';
      const gclid = params.get('gclid') || 'No GCLID';

      keyword = keyword.replace(/-/g, ' ')
                     .replace(/\s+/g, ' ')
                     .trim();

      return { keyword, gclid };
    }

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

        const { keyword, gclid } = getUrlParams();

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
            keyword,
            gclid,
          }),
        });
      } catch (error) {
        console.error('Visitor tracking failed:', error);
      }
    };

    trackVisitor();
  }, []);
}