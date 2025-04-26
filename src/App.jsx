import React, { useState, useEffect } from 'react';
import { FiDownload, FiHelpCircle, FiSettings, FiLayout, FiImage, FiSliders, FiZap, FiChevronDown, FiType, FiUser, FiCamera, FiSearch, FiAlignLeft, FiAlignCenter, FiAlignRight, FiX, FiDroplet, FiGrid, FiLayers, FiBox, FiSun, FiCheck, FiPlus, FiEye } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import FontSelector from './FontSelector';
import ColorSelector from './ColorSelector';

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState('content');
  const [selectedFormat, setSelectedFormat] = useState('square');
  const [expandedSection, setExpandedSection] = useState(null);
  const [quoteText, setQuoteText] = useState('The only way to do great work is to love what you do.');
  const [authorName, setAuthorName] = useState('Steve Jobs');
  const [authorImage, setAuthorImage] = useState(null);
  const [fontSearch, setFontSearch] = useState('');
  const [showFontSearch, setShowFontSearch] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [cardStyle, setCardStyle] = useState({
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadow: 'none',
    gradient: 'none',
    gradientColors: ['#ffffff', '#ffffff'],
    gradientAngle: 0,
    backgroundImage: null,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    blur: 0,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    showBorder: false
  });

  const defaultColors = [
    '#1F2937', // Gray 800
    '#2563EB', // Blue 600
    '#7C3AED', // Purple 600
    '#DC2626', // Red 600
  ];

  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Raleway', 'Source Sans Pro',
    'Oswald', 'Playfair Display', 'Merriweather', 'PT Sans', 'Noto Sans', 'Ubuntu', 'Nunito',
    'Quicksand', 'Work Sans', 'Rubik', 'Mulish', 'DM Sans', 'Josefin Sans', 'Comfortaa', 'Barlow',
    'Karla', 'Manrope', 'Outfit', 'Plus Jakarta Sans', 'Figtree', 'Space Grotesk', 'Sora',
    'Lexend', 'Albert Sans', 'Cabinet Grotesk', 'Clash Display', 'General Sans', 'Satoshi',
    'Switzer', 'Clash Grotesk', 'Grifter', 'Cabinet Grotesk', 'Clash Display', 'General Sans',
    'Satoshi', 'Switzer', 'Clash Grotesk', 'Grifter', 'Cabinet Grotesk', 'Clash Display',
    'General Sans', 'Satoshi', 'Switzer', 'Clash Grotesk', 'Grifter'
  ];

  const fontStyles = [
    { value: 'normal', label: 'Normal' },
    { value: 'italic', label: 'Italique' },
    { value: 'bold', label: 'Gras' },
    { value: 'bold italic', label: 'Gras Italique' },
    { value: '300', label: 'Light' },
    { value: '500', label: 'Medium' },
    { value: '700', label: 'Bold' },
  ];

  const [quoteStyle, setQuoteStyle] = useState({
    fontSize: '1.25rem',
    fontFamily: 'Inter',
    textColor: '#1F2937',
    textAlign: 'center',
    lineHeight: '1.5',
    letterSpacing: '0.025em',
    fontWeight: 'normal',
    fontStyle: 'normal',
  });

  const [authorStyle, setAuthorStyle] = useState({
    fontSize: '0.875rem',
    fontFamily: 'Inter',
    textColor: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'normal',
  });

  const [imageStyle, setImageStyle] = useState({
    size: '64px',
    shape: 'circle',
    border: '2px solid #E5E7EB',
    position: 'bottom',
    filter: 'none',
    opacity: 1,
    rotation: 0,
    brightness: 100,
    contrast: 100,
    blur: 0,
  });

  const imageFilters = [
    { value: 'none', label: 'Aucun' },
    { value: 'grayscale', label: 'Noir et blanc' },
    { value: 'sepia', label: 'Sépia' },
    { value: 'invert', label: 'Inversé' },
  ];

  const imageShapes = [
    { value: 'circle', label: 'Cercle' },
    { value: 'square', label: 'Carré' },
    { value: 'rounded', label: 'Arrondi' },
    { value: 'hexagon', label: 'Hexagone' },
  ];

  const menuItems = [
    { id: 'content', icon: FiLayout, label: 'Content' },
    { id: 'design', icon: FiSliders, label: 'Design' },
    { id: 'background', icon: FiImage, label: 'Background' },
    { id: 'effect', icon: FiZap, label: 'Effect' },
  ];

  const contentSections = [
    {
      id: 'quote-text',
      icon: FiType,
      label: 'Texte de la citation',
      options: quoteStyle
    },
    {
      id: 'author-name',
      icon: FiUser,
      label: 'Titre de l\'auteur',
      options: authorStyle
    },
    {
      id: 'author-image',
      icon: FiCamera,
      label: 'Image de l\'auteur',
      options: imageStyle
    }
  ];

  const textAlignments = [
    { value: 'left', icon: FiAlignLeft, label: 'Gauche' },
    { value: 'center', icon: FiAlignCenter, label: 'Centre' },
    { value: 'right', icon: FiAlignRight, label: 'Droite' },
  ];

  const formats = [
    { value: 'square', label: 'Carré', width: 'w-96', height: 'h-96' },
    { value: 'rectangle', label: 'Rectangle', width: 'w-[32rem]', height: 'h-80' },
    { value: 'portrait', label: 'Portrait', width: 'w-80', height: 'h-96' },
    { value: 'landscape', label: 'Paysage', width: 'w-[32rem]', height: 'h-64' },
  ];

  const helpContent = [
    {
      title: 'Formats',
      content: 'Choisissez parmi 5 formats différents : Carré, Rectangle, Cercle, Portrait et Paysage.'
    },
    {
      title: 'Contenu',
      content: 'Personnalisez le texte de la citation, le nom de l\'auteur et son image.'
    },
    {
      title: 'Design',
      content: 'Ajustez les couleurs, polices, tailles et alignements du texte.'
    },
    {
      title: 'Image',
      content: 'Ajoutez une photo de l\'auteur avec des options avancées de personnalisation.'
    },
    {
      title: 'Téléchargement',
      content: 'Téléchargez votre citation en format PNG pour la partager facilement.'
    }
  ];

  const designSections = [];

  const solidColors = [
    { id: 'white', color: '#ffffff', name: 'Blanc' },
    { id: 'black', color: '#000000', name: 'Noir' },
    { id: 'gray', color: '#e5e7eb', name: 'Gris' },
    { id: 'blue', color: '#3b82f6', name: 'Bleu' },
    { id: 'green', color: '#10b981', name: 'Vert' },
    { id: 'orange', color: '#f59e0b', name: 'Orange' },
    { id: 'red', color: '#ef4444', name: 'Rouge' },
    { id: 'purple', color: '#8b5cf6', name: 'Violet' }
  ];

  const gradients = [
    { id: 'sunset', colors: ['#ff6b6b', '#feca57'], angle: 45 },
    { id: 'ocean', colors: ['#48dbfb', '#1dd1a1'], angle: 135 },
    { id: 'lavender', colors: ['#c8d6e5', '#a8a4e6'], angle: 90 },
    { id: 'forest', colors: ['#00b894', '#00cec9'], angle: 180 },
    { id: 'berry', colors: ['#e84393', '#fd79a8'], angle: 225 },
    { id: 'midnight', colors: ['#2d3436', '#6c5ce7'], angle: 270 },
    { id: 'autumn', colors: ['#e17055', '#fdcb6e'], angle: 30 },
    { id: 'spring', colors: ['#81ecec', '#55efc4'], angle: 120 },
    { id: 'winter', colors: ['#74b9ff', '#a29bfe'], angle: 210 },
    { id: 'summer', colors: ['#ffeaa7', '#fdcb6e'], angle: 60 },
    { id: 'sunrise', colors: ['#ff7675', '#fdcb6e'], angle: 15 },
    { id: 'twilight', colors: ['#6c5ce7', '#a29bfe'], angle: 300 },
    { id: 'custom', colors: ['#ffffff', '#ffffff'], angle: 0 }
  ];

  const backgroundSizes = [
    { id: 'cover', name: 'Couverture', icon: '⊞' },
    { id: 'contain', name: 'Contenu', icon: '⊟' },
    { id: 'auto', name: 'Auto', icon: '□' }
  ];

  const backgroundPositions = [
    { id: 'center', name: 'Centre', icon: '•' },
    { id: 'top', name: 'Haut', icon: '↑' },
    { id: 'bottom', name: 'Bas', icon: '↓' },
    { id: 'left', name: 'Gauche', icon: '←' },
    { id: 'right', name: 'Droite', icon: '→' }
  ];

  const [showFormatMenu, setShowFormatMenu] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      const fontFamilies = fonts.map(font => font.replace(' ', '+'));
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies.join('&family=')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };
    loadFonts();
  }, []);

  const handleDownload = () => {
    const quoteElement = document.getElementById('quote-card');
    if (!quoteElement) return;

    html2canvas(quoteElement).then(canvas => {
      const link = document.createElement('a');
      link.download = 'citation.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  const handleQuoteStyleChange = (property, value) => {
    setQuoteStyle(prev => ({ ...prev, [property]: value }));
  };

  const handleAuthorStyleChange = (property, value) => {
    setAuthorStyle(prev => ({ ...prev, [property]: value }));
  };

  const handleImageStyleChange = (property, value) => {
    setImageStyle(prev => ({ ...prev, [property]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuthorImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredFonts = fonts.filter(font => 
    font.toLowerCase().includes(fontSearch.toLowerCase())
  );

  const getCardStyle = () => {
    const style = {
      background: cardStyle.gradient === 'linear' 
        ? `linear-gradient(${cardStyle.gradientAngle}deg, ${cardStyle.gradientColors.join(', ')})`
        : cardStyle.backgroundImage 
          ? `url(${cardStyle.backgroundImage})`
          : cardStyle.backgroundColor,
      backgroundSize: cardStyle.backgroundSize,
      backgroundPosition: cardStyle.backgroundPosition,
      borderRadius: `${cardStyle.borderRadius}px`,
      padding: `${cardStyle.padding}px`,
      boxShadow: cardStyle.shadow === 'xl' 
        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
        : 'none',
      border: cardStyle.showBorder 
        ? `${cardStyle.borderWidth}px solid ${cardStyle.borderColor}` 
        : 'none',
      filter: `
        blur(${cardStyle.blur}px)
        brightness(${cardStyle.brightness}%)
        contrast(${cardStyle.contrast}%)
        saturate(${cardStyle.saturation}%)
      `,
      width: formats.find(f => f.value === selectedFormat)?.width || 'w-96',
      height: formats.find(f => f.value === selectedFormat)?.height || 'h-96',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    };

    return style;
  };

  const getQuoteStyle = () => {
    return {
      color: quoteStyle.textColor,
      fontSize: quoteStyle.fontSize,
      fontWeight: quoteStyle.fontWeight,
      fontStyle: quoteStyle.fontStyle,
      textAlign: quoteStyle.textAlign,
      lineHeight: quoteStyle.lineHeight,
      fontFamily: quoteStyle.fontFamily,
      letterSpacing: quoteStyle.letterSpacing,
      marginBottom: '1.5rem',
      position: 'relative',
      padding: '0 3rem',
      maxWidth: '90%',
      '&::before': {
        content: '"',
        position: 'absolute',
        top: '-2rem',
        left: '0',
        fontSize: '6rem',
        color: 'rgba(0,0,0,0.1)',
        fontFamily: 'Georgia, serif',
        transform: 'translateY(0.5rem)',
        lineHeight: 1,
      },
      '&::after': {
        content: '"',
        position: 'absolute',
        bottom: '-4rem',
        right: '0',
        fontSize: '6rem',
        color: 'rgba(0,0,0,0.1)',
        fontFamily: 'Georgia, serif',
        transform: 'translateY(-0.5rem)',
        lineHeight: 1,
      }
    };
  };

  const getAuthorStyle = () => {
    return {
      color: authorStyle.textColor,
      fontSize: authorStyle.fontSize,
      fontWeight: authorStyle.fontWeight,
      fontStyle: authorStyle.fontStyle,
      textAlign: authorStyle.textAlign,
      fontFamily: authorStyle.fontFamily,
      marginTop: '3rem',
      position: 'relative',
      padding: '0.5rem 2rem',
      '&::before': {
        content: '—',
        marginRight: '0.5rem',
        fontSize: '1.2em',
        opacity: 0.7,
        fontFamily: 'Georgia, serif',
      }
    };
  };

  const getImageStyle = () => {
    const baseStyle = {
      width: imageStyle.size,
      height: imageStyle.size,
      border: imageStyle.border,
      opacity: imageStyle.opacity,
      transform: `rotate(${imageStyle.rotation}deg)`,
      filter: `
        brightness(${imageStyle.brightness}%)
        contrast(${imageStyle.contrast}%)
        blur(${imageStyle.blur}px)
        ${imageStyle.filter !== 'none' ? imageStyle.filter + '(100%)' : ''}
      `,
      transition: 'all 0.3s ease',
      objectFit: 'cover',
    };

    switch (imageStyle.shape) {
      case 'circle':
        baseStyle.borderRadius = '50%';
        break;
      case 'rounded':
        baseStyle.borderRadius = '12px';
        break;
      case 'hexagon':
        baseStyle.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        break;
      default:
        baseStyle.borderRadius = '0';
    }

    return baseStyle;
  };

  const renderFontSelector = (style, onChange, showFontSearch, setShowFontSearch, fontSearch, setFontSearch, filteredFonts) => {
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

  const renderFontStyleSelector = (style, onChange) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Style de police
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fontStyles.map((styleOption) => (
            <button
              key={styleOption.value}
              onClick={() => {
                const [weight, fontStyle] = styleOption.value.split(' ');
                onChange('fontWeight', weight);
                onChange('fontStyle', fontStyle);
              }}
              className={`px-4 py-3 rounded-lg border transition-all ${
                style.fontWeight === styleOption.value.split(' ')[0] && 
                style.fontStyle === styleOption.value.split(' ')[1]
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-600'
                  : 'border-gray-300 hover:border-indigo-500 text-gray-700'
              }`}
              style={{ 
                fontFamily: style.fontFamily,
                fontWeight: styleOption.value.split(' ')[0],
                fontStyle: styleOption.value.split(' ')[1]
              }}
            >
              <div className="flex items-center justify-between">
                <span>{styleOption.label}</span>
                {style.fontWeight === styleOption.value.split(' ')[0] && 
                 style.fontStyle === styleOption.value.split(' ')[1] && (
                  <FiCheck className="w-5 h-5" />
                )}
              </div>
              <span className="text-sm text-gray-500 block mt-1">
                AaBbCcDdEeFfGg
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderContentOptions = () => {
    return (
      <div className="space-y-4">
        {contentSections.map((section) => (
          <div key={section.id} className="border border-indigo-200 rounded-xl overflow-hidden bg-white">
            <button
              className="w-full px-4 py-3 flex items-center justify-between bg-indigo-50 hover:bg-indigo-100 transition-colors"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <div className="flex items-center space-x-3">
                <section.icon className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-indigo-900">{section.label}</span>
              </div>
              <FiChevronDown
                className={`w-5 h-5 text-indigo-600 transform transition-transform ${
                  expandedSection === section.id ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 space-y-4"
                >
                  {section.id === 'quote-text' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Texte
                        </label>
                        <textarea
                          value={quoteText}
                          onChange={(e) => setQuoteText(e.target.value)}
                          className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                          placeholder="Entrez votre citation..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alignement
                        </label>
                        <div className="flex space-x-2">
                          {textAlignments.map((alignment) => (
                            <button
                              key={alignment.value}
                              onClick={() => handleQuoteStyleChange('textAlign', alignment.value)}
                              className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                                quoteStyle.textAlign === alignment.value
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <alignment.icon className="w-5 h-5 mx-auto" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Taille de police
                        </label>
                        <input
                          type="range"
                          min="12"
                          max="48"
                          value={parseInt(quoteStyle.fontSize)}
                          onChange={(e) => handleQuoteStyleChange('fontSize', `${e.target.value}px`)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <div className="text-sm text-gray-500 text-right mt-1">
                          {parseInt(quoteStyle.fontSize)}px
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Police
                        </label>
                        <select
                          value={quoteStyle.fontFamily}
                          onChange={(e) => handleQuoteStyleChange('fontFamily', e.target.value)}
                          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                        >
                          {fonts.map((font) => (
                            <option key={font} value={font} style={{ fontFamily: font }}>
                              {font}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Style de police
                        </label>
                        <select
                          value={`${quoteStyle.fontWeight} ${quoteStyle.fontStyle}`}
                          onChange={(e) => {
                            const [weight, style] = e.target.value.split(' ');
                            handleQuoteStyleChange('fontWeight', weight);
                            handleQuoteStyleChange('fontStyle', style);
                          }}
                          className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                        >
                          {fontStyles.map((style) => (
                            <option key={style.value} value={style.value}>
                              {style.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {section.id === 'author-name' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom de l'auteur
                        </label>
                        <input
                          type="text"
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Nom de l'auteur..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Taille de police
                        </label>
                        <input
                          type="range"
                          min="12"
                          max="32"
                          value={parseInt(authorStyle.fontSize)}
                          onChange={(e) => handleAuthorStyleChange('fontSize', `${e.target.value}px`)}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-right">
                          {parseInt(authorStyle.fontSize)}px
                        </div>
                      </div>
                      <div>
                        <ColorSelector
                          label="Couleur de l'auteur"
                          value={authorStyle.textColor}
                          onChange={(color) => handleAuthorStyleChange('textColor', color)}
                        />
                      </div>
                      {renderFontSelector(authorStyle, handleAuthorStyleChange, showFontSearch, setShowFontSearch, fontSearch, setFontSearch, filteredFonts)}
                      {renderFontStyleSelector(authorStyle, handleAuthorStyleChange)}
                    </>
                  )}

                  {section.id === 'author-image' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image de l'auteur
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {authorImage ? (
                              <img src={authorImage} alt="Author" style={getImageStyle()} className="object-cover" />
                            ) : (
                              <FiUser className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <label className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
                            Choisir une image
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Taille
                          </label>
                          <input
                            type="range"
                            min="32"
                            max="128"
                            value={parseInt(imageStyle.size)}
                            onChange={(e) => handleImageStyleChange('size', `${e.target.value}px`)}
                            className="w-full"
                          />
                          <div className="text-sm text-gray-500 text-right">
                            {parseInt(imageStyle.size)}px
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Forme
                          </label>
                          <select
                            value={imageStyle.shape}
                            onChange={(e) => handleImageStyleChange('shape', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            {imageShapes.map((shape) => (
                              <option key={shape.value} value={shape.value}>
                                {shape.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Filtre
                        </label>
                        <select
                          value={imageStyle.filter}
                          onChange={(e) => handleImageStyleChange('filter', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {imageFilters.map((filter) => (
                            <option key={filter.value} value={filter.value}>
                              {filter.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Opacité
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={imageStyle.opacity * 100}
                          onChange={(e) => handleImageStyleChange('opacity', e.target.value / 100)}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-right">
                          {Math.round(imageStyle.opacity * 100)}%
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rotation
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={imageStyle.rotation}
                          onChange={(e) => handleImageStyleChange('rotation', parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-right">
                          {imageStyle.rotation}°
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Luminosité
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={imageStyle.brightness}
                          onChange={(e) => handleImageStyleChange('brightness', parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-right">
                          {imageStyle.brightness}%
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contraste
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={imageStyle.contrast}
                          onChange={(e) => handleImageStyleChange('contrast', parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-right">
                          {imageStyle.contrast}%
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Saturation
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="200"
                          value={imageStyle.saturation}
                          onChange={(e) => handleImageStyleChange('saturation', parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500 text-right">
                          {imageStyle.saturation}%
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    );
  };

  const renderDesignOptions = () => {
    return (
      <div className="space-y-4">
        {/* Border Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium text-gray-700">Bordure</span>
            <button
              onClick={() => setCardStyle({ ...cardStyle, showBorder: !cardStyle.showBorder })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                cardStyle.showBorder ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  cardStyle.showBorder ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {cardStyle.showBorder && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Couleur de la bordure
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {solidColors.map(({ id, color, name }) => (
                    <button
                      key={id}
                      onClick={() => setCardStyle({ ...cardStyle, borderColor: color })}
                      className={`group relative flex flex-col items-center p-2 rounded-lg transition-all hover:bg-gray-50 ${
                        cardStyle.borderColor === color ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div 
                        className={`w-8 h-8 rounded-full border-2 transition-transform group-hover:scale-110 ${
                          cardStyle.borderColor === color ? 'border-indigo-500 scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                      <span className="mt-1 text-xs text-gray-600">{name}</span>
                    </button>
                  ))}
                </div>
                <div className="relative mt-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full" />
                  </div>
                  <input
                    type="color"
                    value={cardStyle.borderColor}
                    onChange={(e) => setCardStyle({ ...cardStyle, borderColor: e.target.value })}
                    className="w-full h-8 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">
                    Épaisseur de la bordure
                  </label>
                  <span className="text-sm font-medium text-indigo-600">
                    {cardStyle.borderWidth}px
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((width) => (
                    <button
                      key={width}
                      onClick={() => setCardStyle({ ...cardStyle, borderWidth: width })}
                      className={`flex-1 h-8 rounded-md transition-all ${
                        cardStyle.borderWidth === width 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      {width}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBackgroundOptions = () => {
    return (
      <div className="space-y-4">
        {/* Background Type Selection */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'backgroundType' ? null : 'backgroundType')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FiImage className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-gray-700">Type de fond</span>
            </div>
            <FiChevronDown
              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                expandedSection === 'backgroundType' ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSection === 'backgroundType' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4 border-t">
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setCardStyle({ ...cardStyle, gradient: 'none', backgroundImage: null })}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                        cardStyle.gradient === 'none' && !cardStyle.backgroundImage
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <FiDroplet className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Couleur</span>
                    </button>
                    <button
                      onClick={() => setCardStyle({ ...cardStyle, gradient: 'linear', backgroundImage: null })}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                        cardStyle.gradient === 'linear'
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <FiDroplet className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Dégradé</span>
                    </button>
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCardStyle({
                                ...cardStyle,
                                gradient: 'none',
                                backgroundImage: reader.result
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                        cardStyle.backgroundImage
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <FiImage className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">Image</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Solid Color Section */}
        {cardStyle.gradient === 'none' && !cardStyle.backgroundImage && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'solidColor' ? null : 'solidColor')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FiDroplet className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-700">Couleur</span>
              </div>
              <FiChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  expandedSection === 'solidColor' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSection === 'solidColor' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4 border-t">
                    <div className="grid grid-cols-4 gap-3">
                      {solidColors.map(({ id, color, name }) => (
                        <button
                          key={id}
                          onClick={() => setCardStyle({ ...cardStyle, backgroundColor: color })}
                          className={`group relative flex flex-col items-center p-2 rounded-lg transition-all hover:bg-gray-50 ${
                            cardStyle.backgroundColor === color ? 'bg-indigo-50' : ''
                          }`}
                        >
                          <div 
                            className={`w-8 h-8 rounded-full border-2 transition-transform group-hover:scale-110 ${
                              cardStyle.backgroundColor === color ? 'border-indigo-500 scale-110' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                          <span className="mt-1 text-xs text-gray-600">{name}</span>
                        </button>
                      ))}
                    </div>
                    <div className="relative mt-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full" />
                      </div>
                      <input
                        type="color"
                        value={cardStyle.backgroundColor}
                        onChange={(e) => setCardStyle({ ...cardStyle, backgroundColor: e.target.value })}
                        className="w-full h-8 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Gradient Section */}
        {cardStyle.gradient === 'linear' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'gradient' ? null : 'gradient')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FiDroplet className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-700">Dégradé</span>
              </div>
              <FiChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  expandedSection === 'gradient' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSection === 'gradient' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4 border-t">
                    <div className="grid grid-cols-4 gap-3">
                      {gradients.map((gradient) => (
                        <button
                          key={gradient.id}
                          onClick={() => {
                            if (gradient.id === 'custom') {
                              setCardStyle({
                                ...cardStyle,
                                gradient: 'linear',
                                gradientColors: gradient.colors,
                                gradientAngle: gradient.angle
                              });
                            } else {
                              setCardStyle({
                                ...cardStyle,
                                gradient: 'linear',
                                gradientColors: gradient.colors,
                                gradientAngle: gradient.angle
                              });
                            }
                          }}
                          className={`relative aspect-square rounded-full overflow-hidden group ${
                            cardStyle.gradient === 'linear' &&
                            cardStyle.gradientColors[0] === gradient.colors[0] &&
                            cardStyle.gradientColors[1] === gradient.colors[1]
                              ? 'ring-2 ring-indigo-500 scale-105'
                              : 'hover:scale-105'
                          }`}
                          style={{
                            background: `linear-gradient(${gradient.angle}deg, ${gradient.colors.join(', ')})`
                          }}
                        >
                          {gradient.id === 'custom' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
                              <input
                                type="color"
                                value={cardStyle.gradientColors[0]}
                                onChange={(e) => {
                                  const newColors = [...cardStyle.gradientColors];
                                  newColors[0] = e.target.value;
                                  setCardStyle({
                                    ...cardStyle,
                                    gradientColors: newColors
                                  });
                                }}
                                className="w-8 h-8 rounded-full cursor-pointer"
                              />
                              <input
                                type="color"
                                value={cardStyle.gradientColors[1]}
                                onChange={(e) => {
                                  const newColors = [...cardStyle.gradientColors];
                                  newColors[1] = e.target.value;
                                  setCardStyle({
                                    ...cardStyle,
                                    gradientColors: newColors
                                  });
                                }}
                                className="w-8 h-8 rounded-full cursor-pointer ml-2"
                              />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Angle du dégradé
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                          <div className="h-1 w-full bg-gray-200 rounded-full">
                            <div 
                              className="h-1 bg-indigo-600 rounded-full transition-all"
                              style={{ width: `${(cardStyle.gradientAngle / 360) * 100}%` }}
                            />
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={cardStyle.gradientAngle}
                          onChange={(e) =>
                            setCardStyle({
                              ...cardStyle,
                              gradientAngle: parseInt(e.target.value)
                            })
                          }
                          className="w-full h-8 opacity-0 cursor-pointer absolute inset-0"
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0°</span>
                        <span>{cardStyle.gradientAngle}°</span>
                        <span>360°</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Image Background Section */}
        {cardStyle.backgroundImage && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'imageSettings' ? null : 'imageSettings')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FiImage className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-gray-700">Paramètres de l'image</span>
              </div>
              <FiChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  expandedSection === 'imageSettings' ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedSection === 'imageSettings' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 space-y-4 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Taille
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {backgroundSizes.map(({ id, name, icon }) => (
                          <button
                            key={id}
                            onClick={() => setCardStyle({ ...cardStyle, backgroundSize: id })}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                              cardStyle.backgroundSize === id
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <span className="text-xl mb-1">{icon}</span>
                            <span className="text-xs">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <div className="grid grid-cols-5 gap-3">
                        {backgroundPositions.map(({ id, name, icon }) => (
                          <button
                            key={id}
                            onClick={() => setCardStyle({ ...cardStyle, backgroundPosition: id })}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                              cardStyle.backgroundPosition === id
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <span className="text-xl mb-1">{icon}</span>
                            <span className="text-xs">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  };

  const renderEffectOptions = () => {
    return (
      <div className="space-y-4">
        {/* Blur Effect */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'blur' ? null : 'blur')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FiLayers className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-gray-700">Flou</span>
            </div>
            <FiChevronDown
              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                expandedSection === 'blur' ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSection === 'blur' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4 border-t">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <div className="h-1 w-full bg-gray-200 rounded-full">
                        <div 
                          className="h-1 bg-indigo-600 rounded-full transition-all"
                          style={{ width: `${(cardStyle.blur / 8) * 100}%` }}
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      step="0.5"
                      value={cardStyle.blur}
                      onChange={(e) =>
                        setCardStyle({
                          ...cardStyle,
                          blur: parseFloat(e.target.value)
                        })
                      }
                      className="w-full h-8 opacity-0 cursor-pointer absolute inset-0"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0px</span>
                    <span>{cardStyle.blur}px</span>
                    <span>8px</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brightness Effect */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'brightness' ? null : 'brightness')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FiSun className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-gray-700">Luminosité</span>
            </div>
            <FiChevronDown
              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                expandedSection === 'brightness' ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSection === 'brightness' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4 border-t">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <div className="h-1 w-full bg-gray-200 rounded-full">
                        <div 
                          className="h-1 bg-indigo-600 rounded-full transition-all"
                          style={{ width: `${(cardStyle.brightness / 200) * 100}%` }}
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={cardStyle.brightness}
                      onChange={(e) =>
                        setCardStyle({
                          ...cardStyle,
                          brightness: parseInt(e.target.value)
                        })
                      }
                      className="w-full h-8 opacity-0 cursor-pointer absolute inset-0"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{cardStyle.brightness}%</span>
                    <span>200%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contrast Effect */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'contrast' ? null : 'contrast')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FiSliders className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-gray-700">Contraste</span>
            </div>
            <FiChevronDown
              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                expandedSection === 'contrast' ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSection === 'contrast' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4 border-t">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <div className="h-1 w-full bg-gray-200 rounded-full">
                        <div 
                          className="h-1 bg-indigo-600 rounded-full transition-all"
                          style={{ width: `${(cardStyle.contrast / 200) * 100}%` }}
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={cardStyle.contrast}
                      onChange={(e) =>
                        setCardStyle({
                          ...cardStyle,
                          contrast: parseInt(e.target.value)
                        })
                      }
                      className="w-full h-8 opacity-0 cursor-pointer absolute inset-0"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{cardStyle.contrast}%</span>
                    <span>200%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Saturation Effect */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === 'saturation' ? null : 'saturation')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <FiDroplet className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-gray-700">Saturation</span>
            </div>
            <FiChevronDown
              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                expandedSection === 'saturation' ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {expandedSection === 'saturation' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4 border-t">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                      <div className="h-1 w-full bg-gray-200 rounded-full">
                        <div 
                          className="h-1 bg-indigo-600 rounded-full transition-all"
                          style={{ width: `${(cardStyle.saturation / 200) * 100}%` }}
                        />
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={cardStyle.saturation}
                      onChange={(e) =>
                        setCardStyle({
                          ...cardStyle,
                          saturation: parseInt(e.target.value)
                        })
                      }
                      className="w-full h-8 opacity-0 cursor-pointer absolute inset-0"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0%</span>
                    <span>{cardStyle.saturation}%</span>
                    <span>200%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen flex-row-reverse">
        {/* Main Content Area - Quote Display */}
        <div className="flex-1 p-8 overflow-auto bg-gray-50 relative">
          {/* Top right actions */}
          <div className="absolute top-8 right-8 flex gap-2 z-10">
            {/* Format Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFormatMenu((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 focus:outline-none min-w-[120px]"
                title="Changer le format"
              >
                <FiLayout className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-indigo-700 text-sm">
                  {formats.find(f => f.value === selectedFormat)?.label}
                </span>
                <FiChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {showFormatMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-fade-in">
                  <ul className="py-2">
                    {formats.map((format) => (
                      <li
                        key={format.value}
                        onClick={() => {
                          setSelectedFormat(format.value);
                          setShowFormatMenu(false);
                        }}
                        className={`px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-indigo-50 text-gray-700 transition-all ${selectedFormat === format.value ? 'bg-indigo-100 font-semibold text-indigo-700' : ''}`}
                      >
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${selectedFormat === format.value ? 'bg-indigo-500' : 'bg-gray-300'}`}></span>
                        {format.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Help Button */}
            <button
              onClick={() => setShowHelp(true)}
              className="p-2 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 focus:outline-none"
              title="Aide"
            >
              <FiHelpCircle className="w-6 h-6 text-indigo-600" />
            </button>
          </div>

          {/* Quote Display */}
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] h-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <motion.div
                id="quote-card"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`relative max-w-xl w-full flex flex-col items-center justify-center p-0 overflow-visible rounded-3xl ${formats.find(f => f.value === selectedFormat)?.width} ${formats.find(f => f.value === selectedFormat)?.height} ${formats.find(f => f.value === selectedFormat)?.rounded || ''}`}
                style={getCardStyle()}
              >
                {/* Fond glassmorphism (optionnel selon background choisi) */}
                {cardStyle.gradient === 'none' && !cardStyle.backgroundImage && (
                  <div className="absolute inset-0 rounded-3xl bg-white/30 backdrop-blur-xl border-2 border-indigo-400/40 pointer-events-none" />
                )}
                {/* Guillemets stylisés */}
                <div className="absolute left-4 top-2 text-[5rem] text-indigo-200/30 font-serif select-none pointer-events-none leading-none z-0">"</div>
                <div className="absolute right-4 bottom-2 text-[5rem] text-indigo-200/30 font-serif select-none pointer-events-none leading-none z-0">"</div>
                {/* Citation */}
                <div className="relative z-10 px-6 py-8 w-full flex items-center justify-center">
                  <span
                    className="quote-text text-center max-w-full break-words"
                    style={{
                      ...getQuoteStyle(),
                      textShadow: '0 2px 8px #6366f1cc',
                      wordBreak: 'break-word',
                      color: quoteStyle.textColor,
                      fontFamily: quoteStyle.fontFamily,
                      fontSize: quoteStyle.fontSize,
                      fontWeight: quoteStyle.fontWeight,
                      fontStyle: quoteStyle.fontStyle,
                      textAlign: quoteStyle.textAlign,
                      lineHeight: quoteStyle.lineHeight,
                      letterSpacing: quoteStyle.letterSpacing,
                      background: 'none',
                    }}
                  >
                    {quoteText}
                  </span>
                </div>
                {/* Auteur avec image à gauche */}
                <div className="relative z-10 flex items-center justify-center gap-3 mb-6 mt-2">
                  {authorImage && (
                    <div className="w-12 h-12 rounded-full border-2 border-indigo-200 shadow flex items-center justify-center overflow-hidden" style={getImageStyle()}>
                      <img 
                        src={authorImage} 
                        alt={authorName} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '9999px', boxShadow: 'none' }}
                      />
                    </div>
                  )}
                  <span
                    className="inline-block px-5 py-2 rounded-full font-bold text-base shadow border-2 border-white/30 backdrop-blur-md"
                    style={{
                      background: authorStyle.textColor || '#6366f1',
                      color: '#fff',
                      fontFamily: authorStyle.fontFamily,
                      fontSize: authorStyle.fontSize,
                      fontWeight: authorStyle.fontWeight,
                      fontStyle: authorStyle.fontStyle,
                      textAlign: authorStyle.textAlign,
                    }}
                  >
                    {authorName}
                  </span>
                </div>
              </motion.div>
              {/* Download Button */}
              <div className="flex justify-center w-full mt-8">
                <button
                  onClick={handleDownload}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-blue-400 text-white rounded-xl shadow-lg hover:from-indigo-600 hover:to-blue-500 flex items-center space-x-3 transition-all duration-200 font-medium border-2 border-white/20 backdrop-blur-md"
                >
                  <FiDownload className="w-5 h-5" />
                  <span>Télécharger la citation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QuoteRing Panel */}
        <div className="w-[480px] bg-indigo-600 shadow-lg flex flex-col">
          {/* Top Actions */}
          <div className="h-24 border-b border-indigo-500 flex items-center justify-between px-6">
            <div className="flex items-center h-full gap-4">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="#6366F1" />
                <path d="M32 16a12 12 0 0 1 12 12c0 4.5-2.5 8.5-6.2 10.5-.5.3-.8.8-.8 1.4v2.1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2.1c0-.6-.3-1.1-.8-1.4A12.01 12.01 0 0 1 20 28a12 12 0 0 1 12-12z" fill="#FDE68A"/>
                <rect x="28" y="44" width="8" height="6" rx="2" fill="#F59E42"/>
                <rect x="26" y="50" width="12" height="4" rx="2" fill="#A5B4FC"/>
                <circle cx="32" cy="24" r="2" fill="#F59E42"/>
              </svg>
              {/* Texte 'I Love Quotes' avec coeur rouge */}
              <span className="text-white text-xl font-bold flex items-center gap-2 select-none">
                I Love Quotes
                <span className="text-red-500 text-2xl">❤️</span>
              </span>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Menu Items */}
            <div className="w-20 border-r border-indigo-500 py-4">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 mx-auto mb-4 rounded-xl flex flex-col items-center justify-center p-[5px] ${
                    selectedMenu === item.id
                      ? 'bg-indigo-500 text-white'
                      : 'text-indigo-200 hover:bg-indigo-500 hover:text-white'
                  }`}
                  onClick={() => setSelectedMenu(item.id)}
                >
                  <item.icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Options Panel */}
            <div className="flex-1 p-4 overflow-y-auto bg-indigo-50">
              {selectedMenu === 'content' ? (
                renderContentOptions()
              ) : selectedMenu === 'design' ? (
                renderDesignOptions()
              ) : selectedMenu === 'background' ? (
                renderBackgroundOptions()
              ) : selectedMenu === 'effect' ? (
                renderEffectOptions()
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4 capitalize text-indigo-900">{selectedMenu} Options</h2>
                  {/* Other menu options will be rendered here */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Help Popup */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Aide</h2>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-6">
                  {helpContent.map((section, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                      <h3 className="text-lg font-medium text-indigo-600 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-600">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App; 