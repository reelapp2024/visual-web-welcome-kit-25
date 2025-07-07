import React, { useEffect, useState } from 'react';
import { httpFile } from "../../../config.js";
import { Link } from 'react-router-dom';
import { Phone, Sparkles } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSEO } from '../../../hooks/useSEO';
import CleaningHeader from '../components/CleaningHeader';
import CleaningHero from '../components/CleaningHero';
import CleaningAboutUs from '../components/CleaningAboutUs';
import CleaningServices from '../components/CleaningServices';
import CleaningWhyChooseUs from '../components/CleaningWhyChooseUs';
import CleaningProcess from '../components/CleaningProcess';
import CleaningGuarantee from '../components/CleaningGuarantee';
import CleaningTestimonials from '../components/CleaningTestimonials';
import CleaningServiceAreas from '../components/CleaningServiceAreas';
import CleaningFAQ from '../components/CleaningFAQ';
import CleaningFooter from '../components/CleaningFooter';

const CleaningIndex = () => {
  const { seoData } = useSEO('/home');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [CTA, setCTA] = useState([]);
  const projectId = import.meta.env.VITE_PROJECT_ID;

  console.log(projectId, "<<<<ProjectId")
useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // runs every time URL path changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
          reqFrom: "home"
        });

        if (data.projectInfo && data.projectInfo.serviceType) {
          setCTA(data.projectInfo.cta);
          setPhoneNumber(data.aboutUs.phone);
          setProjectCategory(data.projectInfo.serviceType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  // Ensure there are at least 4 CTAs by reusing the first one if necessary
  const getCTAContent = (index) => {
    if (CTA.length === 0) {
      return { title: "Request a Quote", description: "Contact us for our services" };
    }
    return CTA[index] || CTA[0];
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keywords} />
      </Helmet>

      <div className="min-h-screen font-poppins">
        <CleaningHeader />
        <CleaningHero />

        <CleaningAboutUs />
        <CleaningServices />
        {/* First CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {getCTAContent(0).title}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
              {getCTAContent(0).description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                <span>Book Services of {projectCategory}</span>
              </Link>
            </div>
          </div>
        </section>
        <CleaningWhyChooseUs />
        <CleaningProcess />
        {/* Second CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {getCTAContent(1).title}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
              {getCTAContent(1).description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                <span>Book Services of {projectCategory}</span>
              </Link>
            </div>
          </div>
        </section>
        <CleaningGuarantee />
        <CleaningTestimonials />
        {/* Third CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {getCTAContent(2).title}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
              {getCTAContent(2).description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                <span>Book Services of {projectCategory}</span>
              </Link>
            </div>
          </div>
        </section>
        <CleaningServiceAreas />
        <CleaningFAQ />
        {/* Fourth CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {getCTAContent(3).title}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
              {getCTAContent(3).description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
                <span>Book Services of {projectCategory}</span>
              </Link>
            </div>
          </div>
        </section>
        <CleaningFooter />
      </div>
    </HelmetProvider>
  );
};

export default CleaningIndex;
