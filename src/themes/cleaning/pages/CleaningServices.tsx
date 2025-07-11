import React, { useEffect, useState } from 'react';

import { useLocation } from "react-router-dom";
import humanizeString from "../../../extras/stringUtils.js";
import { httpFile } from "../../../config.js";

import CleaningHeader from '../components/CleaningHeader';
import CleaningCTA from '../components/CleaningCTA';
import CleaningServices from '../components/CleaningServices';
import CleaningWhyChooseUs from '../components/CleaningWhyChooseUs';
import CleaningGuarantee from '../components/CleaningGuarantee';
import CleaningProcess from '../components/CleaningProcess';
import CleaningServiceAreas from '../components/CleaningServiceAreas';
import CleaningFAQ from '../components/CleaningFAQ';
import CleaningFooter from '../components/CleaningFooter';
import { Sparkles } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../../../components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const CleaningServicesPage = () => {
  const [projectCategory, setProjectCategory] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescriptions, setProjectDescriptions] = useState([]);
  let [locationName, setDisplayLocationName] = useState("");

const formattedLocationName = locationName ? `in ${locationName}` : "";
  const projectId = import.meta.env.VITE_PROJECT_ID;

  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  let cumulativePath = '';

const pathname = location.pathname;

// Remove trailing '/services' if present
let locationSlug = pathname;

// If pathname ends with '/services', remove it
if (locationSlug.endsWith('/services')) {
  locationSlug = locationSlug.slice(0, -('/services'.length));
}

// Remove leading '/' if needed
if (locationSlug.startsWith('/')) {
  locationSlug = locationSlug.slice(1);
}

console.log(locationSlug, "locationSlug");

    useEffect(() => {
       const fetchPageType = async () => {
         try {
           const { data } = await httpFile.post("/webapp/v1/slugToPageType", {
             projectId,
             slug:locationSlug
           });
   
           console.log(data,"<<<<<>>>>>>>>data of slug")
   
           if (data?.slugType) {
             setDisplayLocationName(data.showName);
           }
   
           
         } catch (error) {
           console.error("Error fetching page type:", error);
           
         }
       };
   
   
   
       if (locationSlug) {
         fetchPageType();
       }
     }, [locationSlug, projectId]);


  useEffect(() => {
    const fetchBasicProjectInfo = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/basic_project_info", {
          projectId
        });

        if (data) {
          setProjectCategory(data.serviceType || "");
          setProjectName(data.projectName || "");
          setProjectDescriptions(data.descriptions || []);
        }
      } catch (error) {
        console.error("Error fetching basic project info:", error);
      }
    };

    if (projectId) {
      console.log("Fetching basic project info for projectId:", projectId);
      fetchBasicProjectInfo();
    } else {
      console.log("No projectId available for fetching basic project info");
    }
  }, [projectId]);

  return (
    <div className="min-h-screen font-poppins">
      <CleaningHeader />

      {/* Breadcrumb */}


      <div className="bg-gray-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center">
                    <Home className="w-4 h-4 mr-1" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {segments.map((segment, index) => {
                cumulativePath += `/${segment}`;
                const isLast = index === segments.length - 1;
                const displayName = segment === 'services' ? 'Services' : humanizeString(segment);

                return (
                  <React.Fragment key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="font-medium text-green-600">{displayName}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={cumulativePath}>{displayName}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>


      {/* Services Hero */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden min-h-[500px] flex items-center">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Our {projectCategory} Services {formattedLocationName}</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
           {projectDescriptions[2]}
          </p>
        </div>
      </section>

  <CleaningServices formattedLocationName={formattedLocationName} />

      <CleaningWhyChooseUs />
      <CleaningCTA />
      <CleaningGuarantee />
      <CleaningProcess />
      <CleaningCTA />
      <CleaningServiceAreas />
      <CleaningFAQ />
      <CleaningCTA />
      <CleaningFooter />
    </div>
  );
};

export default CleaningServicesPage;
