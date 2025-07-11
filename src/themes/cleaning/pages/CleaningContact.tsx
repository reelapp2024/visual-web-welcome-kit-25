
import React, { useEffect, useState } from 'react';
import { httpFile } from "../../../config.js";
import { useNavigate,useLocation } from 'react-router-dom';
import CleaningHeader from '../components/CleaningHeader';
import CleaningCTA from '../components/CleaningCTA';
import CleaningFooter from '../components/CleaningFooter';
import { Phone, Mail, MapPin, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '../../../components/ui/breadcrumb';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
const CleaningContact = () => {

  const navigate = useNavigate();
  const location= useLocation();7
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [heroImage, setHeroImage] = useState("");
  const [mainLocation, setMainLocation] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [image, setImage] = useState("");
  const [CTA, setCTA] = useState([]);

  const savedSiteId = localStorage.getItem("currentSiteId");
    const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // runs every time URL path changes




  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
        });

        if (data.aboutUs && data.aboutUs) {
          setCTA(data.projectInfo.cta);


          setEmail(data.aboutUs.email);
          setPhoneNumber(data.aboutUs.phone);
          setMainLocation(data.aboutUs.mainLocation);
          setProjectCategory(data.projectInfo.serviceType);
          setImage(data.projectInfo.images[3].url);
          setHeroImage(data.projectInfo.images[1].url);


        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);


  const getCTAContent = (index) => {
    if (CTA.length === 0) {
      return { title: "Default CTA", description: "Contact us for our services" };
    }
    return CTA[index] || CTA[0];
  };


  return (
    <div className="min-h-screen font-poppins">
      <CleaningHeader />
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className='font-medium text-green-600'>Contact Us</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {/* Contact Hero */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white overflow-hidden min-h-[500px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 to-emerald-600/85"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-emerald-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Ready for professional {projectCategory}? Contact us today for a free quote and same-day booking.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="bg-green-500 rounded-full p-4 mr-6">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
                    <p className="text-gray-600">{phoneNumber}</p>
                    <p className="text-sm text-green-600">Same-day booking available</p>
                  </div>
                </div>

                <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="bg-emerald-500 rounded-full p-4 mr-6">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
                    <p className="text-gray-600">{email}</p>
                    <p className="text-sm text-emerald-600">We respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
                  <div className="bg-green-600 rounded-full p-4 mr-6">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Our Main Office</h3>
                    <p className="text-gray-600">{mainLocation}</p>
                    <p className="text-sm text-green-600">Free estimates in service area</p>
                  </div>
                </div>


              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Second CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {getCTAContent(1).title}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-green-100">
            {getCTAContent(1).description}
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
      <CleaningFooter />
    </div>
  );
};

export default CleaningContact;