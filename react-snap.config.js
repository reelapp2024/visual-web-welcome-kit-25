// react-snap.config.js
module.exports = {
  source: "dist",  // Specify the dist folder where Vite generates the build
  minifyHtml: true,  // Minify the HTML files for production
  crawl: true,  // Allow crawling of all pages
  include: [
    "/",  // Home page
    "/about",  // About page
    "/contact",  // Contact page
    "/terms-conditions",  // Terms & Conditions page
    "/privacy-policy",  // Privacy Policy page
    "/services",  // Services page
    "/services/:serviceName",  // Dynamic Service page
    "/areas",  // Availability Area page
    "/areas/:slug",  // Dynamic area page
    "/:slug",  // General dynamic route for country, state, or city
    "/:countryname",  // Dynamic country page
    "/:countryname/:statename",  // Dynamic state page
    "/:countryname/:statename/:cityname",  // Dynamic city page
    "/:countryname/:statename/:cityname/:localareaname",  // Dynamic local area page
  ],
  debug: true,  // Enable debug mode to troubleshoot
};
