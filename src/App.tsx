
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

// Dynamic Theme Components
import ThemeIndex from "./components/ThemeIndex";
import ThemeAbout from "./components/ThemeAbout";
import ThemeServices from "./components/ThemeServices";
import ThemeContact from "./components/ThemeContact";
import ThemeServiceDetail from "./components/ThemeServiceDetail";
import ThemeAreas from "./components/ThemeAreas";
import ThemeAreaDetail from "./components/ThemeAreaDetail";
import ThemeCountry from "./components/ThemeCountry";
import ThemeState from "./components/ThemeState";
import ThemeCity from "./components/ThemeCity";

// Legal Pages
import StateDetail from "./pages/StateDetail";
import CityDetail from "./pages/CityDetail";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// Theme-specific legal pages
import CleaningTermsConditions from "./themes/cleaning/pages/CleaningTermsConditions";
import CleaningPrivacyPolicy from "./themes/cleaning/pages/CleaningPrivacyPolicy";
import PlumbingTermsConditions from "./themes/plumbing/pages/PlumbingTermsConditions";
import PlumbingPrivacyPolicy from "./themes/plumbing/pages/PlumbingPrivacyPolicy";
import HVACTermsConditions from "./themes/hvac/pages/HVACTermsConditions";
import HVACPrivacyPolicy from "./themes/hvac/pages/HVACPrivacyPolicy";
import RoofingTermsConditions from "./themes/roofing/pages/RoofingTermsConditions";
import RoofingPrivacyPolicy from "./themes/roofing/pages/RoofingPrivacyPolicy";
import PaintingTermsConditions from "./themes/painting/pages/PaintingTermsConditions";
import PaintingPrivacyPolicy from "./themes/painting/pages/PaintingPrivacyPolicy";

import PlumbingMaps from "./themes/plumbing/pages/PlumbingMaps";

const queryClient = new QueryClient();

// Dynamic theme configuration - define the type properly
export type ThemeType = 'cleaning' | 'plumbing' | 'roofing' | 'hvac' | 'painting';
export const currentTheme: ThemeType = "cleaning";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Theme Routes */}
              <Route path="/" element={<ThemeIndex />} />
              <Route path="/about" element={<ThemeAbout />} />
              <Route path="/services" element={<ThemeServices />} />
              <Route path="/contact" element={<ThemeContact />} />
              <Route path="/services/:serviceName" element={<ThemeServiceDetail />} />
              <Route path="/:locationName/services/:serviceName" element={<ThemeServiceDetail />} />
              <Route path="/areas" element={<ThemeAreas />} />
              <Route path="/areas/:slug" element={<ThemeAreaDetail />} />
              <Route path="/:slug" element={<ThemeCountry />} />
              <Route path="/country/:countryname" element={<ThemeCountry />} />
              <Route path="/:countryname" element={<ThemeCountry />} />
              <Route path="/:countryname/:statename" element={<ThemeCountry />} />
              <Route path="/:countryname/:statename/:cityname" element={<ThemeCountry />} />
              <Route path="/:countryname/:statename/:cityname/:localareaname" element={<ThemeCountry />} />
              <Route path="/states" element={<ThemeState />} />
              <Route path="/cities" element={<ThemeCity />} />
              <Route path="/cities/:slug" element={<CityDetail />} />
              <Route path="/states/:slug" element={<StateDetail />} />
              <Route path="/maps" element={<PlumbingMaps />} />

              {/* Theme-specific Legal Pages */}
              <Route path="/terms-conditions" element={<CleaningTermsConditions />} />
              <Route path="/privacy-policy" element={<CleaningPrivacyPolicy />} />
              <Route path="/plumbing/terms-conditions" element={<PlumbingTermsConditions />} />
              <Route path="/plumbing/privacy-policy" element={<PlumbingPrivacyPolicy />} />
              <Route path="/hvac/terms-conditions" element={<HVACTermsConditions />} />
              <Route path="/hvac/privacy-policy" element={<HVACPrivacyPolicy />} />
              <Route path="/roofing/terms-conditions" element={<RoofingTermsConditions />} />
              <Route path="/roofing/privacy-policy" element={<RoofingPrivacyPolicy />} />
              <Route path="/painting/terms-conditions" element={<PaintingTermsConditions />} />
              <Route path="/painting/privacy-policy" element={<PaintingPrivacyPolicy />} />

              {/* General Legal Pages */}
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
