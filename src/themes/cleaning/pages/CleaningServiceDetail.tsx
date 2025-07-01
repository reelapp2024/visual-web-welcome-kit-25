import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { httpFile } from "../../../config.js";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import CleaningHeader from '../components/CleaningHeader';
import CleaningCTA from '../components/CleaningCTA';
import CleaningFooter from '../components/CleaningFooter';
import CleaningTestimonials from '../components/CleaningTestimonials';
import CleaningRelatedServices from '../components/CleaningRelatedServices';
import { ArrowLeft, CheckCircle, Star, Clock, Shield, Phone, Sparkles } from 'lucide-react';

const CleaningServiceDetail = () => {
  const { serviceName, locationName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });

  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch service data based on route
        let serviceId = location.state?.serviceId;
        const { data } = await httpFile.post("/webapp/v1/fetch_service_by_id", {
          projectId,
          serviceId
        });
        
        if (data.service) {
          setService(data.service);
        } else {
          setError("Service not found.");
        }

        // Fetch related services
        const relatedServicesResponse = await httpFile.post("/webapp/v1/fetch_services", {
          projectId,
        });
        
        if (relatedServicesResponse.data) {
          setRelatedServices(relatedServicesResponse.data.services || []);
        }

        // Fetch SEO data dynamically based on route
        let seoEndpoint = '';
        if (locationName && serviceName) {
          seoEndpoint = `/webapp/v1/seo/${locationName}/services/${serviceName}`;
        } else if (serviceName) {
          seoEndpoint = `/webapp/v1/seo/services/${serviceName}`;
        }
        
        if (seoEndpoint) {
          const seoResponse = await httpFile.get(seoEndpoint);
          setSeoData(seoResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceName, locationName, projectId, location.state?.serviceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!service) {
    return <div>No service data found.</div>;
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keywords} />
      </Helmet>
      
      <div className="min-h-screen font-poppins">
        <CleaningHeader />

        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${service.images[0]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg"})` }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <button onClick={() => navigate(-1)} className="absolute top-6 left-6 bg-white/20 hover:bg-white/30 text-white rounded-full p-2">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">{service.service_name}</h1>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              {location.state?.serviceDescription || service.service_description}
            </p>
          </div>
        </section>

        {/* Service Details Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <img src={service.images[1]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg"} alt={service.service_name} className="rounded-2xl shadow-xl mb-6" />
                <img src={service.images[2]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg"} alt={service.service_name} className="rounded-2xl shadow-xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our {service.service_name}?</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {service.long_description || service.service_description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <p className="text-gray-600">Expert {service.service_name} professionals</p>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <p className="text-gray-600">Eco-friendly cleaning products</p>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    <p className="text-gray-600">Satisfaction guaranteed</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-gray-300 fill-current" />
                    <span className="text-gray-600 ml-2">4.0/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
              <p className="text-gray-600 text-xl">Explore the key features of our {service.service_name}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <Clock className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast & Reliable</h3>
                <p className="text-gray-600">We provide fast and reliable {service.service_name} to meet your needs.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <Shield className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Licensed & Insured</h3>
                <p className="text-gray-600">Our team is fully licensed and insured for your peace of mind.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <Phone className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-gray-600">We offer 24/7 support to assist you with any questions or concerns.</p>
              </div>
            </div>
          </div>
        </section>

        <CleaningRelatedServices relatedServices={relatedServices} />
        <CleaningTestimonials />
        <CleaningCTA />
        <CleaningFooter />
      </div>
    </HelmetProvider>
  );
};

export default CleaningServiceDetail;
