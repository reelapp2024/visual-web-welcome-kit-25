
import React, { useEffect, useState } from 'react';
import { httpFile } from "../../../config.js";
import { Link } from 'react-router-dom';
import { Phone, Sparkles } from 'lucide-react';

const CleaningCTA = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CTA, setCTA] = useState("");
  const [projectCategory, setProjectCategory] = useState("");

  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
          reqFrom:"CTA"
          
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
    <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {CTA}
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
          Transform your world with our professional {projectCategory} services.  
          Top-tier quality, experienced professionals, and satisfaction guaranteed every time.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={`tel:${phoneNumber}`}
            className="group bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Phone size={24} className="group-hover:animate-pulse" />
            <span>Call Now: {phoneNumber}</span>
          </a>
          
          <Link 
            to="/contact"
            className="group bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center space-x-3 w-full sm:w-auto justify-center shadow-xl transform hover:scale-105"
          >
            <Sparkles size={24} />
            <span>Book Services of {projectCategory}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CleaningCTA;
