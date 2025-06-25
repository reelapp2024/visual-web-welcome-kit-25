
import React ,{useEffect, useState} from 'react';
import { httpFile } from "../../../config.js";
import { Phone, Calendar, Sparkles, CheckCircle } from 'lucide-react';
import DynamicFAIcon from '../../../extras/DynamicFAIcon.js'; // make sure the path is correct

const CleaningProcess = () => {


    const [projectOurProcess, setprojectOurProcess] = useState([]);
    const [projectCategory, setProjectCategory] = useState("");
  
   const savedSiteId = localStorage.getItem("currentSiteId");
    const projectId = savedSiteId || "685bf8e93f68ae53bc89381a";
    console.log(projectId, "This is project id in services section");

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await httpFile.post("/webapp/v1/my_site", {
              projectId,
              pageType: "home",
          reqFrom:"Process"

            });
    
            if (data.projectInfo ) {
          setProjectCategory(data.projectInfo.serviceType);
            
              setprojectOurProcess(data.projectInfo.ourProcessSection);
             
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, [projectId]);






  console.log(projectOurProcess,"projectOurProcessprojectOurProcessprojectOurProcessprojectOurProcessprojectOurProcess")

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
            Our Simple Process
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our streamlined {projectOurProcess.length}-step process ensures you get professional {projectCategory} service from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {projectOurProcess.map((step, index) => (
            <div key={index} className="text-center relative group">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-10 shadow-xl group-hover:scale-110 transition-all duration-300">
                {index + 1 }
              </div>
              
              {/* Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 p-8 border border-gray-100">
                {/* <div className={`bg-gradient-to-br ${step.gradient} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  {step.icon}
                </div> */}
  <div
                  className={`bg-gradient-to-br ${step.gradient || 'from-gray-400 to-gray-600'
                    } rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-all duration-300`}
                >
                    <DynamicFAIcon iconClass={step.iconClass || ''} />
                  {/* Changed icon color to green-500 */}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow for desktop */}
              {index < projectOurProcess.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-green-300 z-20">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CleaningProcess;
