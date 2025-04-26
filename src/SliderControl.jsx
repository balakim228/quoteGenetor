import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SliderControl = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  unit = '%',
  icon,
  color = 'indigo'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, []);

  const percentage = ((value - min) / (max - min)) * 100;
  const colorClasses = {
    indigo: 'bg-indigo-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span>{label}</span>
        </label>
        <span className="text-sm text-gray-500">
          {value}{unit}
        </span>
      </div>
      
      <div 
        ref={sliderRef}
        className="relative h-2 bg-gray-200 rounded-full cursor-pointer group"
        onMouseEnter={() => setShowValue(true)}
        onMouseLeave={() => !isDragging && setShowValue(false)}
      >
        {/* Barre de progression */}
        <div 
          className={`absolute h-full rounded-full ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
        {/* Curseur */}
        <motion.div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-${color}-500 cursor-grab active:cursor-grabbing`}
          style={{ left: `${percentage}%` }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        />
        {/* Indicateur de valeur au survol */}
        <AnimatePresence>
          {showValue && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap"
              style={{ left: `${percentage}%` }}
            >
              {value}{unit}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Input range invisible pour la compatibilité */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SliderControl; 