import React from 'react';
import { AboutHero } from '../components/about/AboutHero';
import { AboutCUHP } from '../components/about/AboutCUHP';
import { AboutPlatform } from '../components/about/AboutPlatform';
import { MissionVision } from '../components/about/MissionVision';
import { FeatureTimeline } from '../components/about/FeatureTimeline';
import { TechnologyStack } from '../components/about/TechnologyStack';
import { RoadmapSection } from '../components/about/RoadmapSection';
import { ContributorsSection } from '../components/about/ContributorsSection';
import { OpenSourceSection } from '../components/about/OpenSourceSection';
import { FAQSection } from '../components/about/FAQSection';
import { CallToAction } from '../components/about/CallToAction';

export const AboutPage: React.FC = () => {
  return (
    <>
      <title>About | CUHP Question Bank</title>
      <meta name="description" content="Learn about the CUHP Question Bank platform, our mission, vision, and the technology stack powering this academic resource." />
      
      <meta property="og:title" content="About | CUHP Question Bank" />
      <meta property="og:description" content="Learn about the CUHP Question Bank platform, our mission, vision, and the technology stack powering this academic resource." />
      <meta property="og:type" content="website" />
      
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About CUHP Question Bank",
            "description": "Information about the independent student-focused academic resource platform for CUHP."
          }
        `}
      </script>

      <div className="flex flex-col min-h-screen">
        <AboutHero />
        <AboutCUHP />
        <AboutPlatform />
        <MissionVision />
        <FeatureTimeline />
        <TechnologyStack />
        <RoadmapSection />
        <ContributorsSection />
        <OpenSourceSection />
        <FAQSection />
        <CallToAction />
      </div>
    </>
  );
};
