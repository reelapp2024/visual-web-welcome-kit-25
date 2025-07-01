import React, { useEffect, useState } from 'react';
import { httpFile } from "../../../config.js";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CleaningHeader from '../components/CleaningHeader';
import CleaningHero from '../components/CleaningHero';
import CleaningCTA from '../components/CleaningCTA';
import CleaningAboutUs from '../components/CleaningAboutUs';
import CleaningTestimonials from '../components/CleaningTestimonials';
import CleaningFooter from '../components/CleaningFooter';
import CleaningMissionVision from '../components/CleaningMissionVision';
import CleaningValues from '../components/CleaningValues';
import CleaningUSP from '../components/CleaningUSP';

const CleaningAbout = () => {
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });

  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const seoResponse = await httpFile.get(`/webapp/v1/seo/about`);
        setSeoData(seoResponse.data.data);
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };

    fetchSeoData();
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoData.meta_title }</title>
        <meta name="description" content={seoData.meta_description } />
        <meta name="keywords" content={seoData.meta_keywords } />
      </Helmet>
      
      <div className="min-h-screen font-poppins">
        <CleaningHeader />
        <CleaningHero />
        <CleaningAboutUs />
        <CleaningCTA />
        <CleaningMissionVision />
        <CleaningCTA />
        <CleaningValues />
        <CleaningCTA />
        <CleaningUSP />
        <CleaningCTA />
        <CleaningTestimonials />
        <CleaningFooter />
      </div>
    </HelmetProvider>
  );
};

export default CleaningAbout;
