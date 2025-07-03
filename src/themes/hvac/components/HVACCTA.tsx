
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Thermometer } from 'lucide-react';
import { httpFile } from "../../../config.js";

const HVACCTA = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CTA, setCTA] = useState("");
  const [projectCategory, setProjectCategory] = useState("");

  const projectId = import.meta.env.VITE_PROJECT_ID;

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
    <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {CTA || "Get Expert HVAC Service Today"}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-orange-100">
          Transform your comfort with our professional {projectCategory || "HVAC"} services.  
          Top-tier quality, experienced technicians, and satisfaction guaranteed every time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={`tel:${phoneNumber}`}
            className="group bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Phone size={24} className="group-hover:animate-pulse" />
            <span>Call Now: {phoneNumber || "(555) 123-4567"}</span>
          </a>
          
          <Link 
            to="/contact"
            className="group bg-red-500 hover:bg-red-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Thermometer size={24} />
            <span>Book {projectCategory || "HVAC"} Services</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HVACCTA;
