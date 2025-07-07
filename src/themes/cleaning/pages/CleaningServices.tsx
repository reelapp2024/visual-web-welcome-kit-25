
import React, { useEffect, useState } from 'react';
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
import { useNavigate, useLocation, Link } from "react-router-dom";

import { Phone, Sparkles } from 'lucide-react';

const CleaningServicesPage = () => {
  const { seoData } = useSEO('/services');
  const [serviceHeroText, setServiceHeroText] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [projectCategory, setProjectCategory] = useState("");

  const projectId = import.meta.env.VITE_PROJECT_ID;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // runs every time URL path changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hero text from my_site API
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.projectInfo && data.projectInfo.serviceHeroText) {
          setServiceHeroText(data.projectInfo.serviceHeroText);
          setServiceType(data.projectInfo.serviceType);
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
        <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden min-h-[500px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold"> Professional {serviceType} Services</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              {serviceHeroText}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              style={{ marginTop: '5%' }}
            >
              <a
                href={`tel:${phoneNumber}`}
                className="group bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
              >
                <Phone size={24} className="group-hover:animate-pulse" />
                <span>Call Now: {phoneNumber}</span>
              </a>
              <Link
                to="/contact"
                className="group bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
              >
                <Sparkles size={24} />
                <span>Book Services of {serviceType}</span>
              </Link>
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
