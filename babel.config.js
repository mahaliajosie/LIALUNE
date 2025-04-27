// -------------------------- BABEL --------------------------
// * Babel = the JavaScript compiler used by React Native and Expo projects
// * takes modern JavaScript (ES6+) or JSX code and compiles it 
// * into code that can run on older environments (like Android and iOS native layers)
// * without this Metro won't recognize shortcuts. 
// -----------------------------------------------------------
module.exports = function(api) {
    api.cache(true); // - Improves performance by caching the config
  
    return {
      presets: ['babel-preset-expo'], // - Required for Expo projects
      plugins: [
        [
          'module-resolver', // - Enables custom path aliases
          {
            root: ['./'],     // - Base path
            alias: {
              "@pages": "./pages",
              "@assets": "./assets",
              "@components": "./components",
              "@constants": "./constants",
              "@context": "./context",      
              "@navigation": "./navigation",
              "@utilities": "./utilities",
              "@data": "./data"
            }
          }
        ]
      ]
    };
  };