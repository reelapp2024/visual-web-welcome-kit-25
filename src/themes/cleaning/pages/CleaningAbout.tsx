
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSEO } from '../../../hooks/useSEO';
import CleaningHeader from '../components/CleaningHeader';
import CleaningAboutUs from '../components/CleaningAboutUs';
import CleaningWhyChooseUs from '../components/CleaningWhyChooseUs';
import CleaningCTA from '../components/CleaningCTA';
import CleaningProcess from '../components/CleaningProcess';
import CleaningGuarantee from '../components/CleaningGuarantee';
import CleaningTestimonials from '../components/CleaningTestimonials';
import CleaningMissionVision from '../components/CleaningMissionVision';
import CleaningValues from '../components/CleaningValues';
import CleaningFooter from '../components/CleaningFooter';

import { httpFile } from "../../../config.js";
import { slugify } from "../../../extras/slug";
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js';
import { Target, Eye, Sparkles } from 'lucide-react';

const CleaningAbout = () => {
   const { seoData } = useSEO('/about');
  const projectId = import.meta.env.VITE_PROJECT_ID;

  // hero
  const [aboutHeroText, setAboutHeroText] = useState('');

  // our core values
  const [coreValuesIntro, setCoreValuesIntro] = useState('');
  const [coreValues, setCoreValues] = useState([]);
    const [projectCategory, setProjectCategory] = useState("");

  // our commitment
  const [commitment, setCommitment] = useState('');

  // mission & vision
  const [missionSubHeadings, setMissionSubHeadings] = useState([]);
  const [missionLine, setMissionLine] = useState('');
  const [visionSubHeadings, setVisionSubHeadings] = useState([]);
  const [visionLine, setVisionLine] = useState('');
useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // runs every time URL path changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "about",      // <— use “about” here
        });

        const info = data.projectInfo || {};
        setAboutHeroText(info.aboutHeroText || '');
        setProjectCategory(info.serviceType || '');

        // core values
        setCoreValuesIntro(info.coreValuesIntro || '');
        setCoreValues(info.coreValues || []);

        // commitment
        setCommitment(info.commitment || '');

        // mission
        setMissionSubHeadings(info.missionSubHeadings || []);
        setMissionLine(info.missionLine || '');

        // vision
        setVisionSubHeadings(info.visionSubHeadings || []);
        setVisionLine(info.visionLine || '');

      } catch (error) {
        console.error("Error fetching About page data:", error);
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
              <h1 className="text-4xl md:text-5xl font-bold">About Our {projectCategory} Services</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              {aboutHeroText || 'Learn more about our professional cleaning services and commitment to excellence.'}
            </p>
          </div>
        </section>
        

        <CleaningAboutUs />
         <section className="py-20 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Driving our commitment to excellence in professional cleaning services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-full p-4 mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
            </div>
            {missionLine && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{missionLine}</p>
            )}
            <ul className="space-y-3">
              {missionSubHeadings.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <Sparkles className="w-5 h-5 text-green-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full p-4 mr-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
            </div>
            {visionLine && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{visionLine}</p>
            )}
            <ul className="space-y-3">
              {visionSubHeadings.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <Sparkles className="w-5 h-5 text-emerald-500 mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
        <CleaningCTA />
        <CleaningWhyChooseUs />
        <CleaningCTA />
      <section className="py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our Core Values
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
           {coreValuesIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-gray-100">
              <div className={`${value.color} mb-6 flex justify-center`}>
                <div className="bg-gray-50 rounded-full p-4">
                 <DynamicFAIcon iconClass={value.iconClass || ''} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed text-center">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to Excellence</h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {commitment}
            </p>
            
          </div>
        </div>
      </div>
    </section>
        <CleaningProcess />
        <CleaningGuarantee />
        <CleaningTestimonials />
        <CleaningCTA />
        <CleaningFooter />
      </div>
    </HelmetProvider>
  );
};

export default CleaningAbout;
