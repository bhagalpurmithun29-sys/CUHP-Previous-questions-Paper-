import React from 'react';
import { Helmet } from 'react-helmet-async'; // Assuming helmet is in tech stack for SEO, or simple HTML tags
import { HeroSection } from '../components/home/HeroSection';
import { FeatureSection } from '../components/home/FeatureSection';
import { StatisticsSection } from '../components/home/StatisticsSection';
import { LatestPapersSection } from '../components/home/LatestPapersSection';
import { TopContributorsSection } from '../components/home/TopContributorsSection';
import { FAQPreview } from '../components/home/FAQPreview';
import { CTASection } from '../components/home/CTASection';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* Simple SEO implementation since React Helmet isn't explicitly in prompt but required by SEO instructions */}
      <title>CUHP Question Bank | Previous Year Papers</title>
      <meta name="description" content="Access thousands of previous year question papers, mid-terms, and final exams for Central University of Himachal Pradesh." />
      
      {/* Open Graph */}
      <meta property="og:title" content="CUHP Question Bank" />
      <meta property="og:description" content="The official centralized platform for CUHP students to access and share academic question papers." />
      <meta property="og:type" content="website" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="CUHP Question Bank" />
      <meta name="twitter:description" content="Access thousands of previous year question papers." />

      {/* Structured Data / JSON-LD Placeholder */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "CUHP Question Bank",
            "url": "https://cuhp-qb.ac.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://cuhp-qb.ac.in/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </script>

      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <StatisticsSection />
        <FeatureSection />
        <LatestPapersSection />
        <TopContributorsSection />
        <FAQPreview />
        <CTASection />
      </div>
    </>
  );
};
