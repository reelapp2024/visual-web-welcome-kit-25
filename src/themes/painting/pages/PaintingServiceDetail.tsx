import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PaintingHeader from '../components/PaintingHeader';
import PaintingCTA from '../components/PaintingCTA';
import PaintingAboutUs from '../components/PaintingAboutUs';
import PaintingProcess from '../components/PaintingProcess';
import PaintingBeforeAfter from '../components/PaintingBeforeAfter';
import PaintingWhyChooseUs from '../components/PaintingWhyChooseUs';
import PaintingGuarantee from '../components/PaintingGuarantee';
import PaintingRelatedServices from '../components/PaintingRelatedServices';
import PaintingServiceAreas from '../components/PaintingServiceAreas';
import PaintingFooter from '../components/PaintingFooter';
import { Paintbrush, Phone, CheckCircle } from 'lucide-react';
import { httpFile } from "../../../config.js";
import humanizeString from "../../../extras/stringUtils.js";

interface PaintingServiceDetailProps {
  serviceId?: string;
  serviceName?: string;
  serviceDescription?: string;
  serviceImage?: string;
}

const PaintingServiceDetail = ({ serviceId: propServiceId, serviceName, serviceDescription, serviceImage }: PaintingServiceDetailProps) => {
  const { serviceName: urlServiceName } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [subServices, setSubServices] = useState([]);
  const [serviceId, setServiceId] = useState(propServiceId || "");
  
  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";
  
  const displayServiceName = serviceName || humanizeString(urlServiceName) || 'Interior Painting';
  const displayServiceDescription = serviceDescription || serviceDetails?.service_description || 'Professional interior painting services for homes and businesses with premium paints and expert craftsmanship. Same-day estimates and satisfaction guaranteed.';
  const displayServiceImage = serviceImage || serviceDetails?.images?.[0]?.url || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

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
      <PaintingHeader />
      
      {/* Service Hero */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/85 to-pink-600/85"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Paintbrush className="w-8 h-8 text-pink-400 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">{displayServiceName}</h1>
              </div>
              <p className="text-xl text-purple-100 mb-8">
                {displayServiceDescription}
              </p>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-pink-400" />
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
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
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
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
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

      <PaintingAboutUs />
      <PaintingProcess />
      <PaintingBeforeAfter />
      <PaintingCTA />
      <PaintingWhyChooseUs />
      <PaintingGuarantee />
      <PaintingCTA />
      <PaintingRelatedServices />
      <PaintingServiceAreas />
      <PaintingFooter />
    </div>
  );
};

export default PaintingServiceDetail;
