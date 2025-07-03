import React, { useEffect, useState } from 'react';
import SEOHelmet from '../../../components/SEOHelmet';
import { useProjectId } from '../../../hooks/useProjectId.js';
import { httpFile } from "../../../config.js";
import { slugify } from "../../../extras/slug";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CleaningHeader from '../components/CleaningHeader';
import CleaningAboutUs from '../components/CleaningAboutUs';
import CleaningWhyChooseUs from '../components/CleaningWhyChooseUs';
import CleaningCTA from '../components/CleaningCTA';
import CleaningProcess from '../components/CleaningProcess';
import CleaningGuarantee from '../components/CleaningGuarantee';
import CleaningTestimonials from '../components/CleaningTestimonials';
import CleaningFooter from '../components/CleaningFooter';
import { Sparkles } from 'lucide-react';

const CleaningAbout = () => {
  const [aboutHeroText, setAboutHeroText] = useState('');
  const projectId = useProjectId();

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) return;
      
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.projectInfo && data.projectInfo.aboutHeroText) {
          setAboutHeroText(data.projectInfo.aboutHeroText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <>
      <SEOHelmet pageUrl="/about" />
      
      <div className="min-h-screen font-poppins">
        <CleaningHeader />
        
        {/* About Hero */}
        <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden min-h-[500px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">About Our Cleaning Services</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              {aboutHeroText || 'Learn more about our professional cleaning services and commitment to excellence.'}
            </p>
          </div>
        </section>

        <CleaningAboutUs />
        <CleaningWhyChooseUs />
        <CleaningCTA />
        <CleaningProcess />
        <CleaningGuarantee />
        <CleaningTestimonials />
        <CleaningCTA />
        <CleaningFooter />
      </div>
    </>
  );
};

export default CleaningAbout;
