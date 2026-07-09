import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: any;
}

const SITE_TITLE = 'CUHP Question Bank';
const DEFAULT_DESCRIPTION = 'The official CUHP Question Bank repository for previous year question papers, academic materials, and resources.';

export const useSEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  ogImage = '/og-image.png',
  ogType = 'website',
  jsonLd
}: SEOProps) => {
  useEffect(() => {
    // 1. Dynamic Title
    const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
    document.title = fullTitle;

    // Helper to set meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta Description
    setMetaTag('name', 'description', description);

    // 3. Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', `${window.location.origin}${ogImage}`);
    setMetaTag('property', 'og:url', canonicalUrl || window.location.href);

    // 4. Twitter Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', `${window.location.origin}${ogImage}`);

    // 5. Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl || window.location.href);

    // 6. JSON-LD Structured Data
    const existingJsonLd = document.getElementById('json-ld-schema');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }
    
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup json-ld on unmount if needed, or leave it for the next page to overwrite
    };
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLd]);
};
