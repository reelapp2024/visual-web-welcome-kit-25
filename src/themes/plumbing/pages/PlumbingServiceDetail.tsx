import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlumbingHeader from '../components/PlumbingHeader';
import PlumbingCTA from '../components/PlumbingCTA';
import PlumbingAboutUs from '../components/PlumbingAboutUs';
import PlumbingProcess from '../components/PlumbingProcess';
import PlumbingBeforeAfter from '../components/PlumbingBeforeAfter';
import PlumbingWhyChooseUs from '../components/PlumbingWhyChooseUs';
import PlumbingGuarantee from '../components/PlumbingGuarantee';
import PlumbingRelatedServices from '../components/PlumbingRelatedServices';
import PlumbingServiceAreas from '../components/PlumbingServiceAreas';
import PlumbingFooter from '../components/PlumbingFooter';
import { Wrench, Phone, CheckCircle } from 'lucide-react';
import { httpFile } from "../../../config.js";
import humanizeString from "../../../extras/stringUtils.js";

interface PlumbingServiceDetailProps {
  serviceId?: string;
  serviceName?: string;
  serviceDescription?: string;
  serviceImage?: string;
}

const PlumbingServiceDetail = ({ serviceId: propServiceId, serviceName, serviceDescription, serviceImage }: PlumbingServiceDetailProps) => {
  const { serviceName: urlServiceName } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [serviceId, setServiceId] = useState(propServiceId || "");
  
  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";
  
  const displayServiceName = serviceName || humanizeString(urlServiceName) || 'Plumbing Repair';
  const displayServiceDescription = serviceDescription || serviceDetails?.service_description || 'Professional plumbing services for homes and businesses with 24/7 emergency response. Licensed plumbers with years of experience.';
  const displayServiceImage = serviceImage || serviceDetails?.images?.[0]?.url || 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  // Fetch service ID if not provided
  useEffect(() => {
    const fetchServiceId = async () => {
      if (!serviceId && displayServiceName) {
        try {
          const { data } = await httpFile.post("/webapp/v1/fetch_service_by_name_and_project", {
            projectId,
            serviceName: displayServiceName,
          });

          if (data?.serviceId) {
            setServiceId(data.serviceId);
          }
        } catch (error) {
          console.error("Error fetching service ID:", error);
        }
      }
    };

    fetchServiceId();
  }, [projectId, displayServiceName, serviceId]);

  // Fetch service details
  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId) return;

      try {
        const { data } = await httpFile.post("/webapp/v1/fetch_service", { serviceId });

        if (data.service) {
          setServiceDetails(data.service);
          
          // Parse subServices from comma-separated string
          const subServicesArray = data.service.subServices 
            ? data.service.subServices.split(',').map(item => item.trim()).filter(Boolean)
            : [];
          setSubServices(subServicesArray);
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  return (
    <div className="min-h-screen font-poppins">
      <PlumbingHeader />
      
      {/* Service Hero */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white overflow-hidden min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 to-cyan-600/85"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Wrench className="w-8 h-8 text-cyan-400 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">{displayServiceName}</h1>
              </div>
              <p className="text-xl text-blue-100 mb-8">
                {displayServiceDescription}
              </p>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-cyan-400" />
                <span className="text-lg">Call Now: (555) 123-4567</span>
              </div>
            </div>
            <div>
              <img
                src={displayServiceImage}
                alt={displayServiceName}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sub-Services Section */}
      {subServices.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white font-poppins">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Our {displayServiceName} Services Include
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer comprehensive {displayServiceName.toLowerCase()} services to meet all your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subServices.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group hover:-translate-y-2">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {service}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <PlumbingAboutUs />
      <PlumbingProcess />
      <PlumbingBeforeAfter />
      <PlumbingCTA />
      <PlumbingWhyChooseUs />
      <PlumbingGuarantee />
      <PlumbingCTA />
      <PlumbingRelatedServices />
      <PlumbingServiceAreas />
      <PlumbingFooter />
    </div>
  );
};

export default PlumbingServiceDetail;
