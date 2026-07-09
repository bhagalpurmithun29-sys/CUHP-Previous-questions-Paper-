import React from 'react';
import { ExplorerLayout } from '../components/explorer/ExplorerLayout';

export const PublicExplorerPage: React.FC = () => {
  return (
    <>
      <title>Explore Question Papers | CUHP</title>
      <meta name="description" content="Browse, search, and download approved previous year question papers for the Central University of Himachal Pradesh." />
      
      {/* Breadcrumb Structured Data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://cuhp-qb.ac.in/"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "Explorer",
              "item": "https://cuhp-qb.ac.in/search"
            }]
          }
        `}
      </script>

      <ExplorerLayout />
    </>
  );
};
