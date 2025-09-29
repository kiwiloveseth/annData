import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.marketplace': 'Marketplace',
    'nav.traceability': 'Traceability',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Landing Page
    'landing.hero.title': 'Fair, Transparent, Traceable',
    'landing.hero.subtitle': 'AnnData bridges farmers and markets through blockchain technology, ensuring fair prices and complete transparency in agricultural trading.',
    'landing.cta.marketplace': 'Enter Marketplace',
    'landing.cta.dashboard': 'View Dashboard',
    
    // Auth
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.role': 'Select Role',
    'auth.farmer': 'Farmer',
    'auth.dealer': 'Dealer',
    'auth.admin': 'Admin',
    'auth.wallet.connect': 'Connect MetaMask',
    'auth.wallet.connected': 'Wallet Connected',
    'auth.demo.farmer': 'Demo Farmer Login',
    'auth.demo.dealer': 'Demo Dealer Login',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.earnings': 'Total Earnings',
    'dashboard.listings': 'Active Listings',
    'dashboard.rating': 'Rating',
    'dashboard.sales': 'Completed Sales',
    'dashboard.add.listing': 'Add New Listing',
    
    // Marketplace
    'marketplace.title': 'Agricultural Marketplace',
    'marketplace.subtitle': 'Discover fresh, quality crops directly from farmers across India',
    'marketplace.search': 'Search crops, farmers, locations...',
    'marketplace.buy': 'Buy Now',
    'marketplace.contact': 'Contact',
    
    // Listings
    'listing.crop': 'Crop Name',
    'listing.grade': 'Grade',
    'listing.quantity': 'Quantity',
    'listing.price': 'Price per kg',
    'listing.image': 'Crop Image URL',
    'listing.add': 'Add Listing',
    'listing.delist': 'Delist',
    
    // Chatbot
    'chatbot.title': 'AnnData Assistant',
    'chatbot.placeholder': 'Ask me anything about farming or trading...',
    'chatbot.send': 'Send',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.close': 'Close',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.marketplace': 'बाज़ार',
    'nav.traceability': 'ट्रेसेबिलिटी',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.login': 'लॉगिन',
    'nav.logout': 'लॉगआउट',
    
    // Landing Page
    'landing.hero.title': 'निष्पक्ष, पारदर्शी, ट्रेसेबल',
    'landing.hero.subtitle': 'कृषिसेतु ब्लॉकचेन तकनीक के माध्यम से किसानों और बाजारों को जोड़ता है, निष्पक्ष मूल्य और कृषि व्यापार में पूर्ण पारदर्शिता सुनिश्चित करता है।',
    'landing.cta.marketplace': 'बाज़ार में प्रवेश करें',
    'landing.cta.dashboard': 'डैशबोर्ड देखें',
    
    // Auth
    'auth.signin': 'साइन इन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'auth.role': 'भूमिका चुनें',
    'auth.farmer': 'किसान',
    'auth.dealer': 'व्यापारी',
    'auth.admin': 'एडमिन',
    'auth.wallet.connect': 'मेटामास्क कनेक्ट करें',
    'auth.wallet.connected': 'वॉलेट कनेक्ट हो गया',
    'auth.demo.farmer': 'डेमो किसान लॉगिन',
    'auth.demo.dealer': 'डेमो व्यापारी लॉगिन',
    
    // Dashboard
    'dashboard.welcome': 'वापसी पर स्वागत है',
    'dashboard.earnings': 'कुल आय',
    'dashboard.listings': 'सक्रिय लिस्टिंग',
    'dashboard.rating': 'रेटिंग',
    'dashboard.sales': 'पूर्ण बिक्री',
    'dashboard.add.listing': 'नई लिस्टिंग जोड़ें',
    
    // Marketplace
    'marketplace.title': 'कृषि बाज़ार',
    'marketplace.subtitle': 'भारत भर के किसानों से सीधे ताज़ी, गुणवत्तापूर्ण फसलों की खोज करें',
    'marketplace.search': 'फसल, किसान, स्थान खोजें...',
    'marketplace.buy': 'अभी खरीदें',
    'marketplace.contact': 'संपर्क करें',
    
    // Listings
    'listing.crop': 'फसल का नाम',
    'listing.grade': 'ग्रेड',
    'listing.quantity': 'मात्रा',
    'listing.price': 'प्रति किलो मूल्य',
    'listing.image': 'फसल छवि URL',
    'listing.add': 'लिस्टिंग जोड़ें',
    'listing.delist': 'लिस्टिंग हटाएं',
    
    // Chatbot
    'chatbot.title': 'कृषिसेतु सहायक',
    'chatbot.placeholder': 'खेती या व्यापार के बारे में कुछ भी पूछें...',
    'chatbot.send': 'भेजें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि हुई',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें',
    'common.close': 'बंद करें',
  },
  ta: {
    // Navigation
    'nav.home': 'முகப்பு',
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.marketplace': 'சந்தை',
    'nav.traceability': 'கண்காணிப்பு',
    'nav.profile': 'சுயவிவரம்',
    'nav.login': 'உள்நுழைவு',
    'nav.logout': 'வெளியேறு',
    
    // Landing Page
    'landing.hero.title': 'நியாயமான, வெளிப்படையான, கண்காணிக்கக்கூடிய',
    'landing.hero.subtitle': 'கிருஷிசேது பிளாக்செயின் தொழில்நுட்பத்தின் மூலம் விவசாயிகளையும் சந்தைகளையும் இணைக்கிறது, நியாயமான விலைகள் மற்றும் விவசாய வர்த்தகத்தில் முழு வெளிப்படைத்தன்மையை உறுதி செய்கிறது.',
    'landing.cta.marketplace': 'சந்தையில் நுழையுங்கள்',
    'landing.cta.dashboard': 'டாஷ்போர்டைப் பார்க்கவும்',
    
    // Auth
    'auth.signin': 'உள்நுழைக',
    'auth.signup': 'பதிவு செய்க',
    'auth.email': 'மின்னஞ்சல்',
    'auth.password': 'கடவுச்சொல்',
    'auth.name': 'முழு பெயர்',
    'auth.role': 'பங்கு தேர்ந்தெடுக்கவும்',
    'auth.farmer': 'விவசாயி',
    'auth.dealer': 'வியாபாரி',
    'auth.admin': 'நிர்வாகி',
    'auth.wallet.connect': 'மெட்டாமாஸ்க் இணைக்கவும்',
    'auth.wallet.connected': 'வாலெட் இணைக்கப்பட்டது',
    'auth.demo.farmer': 'டெமோ விவசாயி உள்நுழைவு',
    'auth.demo.dealer': 'டெமோ வியாபாரி உள்நுழைவு',
    
    // Dashboard
    'dashboard.welcome': 'மீண்டும் வரவேற்கிறோம்',
    'dashboard.earnings': 'மொத்த வருமானம்',
    'dashboard.listings': 'செயலில் உள்ள பட்டியல்கள்',
    'dashboard.rating': 'மதிப்பீடு',
    'dashboard.sales': 'முடிக்கப்பட்ட விற்பனை',
    'dashboard.add.listing': 'புதிய பட்டியல் சேர்க்கவும்',
    
    // Marketplace
    'marketplace.title': 'விவசாய சந்தை',
    'marketplace.subtitle': 'இந்தியா முழுவதும் உள்ள விவசாயிகளிடமிருந்து நேரடியாக புதிய, தரமான பயிர்களைக் கண்டறியுங்கள்',
    'marketplace.search': 'பயிர்கள், விவசாயிகள், இடங்களைத் தேடுங்கள்...',
    'marketplace.buy': 'இப்போது வாங்கவும்',
    'marketplace.contact': 'தொடர்பு கொள்ளவும்',
    
    // Listings
    'listing.crop': 'பயிர் பெயர்',
    'listing.grade': 'தரம்',
    'listing.quantity': 'அளவு',
    'listing.price': 'கிலோ விலை',
    'listing.image': 'பயிர் படம் URL',
    'listing.add': 'பட்டியல் சேர்க்கவும்',
    'listing.delist': 'பட்டியலை அகற்று',
    
    // Chatbot
    'chatbot.title': 'கிருஷிசேது உதவியாளர்',
    'chatbot.placeholder': 'விவசாயம் அல்லது வர்த்தகம் பற்றி எதையும் கேளுங்கள்...',
    'chatbot.send': 'அனுப்பு',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை ஏற்பட்டது',
    'common.success': 'வெற்றி',
    'common.cancel': 'ரத்து செய்',
    'common.save': 'சேமி',
    'common.close': 'மூடு',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('AnnData_language') as Language;
    if (savedLanguage && ['en', 'hi', 'ta'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('AnnData_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};