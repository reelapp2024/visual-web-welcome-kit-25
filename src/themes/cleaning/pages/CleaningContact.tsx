
import React, { useEffect, useState } from 'react';
import { httpFile } from "../../../config.js";
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSEO } from '../../../hooks/useSEO';
import CleaningHeader from '../components/CleaningHeader';
import CleaningCTA from '../components/CleaningCTA';
import CleaningFooter from '../components/CleaningFooter';
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
          setImage(data.projectInfo.images[3].url)
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
        <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden min-h-[500px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
             backgroundImage: `url(${image})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-12">
              Ready for professional {projectCategory}? Contact us today for a free quote and same-day booking.
            </p>
            
            {/* CTA Buttons - Same as homepage */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href={`tel:${phoneNumber}`}
                className="group bg-white text-green-600 px-8 py-5 rounded-2xl font-bold text-lg transition-transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
              >
                <Phone size={24} className="group-hover:animate-bounce" />
                <span>Call Now: {phoneNumber}</span>
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="group bg-emerald-500/80 backdrop-blur-sm hover:bg-emerald-400 text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-transform hover:scale-105 border border-white/30"
              >
                <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
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
