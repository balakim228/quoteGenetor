import React from 'react';
import { FiChevronDown, FiSearch, FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const FontSelector = ({ style, onChange, showFontSearch, setShowFontSearch, fontSearch, setFontSearch, filteredFonts }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Police
      </label>
      <div className="relative">
        <button
          onClick={() => setShowFontSearch(!showFontSearch)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all flex items-center justify-between group"
        >
          <div className="flex items-center space-x-3">
            <span 
              className="text-base transition-all duration-200" 
              style={{ 
                fontFamily: style.fontFamily,
                fontWeight: style.fontWeight,
                fontStyle: style.fontStyle
              }}
            >
              {style.fontFamily}
            </span>
            <span className="text-sm text-gray-500 group-hover:text-indigo-500 transition-colors">
              AaBbCcDdEeFfGg
            </span>
          </div>
          <FiChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${showFontSearch ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {showFontSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-3 border-b border-gray-200">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={fontSearch}
                    onChange={(e) => setFontSearch(e.target.value)}
                    placeholder="Rechercher une police..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="p-2 grid grid-cols-1 gap-1">
                {filteredFonts.map((font) => (
                  <motion.button
                    key={font}
                    onClick={() => {
                      onChange('fontFamily', font);
                      setShowFontSearch(false);
                    }}
                    className={`w-full px-4 py-3 text-left rounded-md transition-all ${
                      style.fontFamily === font
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    style={{ 
                      fontFamily: font,
                      fontWeight: style.fontWeight,
                      fontStyle: style.fontStyle
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-base font-medium">{font}</span>
                        <span className="text-sm text-gray-500 block">
                          AaBbCcDdEeFfGg
                        </span>
                      </div>
                      {style.fontFamily === font && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-indigo-600"
                        >
                          <FiCheck className="w-5 h-5" />
                        </motion.span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FontSelector; 