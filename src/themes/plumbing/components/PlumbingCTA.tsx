
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Wrench } from 'lucide-react';
import { httpFile } from "../../../config.js";

const PlumbingCTA = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CTA, setCTA] = useState("");
  const [projectCategory, setProjectCategory] = useState("");

  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685bf8e93f68ae53bc89381a";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.projectInfo && data.projectInfo.serviceType) {
          setCTA(data.projectInfo.callToAction);
          setPhoneNumber(data.aboutUs.phone);
          setProjectCategory(data.projectInfo.serviceType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {CTA || "Get Expert Plumbing Service Today"}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
          Transform your property with our professional {projectCategory || "plumbing"} services.  
          Top-tier quality, experienced plumbers, and satisfaction guaranteed every time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={`tel:${phoneNumber}`}
            className="group bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Phone size={24} className="group-hover:animate-pulse" />
            <span>Call Now: {phoneNumber || "(555) 123-4567"}</span>
          </a>
          
          <button 
            onClick={() => navigate('/contact')}
            className="group bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Wrench size={24} />
            <span>Book {projectCategory || "Plumbing"} Services</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlumbingCTA;
