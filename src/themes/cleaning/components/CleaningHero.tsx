// src/themes/cleaning/components/CleaningHero.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpFile } from '../../../config.js';
import CleaningLoader from '../components/CleaningLoader';
import DynamicIcon from '../../../extras/DynamicIcon.js';
import { getProjectId } from '../../../hooks/getProjectId'; // Import the utility

interface Feature {
  serialno: number;
  iconName: string;
  title: string;
  subtitle: string;
}

export default function CleaningHero() {
  const navigate = useNavigate();
  const [projectCategory, setProjectCategory] = useState('');
  const [welcomeLine, setWelcomeLine]       = useState('');
  const [projectSlogan, setProjectSlogan]       = useState('');
  const [phoneNumber, setPhoneNumber]       = useState('');
  const [features, setFeatures]             = useState<Feature[]>([]);
  const [isLoading, setIsLoading]           = useState(true);
  const [heroHeadingPart1, setHeroHeadingPart1] = useState('');
  const [heroHeadingPart2, setHeroHeadingPart2] = useState('');
const conjunctions = [
  'and', 'or', 'but', 'with', 'for', 'as', 'because', 'so', 'then', 'by', 'on', 'at', 
  'in', 'of', 'to', 'from', 'about', 'through', 'between', 'during', 'before', 'after'
];
  // projectId from query or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const site = urlParams.get('siteId');
  if (site && localStorage.getItem('currentSiteId') !== site) {
    localStorage.setItem('currentSiteId', site);
  }
const [projectId, setProjectId] = useState(null); // Initialize as null

useEffect(() => {
    // Get projectId from utility function
    const id = getProjectId();

    console.log(id, "this is id")
    setProjectId(id); // Set projectId in state
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await httpFile.post('/webapp/v1/my_site', {
          projectId,
          pageType: 'home',
          reqFrom: 'Hero'
        });

        const info = data.projectInfo || {};
        const about = data.aboutUs || {};

        setProjectCategory(info.serviceType || '');
        setWelcomeLine(info.welcomeLine   || '');
        setPhoneNumber(about.phone       || '');
        // Split heroHeading intelligently
        const words = info.heroHeading?.split(' ') || [];

        // If heading has more than 3 words, attempt to split based on meaningful conjunctions
        if (words.length > 3) {
          let breakIndex = -1;
          // Find the first occurrence of any conjunction or preposition
          for (let i = 0; i < words.length; i++) {
            if (conjunctions.includes(words[i].toLowerCase())) {
              breakIndex = i;
              break;
            }
          }

          if (breakIndex !== -1) {
            // Split at the first meaningful conjunction
            setHeroHeadingPart1(words.slice(0, breakIndex + 1).join(' ') || '');
            setHeroHeadingPart2(words.slice(breakIndex + 1).join(' ') || '');
          } else {
            // Fallback to split the first part with a few words, and second part with the rest
            setHeroHeadingPart1(words.slice(0, words.length - 2).join(' ') || '');
            setHeroHeadingPart2(words.slice(-2).join(' ') || '');
          }
        } else {
          // For 2 or 3 words, use a simpler split
          if (words.length === 3) {
            setHeroHeadingPart1(words.slice(0, 1).join(' ') || '');
            setHeroHeadingPart2(words.slice(1).join(' ') || '');
          } else {
            setHeroHeadingPart1(words.slice(0, 1).join(' ') || '');
            setHeroHeadingPart2(words.slice(1).join(' ') || '');
          }
        }

setProjectSlogan(info.projectSlogan || `Professional ${info.serviceType}`);
        // sanitize helper
        const strip = (s: any) =>
          typeof s === 'string'
            ? s.trim().replace(/^[,\"\s]+|[,\"\s]+$/g, '')
            : '';

        // clean features
        setFeatures(
          (info.featuresSection || []).map((f: any) => ({
            serialno: f.serialno,
            iconName: strip(f.iconName),
            title:    strip(f.title),
            subtitle: strip(f.subtitle)
          }))
        );
      } catch (err) {
        console.error('Fetch hero data error:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [projectId]);

  if (isLoading) return <CleaningLoader />;

  return (
    <section className="relative py-20 bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white overflow-hidden min-h-[700px] flex items-center">
      {/* animated dots */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random()*8+4}px`,
              height:`${Math.random()*8+4}px`,
              top:   `${Math.random()*100}%`,
              left:  `${Math.random()*100}%`,
              animationDelay:   `${Math.random()*3}s`,
              animationDuration:`${Math.random()*4+2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Badge */}
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
          <DynamicIcon iconName="Sparkles" className="w-5 h-5 text-emerald-300 mr-2" />
          <span className="text-emerald-100 font-semibold">
             {projectSlogan}
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
             {heroHeadingPart1}
          </span><br/>
          <span className="text-emerald-300">{heroHeadingPart2}</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-green-100 mb-12 leading-relaxed max-w-4xl mx-auto">
          {welcomeLine}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <a
            href={`tel:${phoneNumber}`}
            className="group bg-white text-green-600 px-8 py-5 rounded-2xl font-bold text-lg transition-transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3"
          >
            <DynamicIcon iconName="Phone" size={24} className="group-hover:animate-bounce" />
            <span>Call Now: {phoneNumber}</span>
          </a>
          <button
            onClick={()=>navigate('/contact')}
            className="group bg-emerald-500/80 backdrop-blur-sm hover:bg-emerald-400 text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-transform hover:scale-105 border border-white/30"
          >
            <DynamicIcon iconName="Sparkles" size={24} className="group-hover:rotate-12 transition-transform" />
            <span>Free Quote</span>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map(f => (
            <div key={f.serialno} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <DynamicIcon
                iconName={f.iconName}
                className="w-8 h-8 text-emerald-300 mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-green-100 text-sm">{f.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}