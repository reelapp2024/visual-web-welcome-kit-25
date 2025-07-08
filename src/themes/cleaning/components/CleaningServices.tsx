
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { httpFile } from "../../../config.js";
import { Home, Building, Sparkles, Car, Sofa, Shirt } from 'lucide-react';

const CleaningServices = () => {
  const [projectServices, setProjectServices] = useState([]);
  const [projectCategory, setProjectCategory] = useState("");

 const projectId = import.meta.env.VITE_PROJECT_ID;
  // Helper to truncate at first period
  const getTruncatedDescription = (text) => {
    if (!text) return '';
    const idx = text.indexOf('.');
    return idx !== -1 ? text.substring(0, idx + 1) : text;
  };

  const handleServiceClick = (service) => {
    const serviceName = service.service_name.toLowerCase().replace(/\s+/g, '-');
    return `/services/${serviceName}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/fetch_services", { projectId });
        if (data) {
          setProjectServices(data.services || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [projectId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
          reqFrom: "cleaningServices"
        });
        if (data.projectInfo && data.projectInfo.serviceType) {
          setProjectCategory(data.projectInfo.serviceType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [projectId]);

  return (
    <section className="py-20 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our {projectCategory} Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive {projectCategory} solutions for you and we make sure for professional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectServices.map((service, index) => {
            const shortDesc = getTruncatedDescription(service.service_description);
            return (
              <Link 
                key={index} 
                to={handleServiceClick(service)}
                state={{
                  serviceId: service._id,
                  serviceName: service.service_name,
                  serviceDescription: service.service_description,
                  serviceImage: service.images[0]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg",
                  serviceImage1: service.images[1]?.url || "https://img.free-photo/standard-quality-control-concept-m_23-2150041850.jpg",
                  serviceImage2: service.images[2]?.url || "https://img.free-photo/standard-quality-control-concept-m_23-2150041850.jpg"
                }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 overflow-hidden border border-gray-100 cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={service.images[0]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg"}
                    alt={service.service_name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className={`absolute top-4 left-4 bg-gradient-to-r ${service.gradient} rounded-full p-3 text-white shadow-lg`}>
                    <i className={service.fas_fa_icon} />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">{service.service_name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{shortDesc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CleaningServices;
