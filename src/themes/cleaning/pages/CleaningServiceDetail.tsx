
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CleaningHeader from '../components/CleaningHeader';
import CleaningCTA from '../components/CleaningCTA';
import CleaningAboutUs from '../components/CleaningAboutUs';
import CleaningProcess from '../components/CleaningProcess';
import CleaningBeforeAfter from '../components/CleaningBeforeAfter';
import CleaningWhyChooseUs from '../components/CleaningWhyChooseUs';
import CleaningGuarantee from '../components/CleaningGuarantee';
import CleaningRelatedServices from '../components/CleaningRelatedServices';
import CleaningServiceAreas from '../components/CleaningServiceAreas';
import CleaningFooter from '../components/CleaningFooter';
import { Sparkles, Phone, CheckCircle } from 'lucide-react';
import { httpFile } from "../../../config.js";
import humanizeString from "../../../extras/stringUtils.js";
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js'; // make sure the path is correct
import { removeDot } from "../../../extras/removeDot.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { slugify } from "../../../extras/slug";

const CleaningServiceDetail = () => {
  let { serviceName: urlServiceName } = useParams();
  const [projectOurProcess, setprojectOurProcess] = useState([]);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [serviceImage, setServiceImage] = useState("");
  const [ProjectBaseImage, setProjectBaseImage] = useState("");
  const [stepProcess, setStepProcess] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [reloadFlag, setReloadFlag] = useState(0);
  const [aboutService, setAboutService] = useState('');
  const [subServices, setSubServices] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";
  const locationName = location.state?.locationName ? `in ${location.state.locationName}` : '';
  const [serviceId, setServiceId] = useState(location.state?.serviceId || "");
  let displayServiceName = humanizeString(urlServiceName) || 'Residential Cleaning';
  const [guarantees, setGuarantees] = useState([]);
  const [guaranteeText, setGuaranteeText] = useState("");
  const [promiseLine, setPromiseLine] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectName, setprojectName] = useState("");
  const [cta1, setCta1] = useState(null);
  const [cta2, setCta2] = useState(null);
  const [cta3, setCta3] = useState(null);
  const [cta4, setCta4] = useState(null);
  const [projectWhyChooseUs, setprojectWhyChooseUs] = useState([]);

  const raw = "Contact us for, reliable. and affordable phone repair solutions.";
  const clean = removeDot(raw);

  displayServiceName = location.state?.locationName ? displayServiceName : removeDot(displayServiceName)

   const [seoData, setSeoData] = useState({
      meta_title: '',
      meta_description: '',
      meta_keywords: ''
    });

  useEffect(() => {
    localStorage.setItem("locaitonname", locationName);
  }, [locationName]);


  // When URL changes (same page but different param), force refetch
  useEffect(() => {
    window.scrollTo(0, 0);
    setServiceId(location.state?.serviceId || "");
    setReloadFlag(prev => prev + 1);
  }, [urlServiceName]);

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
  }, [projectId, urlServiceName, serviceId, reloadFlag]);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!serviceId) return;

      try {
        const { data } = await httpFile.post("/webapp/v1/fetch_service", { serviceId });

        if (data.service) {



          console.log(data, "Data,cta1")
          setServiceDetails(data.service);
          setServiceImage(data.service.images?.[0]?.url || "");
          setProjectBaseImage(data.service.images?.[2]?.url || "");
          setStepProcess(data.service.steps_process || []);
          setAboutService(data.service.about_service || '');
          setCta1(data.cta1 || null);
          setCta2(data.cta2 || null);
          setCta3(data.cta3 || null);
          setCta4(data.cta4 || null);

          setGuarantees(data.service.ourGuaranteeSection);
          setGuaranteeText(data.service.ourGuaranteeText);
          setPromiseLine(data.service.promiseLine)
          setprojectWhyChooseUs(data.service.whyChooseUsSection);


          // Parse subServices from comma-separated string
          const subServicesArray = Array.isArray(data.service.subServices)
            ? data.service.subServices.map(item => item.trim()).filter(Boolean) // If it's an array, trim and filter
            : typeof data.service.subServices === 'string'
              ? data.service.subServices.split(',').map(item => item.trim()).filter(Boolean) // If it's a string, split, trim, and filter
              : []; // Default to an empty array if it's neither a string nor an array

          setSubServices(subServicesArray);

           // Fetch SEO data based on current route
                  let seoEndpoint = `/webapp/v1/seo/service/${slugify(data.service.service_name)}`;
                  const seoResponse = await httpFile.get(seoEndpoint);
                  setSeoData(seoResponse.data.data);


          setIsLoading(false);

         
        }
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceData();
  }, [serviceId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.projectInfo) {
          setprojectOurProcess(data.projectInfo.ourProcessSection);
          setProjectCategory(data.projectInfo.serviceType);
          setPhoneNumber(data.aboutUs.phone);
          setprojectName(data.projectInfo.projectName);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);
  const hasLocationName = Boolean(location.state?.locationName);
  const rawDescription = serviceDetails?.service_description || "";
  // Always clean it first:
  const cleaned = removeDot(rawDescription);

  const displayServiceDescription = location.state?.locationName
    // then, if you have a location, tack it on:
    ? `${cleaned} in ${location.state.locationName}.`
    : cleaned;


  const displayServiceImage = serviceImage || '';




  return (
    <div className="min-h-screen font-poppins">
      <CleaningHeader />

      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${ProjectBaseImage})` }}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold">{displayServiceName} {locationName}</h1>
              </div>
              <p className="text-xl text-green-100 mb-8">
                <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
                <span className="text-lg">{displayServiceDescription}</span>
              </p>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-emerald-400" />
                <span className="text-lg">Call Now: {phoneNumber}</span>
              </div>
            </div>
            <div>
              <img src={displayServiceImage} alt={displayServiceName} className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ==== NEW "ABOUT" SECTION ==== */}
      {aboutService && (
        <section className="py-16 bg-white font-poppins">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              About {displayServiceName}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {aboutService}
            </p>
          </div>
        </section>
      )}

      {/* ==== NEW SUB-SERVICES SECTION ==== */}
      {subServices.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white font-poppins">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
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
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-all duration-300">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
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

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Our Simple Process
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our streamlined 4-step process ensures you get professional cleaning service from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stepProcess.length > 0 ? (
              stepProcess.map((step, index) => (
                <div key={index} className="text-center relative group">
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-xl group-hover:scale-110 transition-all duration-300">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 p-8 border border-gray-100">
                    <div className={`bg-gradient-to-br ${step.gradient || 'from-gray-400 to-gray-600'} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-300`}>
                      <i className={`${step.iconClass || 'fas fa-star'} text-4xl text-green-500`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.stepName || 'Step'}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.serviceDescription || 'No description available.'}</p>
                  </div>
                  {index < stepProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-green-300 z-20">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-4">No process steps available.</p>
            )}
          </div>
        </div>
      </section>

    {/* CTA! */}

   {cta1 ? (
  <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {cta1?.title}
      </h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
        {cta1?.description}
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
) : null}  {/* This will render nothing if cta1 is not available */}



      {/* <CleaningWhyChooseUs /> */}

      <section className="py-20 bg-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Why Choose {projectName}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              When you choose us, you're choosing quality, reliability, and exceptional service
              that's backed by years of experience and thousands of satisfied customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectWhyChooseUs.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 p-8 border border-gray-100">


                  <div
                    className={`bg-gradient-to-br ${feature.gradient || 'from-gray-400 to-gray-600'
                      } rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <DynamicFAIcon iconClass={feature.iconClass || ''} />
                    {/* Changed icon color to green-500 */}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Cleaning Gurantee */}

      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Our {displayServiceName} Guarantee
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {guaranteeText}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 p-8 border border-gray-100">
                  <div
                    className={`bg-gradient-to-br ${guarantee.gradient || 'from-gray-400 to-gray-600'
                      } rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-300`}
                  >
                    <DynamicFAIcon iconClass={guarantee.iconClass || ''} />
                    {/* Changed icon color to green-500 */}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{guarantee.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-xl p-8 shadow-xl max-w-4xl mx-auto border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Promise to You</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {promiseLine}
              </p>
            </div>
          </div>
        </div>
      </section>
{/* CTA! */}

       {cta2 ? (
  <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {cta2?.title}
      </h2>
      <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
        {cta2?.description}
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
) : null}  {/* This will render nothing if cta1 is not available */}

      <CleaningRelatedServices />
      {/* <CleaningServiceAreas /> */}
      <CleaningFooter />
    </div>
  );
};

export default CleaningServiceDetail;
