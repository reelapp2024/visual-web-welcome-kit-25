import React, { useEffect, useState } from "react";
import { httpFile } from "../../../config.js";
import DOMPurify from 'dompurify';  // install with npm/yarn if needed
import CleaningHeader from '../components/CleaningHeader';
import CleaningFooter from '../components/CleaningFooter';
import { CheckCircle, FileText } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const CleaningTermsConditions = () => {
  const [termsContent, setTermsContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });

  // Get project ID from environment variable only
  const projectId = import.meta.env.VITE_PROJECT_ID;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await httpFile.post("/webapp/v1/fetchTnC_Au_Pp", { projectId });

        if (data.termsAndConditions) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.termsAndConditions, "text/html");
          const bodyContent = doc.body.innerHTML;
          const cleanHTML = DOMPurify.sanitize(bodyContent);
          setTermsContent(cleanHTML);
        } else {
          setTermsContent("<p>No terms and conditions available.</p>");
        }

        const seoResponse = await httpFile.get(`/webapp/v1/seo/terms-conditions`);
        setSeoData(seoResponse.data.data);
      } catch (err) {
        setError("Failed to load terms and conditions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  console.log("Raw seoData content:", seoData);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keywords} />
      </Helmet>
      
      <div className="min-h-screen font-poppins">

        <CleaningHeader />

        <style dangerouslySetInnerHTML={{ __html: "\n        h1 {\n  font-size: 2rem;\n  font-weight: bold;\n  margin-bottom: 1rem;\n}\n\nh2 {\n  font-size: 1.5rem;\n  font-weight: semi-bold;\n  margin-top: 1.5rem;\n  margin-bottom: 0.75rem;\n}\n\np {\n  margin-bottom: 1rem;\n  line-height: 1.6;\n}\n\n      " }} />


        <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Terms & Conditions
                </h1>
              </div>

              <div className="space-y-8 text-gray-700">
                <section>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                    Service Agreement
                  </h2>

                  {loading && <p>Loading terms and conditions...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && (
                    <div dangerouslySetInnerHTML={{ __html: termsContent }} />
                  )}
                </section>
              </div>
            </div>
          </div>
        </div>

        <CleaningFooter />
      </div>
    </HelmetProvider>
  );
};

export default CleaningTermsConditions;
