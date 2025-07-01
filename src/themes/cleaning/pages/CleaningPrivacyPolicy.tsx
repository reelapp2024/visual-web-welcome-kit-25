import React, { useEffect, useState } from "react";
import { httpFile } from "../../../config.js";
import DOMPurify from 'dompurify';
import CleaningHeader from '../components/CleaningHeader';
import CleaningFooter from '../components/CleaningFooter';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const CleaningPrivacyPolicy = () => {
  const [privacyContent, setPrivacyContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoData, setSeoData] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: ''
  });

  const savedSiteId = localStorage.getItem("currentSiteId");
  const projectId = savedSiteId || "685cffa53ee7098086538c06";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await httpFile.post("/webapp/v1/fetchTnC_Au_Pp", { projectId });

        if (data.privacyPolicy) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.privacyPolicy, "text/html");
          const bodyContent = doc.body.innerHTML;
          const cleanHTML = DOMPurify.sanitize(bodyContent);
          setPrivacyContent(cleanHTML);
        } else {
          setPrivacyContent("<p>No privacy policy available.</p>");
        }

        const seoResponse = await httpFile.get(`/webapp/v1/seo/privacy-policy`);
        setSeoData(seoResponse.data.data);
      } catch (err) {
        setError("Failed to load privacy policy.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  console.log("Raw HTML content:", privacyContent);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seoData.meta_title}</title>
        <meta name="description" content={seoData.meta_description} />
        <meta name="keywords" content={seoData.meta_keywords} />
      </Helmet>
      
      <div className="min-h-screen font-poppins">
        <CleaningHeader />
        <style dangerouslySetInnerHTML={{__html: "\n        h1 {\n  font-size: 2rem;\n  font-weight: bold;\n  margin-bottom: 1rem;\n}\n\nh2 {\n  font-size: 1.5rem;\n  font-weight: semi-bold;\n  margin-top: 1.5rem;\n  margin-bottom: 0.75rem;\n}\n\np {\n  margin-bottom: 1rem;\n  line-height: 1.6;\n}\n\n      " }} />
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
              <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4 w-20 h-20 mx-auto mb-6">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                  Privacy Policy
                </h1>
                {/* <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p> */}
              </div>
              
              <div className="space-y-8 text-gray-700">
                <section>
                  {loading && <p>Loading privacy policy...</p>}
                  {error && <p className="text-red-500">{error}</p>}
                  {!loading && !error && (
                    <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
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

export default CleaningPrivacyPolicy;
