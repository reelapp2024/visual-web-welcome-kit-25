
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpFile } from "../../../config.js";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSEO } from '../../../hooks/useSEO';
import CleaningHeader from '../components/CleaningHeader';
import CleaningCTA from '../components/CleaningCTA';
import CleaningFooter from '../components/CleaningFooter';
import DynamicIcon from '../../../extras/DynamicIcon.js';
import { Phone, Mail, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react';

const CleaningContact = () => {
  const { seoData } = useSEO('/contact');
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mainLocation, setMainLocation] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [image, setImage] = useState("");

  const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.aboutUs && data.aboutUs) {
          setEmail(data.aboutUs.email);
          setPhoneNumber(data.aboutUs.phone);
          setMainLocation(data.aboutUs.mainLocation);
          setProjectCategory(data.projectInfo.serviceType);
          setImage(data.projectInfo.images[3]?.url || "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80")
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
        
        {/* Contact Hero */}
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
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <DynamicIcon iconName="Sparkles" className="w-5 h-5 text-emerald-300 mr-2" />
              <span className="text-emerald-100 font-semibold">
                Get In Touch
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                Contact
              </span><br/>
              <span className="text-emerald-300">Us</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-green-100 mb-12 leading-relaxed max-w-4xl mx-auto">
              Ready for professional {projectCategory}? Contact us today for a free quote and same-day booking.
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

        {/* Contact Information */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Methods */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="bg-green-500 rounded-full p-4 mr-6">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                      <p className="text-gray-600">{phoneNumber}</p>
                      <p className="text-sm text-green-600">Same-day booking available</p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="bg-emerald-500 rounded-full p-4 mr-6">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                      <p className="text-gray-600">{email}</p>
                      <p className="text-sm text-emerald-600">We respond within 2 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="bg-green-600 rounded-full p-4 mr-6">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Our Main Office</h3>
                      <p className="text-gray-600">{mainLocation}</p>
                      <p className="text-sm text-green-600">Free estimates in service area</p>
                    </div>
                  </div>

                
                </div>
              </div>

             
            </div>
          </div>
        </section>

        <CleaningCTA />
        <CleaningFooter />
      </div>
    </HelmetProvider>
  );
};

export default CleaningContact;
