
import  { useEffect, useState } from 'react';
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
import { httpFile } from "../../../config.js";
import { slugify } from "../../../extras/slug";

const CleaningAbout = () => {
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });
  const [aboutHeroText, setAboutHeroText] = useState('');
  const [projectCategory, setProjectCategory] = useState("");


  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch SEO data
        const seoResponse = await httpFile.get(`/webapp/v1/seo/about`);
        setSeoData(seoResponse.data.data);

        // Fetch hero text from my_site API
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.projectInfo && data.projectInfo.aboutHeroText) {
          setAboutHeroText(data.projectInfo.aboutHeroText);
          setProjectCategory(data.projectInfo.serviceType);

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
        
        {/* About Hero */}
        <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden min-h-[500px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              // backgroundImage: 'url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">About {projectCategory}</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              {aboutHeroText }
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
    </HelmetProvider>
  );
};

export default CleaningAbout;
