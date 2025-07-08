
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { httpFile } from "../../../config.js";
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js';
import { useColors } from '../../../components/DynamicColorProvider';

const CleaningRelatedServices = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors, isLoading: colorsLoading } = useColors();
  const [projectServices, setProjectServices] = useState([]);
  const [projectCategory, setProjectCategory] = useState("");

  const projectId = import.meta.env.VITE_PROJECT_ID;
  
  const fetchData = async () => {
    try {
      const { data } = await httpFile.post("/webapp/v1/fetch_random_services", {
        projectId,
      });
      if (data) {
        setProjectServices(data.services || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  useEffect(() => {
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (location.state) {
      fetchData();
    }
  }, [location]);

  const handleServiceClick = (service) => {
    const serviceName = service.service_name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/services/${serviceName}`, {
      state: {
        serviceId: service._id,
        serviceName: service.service_name,
        serviceDescription: service.service_description,
        serviceImage: service.images?.[0]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg",
        serviceImage1: service.images?.[1]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg",
        serviceImage2: service.images?.[2]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg"
      }
    });
  };

  const getTruncatedDescription = (text) => {
    if (!text) return '';
    const idx = text.indexOf('.');
    return idx !== -1 ? text.substring(0, idx + 1) : text;
  };

  // Helper function to check if color is gradient
  const isGradient = (color) => {
    return color && (color.includes('linear-gradient') || color.includes('radial-gradient'));
  };

  // Create dynamic styles based on API colors
  const getDynamicIconStyle = () => {
    if (!colors) return {};
    
    if (isGradient(colors.primary)) {
      return { background: colors.primary };
    } else {
      return { 
        background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` 
      };
    }
  };

  const getDynamicTextStyle = () => {
    if (!colors) return '';
    
    if (isGradient(colors.primary)) {
      return 'text-gradient-primary';
    } else {
      return 'text-primary-dynamic';
    }
  };

  return (
    <section className="py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${getDynamicTextStyle()}`}>
            Related Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete range of professional {projectCategory} services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectServices.map((service, index) => {
            const shortDesc = getTruncatedDescription(service.service_description);
            return (
              <button
                key={index}
                onClick={() => handleServiceClick(service)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-4 border border-gray-100 text-left w-full h-full flex flex-col"
              >
                <div 
                  className="cleaning-service-icon rounded-full w-16 h-16 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-all duration-300 flex-shrink-0"
                  style={getDynamicIconStyle()}
                >
                  <DynamicFAIcon className='white' iconClass={service.fas_fa_icon || ''} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex-shrink-0">{service.service_name}</h3>
                <p className="text-gray-600 flex-grow">{shortDesc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CleaningRelatedServices;
