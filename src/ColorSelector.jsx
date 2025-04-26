import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDroplet, FiCheck, FiPlus, FiEye } from 'react-icons/fi';
import SliderControl from './SliderControl';

const ColorSelector = ({ label, value, onChange }) => {
  const [showCustomColor, setShowCustomColor] = useState(false);

  const colorGroups = [
    {
      name: 'Classiques',
      colors: [
        { color: '#1F2937', name: 'Noir' },
        { color: '#4B5563', name: 'Gris foncé' },
        { color: '#6B7280', name: 'Gris' },
        { color: '#9CA3AF', name: 'Gris clair' },
        { color: '#D1D5DB', name: 'Gris très clair' },
        { color: '#FFFFFF', name: 'Blanc' }
      ]
    },
    {
      name: 'Vibrants',
      colors: [
        { color: '#2563EB', name: 'Bleu royal' },
        { color: '#7C3AED', name: 'Violet' },
        { color: '#DC2626', name: 'Rouge' },
        { color: '#059669', name: 'Vert émeraude' },
        { color: '#D97706', name: 'Ambre' },
        { color: '#EC4899', name: 'Rose' }
      ]
    },
    {
      name: 'Pastels',
      colors: [
        { color: '#93C5FD', name: 'Bleu ciel' },
        { color: '#A78BFA', name: 'Lavande' },
        { color: '#F87171', name: 'Corail' },
        { color: '#34D399', name: 'Menthe' },
        { color: '#FBBF24', name: 'Pêche' },
        { color: '#F472B6', name: 'Poudre' }
      ]
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center space-x-2">
          <div 
            className="w-6 h-6 rounded-full border-2 border-gray-200"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-gray-500">{value}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {colorGroups.map((group) => (
          <div key={group.name} className="space-y-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {group.name}
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {group.colors.map(({ color, name }) => (
                <motion.button
                  key={color}
                  onClick={() => {
                    onChange(color);
                    setShowCustomColor(false);
                  }}
                  className="group relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className={`w-full aspect-square rounded-lg shadow-sm transition-all ${
                      value === color ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:shadow-md'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {value === color && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-white rounded-full p-1 shadow-lg"
                      >
                        <FiCheck className="w-4 h-4 text-indigo-600" />
                      </motion.div>
                    )}
                  </div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2">
          <motion.button
            onClick={() => setShowCustomColor(!showCustomColor)}
            className="w-full py-2 px-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors flex items-center justify-center space-x-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiPlus className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
            <span className="text-sm text-gray-600 group-hover:text-indigo-500">
              Couleur personnalisée
            </span>
          </motion.button>
          
          <AnimatePresence>
            {showCustomColor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-3 p-4 bg-white border border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <SliderControl
                  label="Opacité"
                  value={parseInt(value.slice(-2), 16)}
                  onChange={(opacity) => {
                    const hexOpacity = Math.round(opacity).toString(16).padStart(2, '0');
                    onChange(value.slice(0, 7) + hexOpacity);
                  }}
                  min={0}
                  max={255}
                  step={1}
                  unit=""
                  icon={<FiEye className="w-4 h-4" />}
                  color="indigo"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ColorSelector; 