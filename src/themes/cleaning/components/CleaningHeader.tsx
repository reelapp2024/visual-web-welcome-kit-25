
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useHeaderData } from '../../../hooks/useHeaderData.js';
import { httpFile } from "../../../config.js";

const CleaningHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  
  const {
    phoneNumber,
    projectName,
    projectCategory,
    projectFasFA,
    projectSlogan,
    isLoading
  } = useHeaderData();

  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const formData = new FormData();
        formData.append('projectId', projectId);
        
        const response = await httpFile.post('/webapp/v1/getheader', formData);
        
        if (response.data && response.data.services) {
          setServices(response.data.services);
        }
        
        if (response.data && response.data.locations) {
          setLocations(response.data.locations);
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, [projectId]);

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', hasDropdown: true },
    { name: 'Areas', href: '/areas', hasDropdown: true },
    { name: 'Contact', href: '/contact' }
  ];

  const handleServiceClick = (service) => {
    const serviceSlug = service.service_name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/services/${serviceSlug}`, {
      state: {
        serviceId: service._id,
        serviceName: service.service_name,
        serviceDescription: service.service_description,
        serviceImage: service.images[0]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg",
        serviceImage1: service.images[1]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg",
        serviceImage2: service.images[2]?.url || "https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041850.jpg"
      }
    });
  };

  const handleAreaClick = (location) => {
    navigate(`/${location.slug}`, {
      state: {
        locationData: location,
        pageType: location.slugType,
        id: location.location_id,
        projectId,
        UpcomingPage: location.slugType,
        locationName: location.name,
        _id: location.location_id
      }
    });
  };

  if (isLoading) {
    return (
      <header className="bg-white shadow-lg sticky top-0 z-50 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="animate-pulse bg-gray-200 h-8 w-48 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div
              style={{
                fontSize: '2rem',
                color: '#fff',
                background: 'linear-gradient(145deg, #38a169, #2f855a)',
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '50%',
                boxShadow:
                  'inset -2px -2px 5px rgba(255,255,255,0.2), inset 2px 2px 5px rgba(0,0,0,0.2), 0 6px 15px rgba(0,0,0,0.15)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'pointer',
                transform: 'scale(1)',
                marginRight: '13px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08)';
                e.currentTarget.style.boxShadow =
                  'inset -1px -1px 4px rgba(255,255,255,0.3), inset 1px 1px 4px rgba(0,0,0,0.2), 0 8px 20px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow =
                  'inset -2px -2px 5px rgba(255,255,255,0.2), inset 2px 2px 5px rgba(0,0,0,0.2), 0 6px 15px rgba(0,0,0,0.15)';
              }}
            >
              <i className={`fas ${projectFasFA}`}></i>
            </div>

            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {projectName}
              </h1>
              <p className="text-sm text-gray-600">{projectSlogan}</p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <Link
                      to={item.href}
                      className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 flex items-center"
                    >
                      {item.name}
                      <ChevronDown size={16} className="ml-1" />
                    </Link>
                    
                    {/* Services Dropdown */}
                    {item.name === 'Services' && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {services.map((service) => (
                          <button
                            key={service._id}
                            onClick={() => handleServiceClick(service)}
                            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                          >
                            <div className="flex items-center">
                              <i className={`${service.fas_fa_icon} text-green-500 mr-3`}></i>
                              <span>{service.service_name}</span>
                            </div>
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link
                            to="/services"
                            className="block w-full text-left px-4 py-3 text-green-600 font-semibold hover:bg-green-50 transition-colors duration-200"
                          >
                            View All Services
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Areas Dropdown */}
                    {item.name === 'Areas' && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {locations.map((location) => (
                          <button
                            key={location.location_id}
                            onClick={() => handleAreaClick(location)}
                            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                          >
                            {location.name}
                          </button>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <Link
                            to="/areas"
                            className="block w-full text-left px-4 py-3 text-green-600 font-semibold hover:bg-green-50 transition-colors duration-200"
                          >
                            View All Areas
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Call Button */}
          <div className="hidden md:flex items-center">
            <a
              href={`tel:${phoneNumber}`}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Phone size={18} />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-green-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 text-left block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  
                  {/* Mobile Services */}
                  {item.name === 'Services' && (
                    <div className="pl-4 mt-2 space-y-2">
                      {services.map((service) => (
                        <button
                          key={service._id}
                          onClick={() => {
                            handleServiceClick(service);
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left py-2 text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                        >
                          <div className="flex items-center">
                            <i className={`${service.fas_fa_icon} text-green-500 mr-2 text-xs`}></i>
                            <span>{service.service_name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Mobile Areas */}
                  {item.name === 'Areas' && (
                    <div className="pl-4 mt-2 space-y-2">
                      {locations.map((location) => (
                        <button
                          key={location.location_id}
                          onClick={() => {
                            handleAreaClick(location);
                            setIsMenuOpen(false);
                          }}
                          className="block w-full text-left py-2 text-sm text-gray-600 hover:text-green-600 transition-colors duration-200"
                        >
                          {location.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a
                href={`tel:${phoneNumber}`}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold flex items-center justify-center space-x-2 w-full"
              >
                <Phone size={18} />
                <span>{phoneNumber}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CleaningHeader;