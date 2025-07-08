
import React, { useState, useEffect } from 'react';
import { Shield, Clock, Award, Users, CheckCircle, Sparkles } from 'lucide-react';
import { httpFile } from "../../../config.js";
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js';

const CleaningWhyChooseUs = () => {

  const [projectCategory, setProjectCategory] = useState("");
  const [projectName, setprojectName] = useState("");
  const [projectWhyChooseUs, setprojectWhyChooseUs] = useState([]);

  const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await httpFile.post("/webapp/v1/my_site", {
          projectId,
          pageType: "home",
          reqFrom:"Whychooseus"

        });

        if (data.projectInfo && data.projectInfo.serviceType) {
          setProjectCategory(data.projectInfo.serviceType);
          setprojectName(data.projectInfo.projectName);
          setprojectWhyChooseUs(data.projectInfo.whyChooseUsSection);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId]);

  console.log(projectWhyChooseUs, "projectWhyChooseUs")

  return (
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
            <div key={index} className="text-center group h-full">
              <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 p-8 border border-gray-100 h-full flex flex-col">

                <div
                  className={`bg-gradient-to-br ${feature.gradient || 'from-gray-400 to-gray-600'
                    } rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0`}
                >
                  <DynamicFAIcon iconClass={feature.iconClass || ''} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex-shrink-0">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningWhyChooseUs;
