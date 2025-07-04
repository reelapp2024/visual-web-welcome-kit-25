
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpFile } from "../../../config.js";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSEO } from '../../../hooks/useSEO';
import CleaningHeader from '../components/CleaningHeader';
import CleaningCTA from '../components/CleaningCTA';
import CleaningServices from '../components/CleaningServices';
import CleaningWhyChooseUs from '../components/CleaningWhyChooseUs';
import CleaningGuarantee from '../components/CleaningGuarantee';
import CleaningProcess from '../components/CleaningProcess';
import CleaningServiceAreas from '../components/CleaningServiceAreas';
import CleaningFAQ from '../components/CleaningFAQ';
import CleaningFooter from '../components/CleaningFooter';
import DynamicIcon from '../../../extras/DynamicIcon.js';

const CleaningServicesPage = () => {
  const { seoData } = useSEO('/services');
  const navigate = useNavigate();
  const [serviceHeroText, setServiceHeroText] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.projectInfo && data.projectInfo.serviceHeroText) {
          setServiceHeroText(data.projectInfo.serviceHeroText);
          setServiceType(data.projectInfo.serviceType);
        }
        if (data.aboutUs && data.aboutUs.phone) {
          setPhoneNumber(data.aboutUs.phone);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keywords} />
      </Helmet>
      
      <div className="min-h-screen font-poppins">
        <CleaningHeader />
        
        {/* Services Hero */}
        <section className="relative py-20 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white overflow-hidden min-h-[700px] flex items-center">
          {/* animated dots */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  width: `${Math.random()*8+4}px`,
                  height:`${Math.random()*8+4}px`,
                  top:   `${Math.random()*100}%`,
                  left:  `${Math.random()*100}%`,
                  animationDelay:   `${Math.random()*3}s`,
                  animationDuration:`${Math.random()*4+2}s`,
                }}
              />
            ))}
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <DynamicIcon iconName="Sparkles" className="w-5 h-5 text-emerald-300 mr-2" />
              <span className="text-emerald-100 font-semibold">
                Professional {serviceType} Services
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Our {serviceType}
              </span><br/>
              <span className="text-emerald-300">Services</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-green-100 mb-12 leading-relaxed max-w-4xl mx-auto">
              {serviceHeroText || 'Comprehensive residential and commercial cleaning solutions with eco-friendly products and expert cleaners. Same-day booking and satisfaction guaranteed.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a
                href={`tel:${phoneNumber}`}
                className="group bg-white text-green-600 px-8 py-5 rounded-2xl font-bold text-lg transition-transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
              >
                <DynamicIcon iconName="Phone" size={24} className="group-hover:animate-bounce" />
                <span>Call Now: {phoneNumber}</span>
              </a>
              <button
                onClick={()=>navigate('/contact')}
                className="group bg-emerald-500/80 backdrop-blur-sm hover:bg-emerald-400 text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-transform hover:scale-105 border border-white/30"
              >
                <DynamicIcon iconName="Sparkles" size={24} className="group-hover:rotate-12 transition-transform" />
                <span>Free Quote</span>
              </button>
            </div>
          </div>
        </section>
        
        <CleaningServices />
        <CleaningWhyChooseUs />
        <CleaningCTA />
        <CleaningGuarantee />
        <CleaningProcess />
        <CleaningCTA />
        <CleaningServiceAreas />
        <CleaningFAQ />
        <CleaningCTA />
        <CleaningFooter />
      </div>
    </HelmetProvider>
  );
};

export default CleaningServicesPage;
