import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { httpFile } from "../../../config.js";
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js'; // Adjust if path differs
import { getProjectId } from '../../../hooks/getProjectId'; // Import the utility

const CleaningRelatedServices = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 🚀 Track route changes
  const [projectServices, setProjectServices] = useState([]);

  const savedSiteId = localStorage.getItem("currentSiteId");
  const [projectId, setProjectId] = useState(null); // Initialize as null

  useEffect(() => {
    // Get projectId from utility function
    const id = getProjectId();

    console.log(id, "this is id")
    setProjectId(id); // Set projectId in state
  }, []);

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
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (location.state) {
      fetchData(); // Re-fetch on route state change
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

  // Helper to truncate at first period
  const getTruncatedDescription = (text) => {
    if (!text) return '';
    const idx = text.indexOf('.');
    return idx !== -1 ? text.substring(0, idx + 1) : text;
  };

  return (
    <section className="py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Related Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our complete range of professional cleaning services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projectServices.map((service, index) => {
            const shortDesc = getTruncatedDescription(service.service_description);
            return (
              <button
                key={index}
                onClick={() => handleServiceClick(service)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-4 border border-gray-100 text-left w-full"
              >
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-all duration-300">
                  <DynamicFAIcon className='white' iconClass={service.fas_fa_icon || ''} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.service_name}</h3>
                <p className="text-gray-600">{shortDesc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CleaningRelatedServices;