
import React, { useEffect, useState } from 'react';
import { httpFile } from "../../../config.js";
import { Link } from 'react-router-dom';
import { Shield, Clock, Award, CheckCircle } from 'lucide-react';
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js'; // make sure the path is correct

const CleaningGuarantee = () => {

  const [guarantees, setGuarantees] = useState([]);
  const [guaranteeText, setGuaranteeText] = useState("");
  const [promiseLine, setPromiseLine] = useState("");
    const [projectCategory, setProjectCategory] = useState("");

  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
          reqFrom:"Guarantees"

        });

        if (data.projectInfo) {
          setGuarantees(data.projectInfo.ourGuaranteeSection);
          setGuaranteeText(data.projectInfo.ourGuaranteeText);
         setPromiseLine(data.projectInfo.promiseLine)
          setProjectCategory(data.projectInfo.serviceType);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);




  // const guarantees = [
  //   {
  //     icon: <Shield className="w-12 h-12" />,
  //     title: "100% Satisfaction Guarantee",
  //     description: "We stand behind our work with a complete satisfaction guarantee on all cleaning services.",
  //     gradient: "from-green-500 to-green-600"
  //   },
  //   {
  //     icon: <Clock className="w-12 h-12" />,
  //     title: "Same Day Booking",
  //     description: "Need cleaning today? We offer same-day booking for all urgent cleaning needs.",
  //     gradient: "from-emerald-500 to-emerald-600"
  //   },
  //   {
  //     icon: <Award className="w-12 h-12" />,
  //     title: "Bonded & Insured",
  //     description: "All our cleaners are fully bonded, insured, and background-checked for your protection.",
  //     gradient: "from-green-600 to-emerald-500"
  //   },
  //   {
  //     icon: <CheckCircle className="w-12 h-12" />,
  //     title: "Eco-Friendly Products",
  //     description: "We use only safe, non-toxic cleaning products for a healthy clean environment.",
  //     gradient: "from-emerald-600 to-green-600"
  //   }
  // ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our {projectCategory} Guarantee
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
  );
};

export default CleaningGuarantee;
