
import React from 'react';
import HVACHeader from '../components/HVACHeader';
import HVACCTA from '../components/HVACCTA';
import HVACAboutUs from '../components/HVACAboutUs';
import HVACServices from '../components/HVACServices';
import HVACWhyChooseUs from '../components/HVACWhyChooseUs';
import HVACProcess from '../components/HVACProcess';
import HVACGuarantee from '../components/HVACGuarantee';
import HVACTestimonials from '../components/HVACTestimonials';
import HVACServiceAreas from '../components/HVACServiceAreas';
import ServiceMap from '../../../components/ServiceMap';
import HVACFAQ from '../components/HVACFAQ';
import HVACFooter from '../components/HVACFooter';
import SEOHelmet from '../../../components/SEOHelmet';
import { useLocation } from 'react-router-dom';

const HVACAreaDetail = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      <SEOHelmet pageUrl={location.pathname} />
      <HVACHeader />
      <HVACCTA />
      <HVACAboutUs />
      <HVACServices />
      <HVACCTA />
      <HVACWhyChooseUs />
      <HVACProcess />
      <HVACCTA />
      <HVACGuarantee />
      <HVACTestimonials />
      <HVACCTA />
      <HVACServiceAreas />
      <ServiceMap theme="hvac" />
      <HVACFAQ />
      <HVACCTA />
      <HVACFooter />
    </div>
  );
};

export default HVACAreaDetail;
