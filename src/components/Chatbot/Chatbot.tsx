import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import Button from '../Button';
import Card from '../Card';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

const Chatbot: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage(currentLanguage),
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hardcoded Gemini API configuration
  const GEMINI_API_KEY = 'AIzaSyB7DYDi2yVZ8NZDDvnQDlhnoDsvwBrRI10'; // Replace with your actual API key
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  function getWelcomeMessage(language: string): string {
    // This will be replaced by AI-generated welcome message
    const welcomeMessages = {
      en: "🌱 Hello! I'm AnnData AI Assistant. I can help you with blockchain farming, crop tracking, marketplace, MSP rates, and more! How can I assist you today?",
      hi: "🌱 नमस्ते! मैं एनडेटा AI सहायक हूं। मैं आपको ब्लॉकचेन खेती, फसल ट्रैकिंग, बाज़ार, MSP दरों और अधिक के साथ मदद कर सकता हूं! आज मैं आपकी कैसे सहायता कर सकता हूं?",
      ta: "🌱 வணக்கம்! நான் AnnData AI உதவியாளர். பிளாக்செயின் விவசாயம், பயிர் கண்காணிப்பு, சந்தை, MSP விலைகள் மற்றும் பலவற்றில் நான் உங்களுக்கு உதவ முடியும்! இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?",
      pa: "🌱 ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ AnnData AI ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਨੂੰ ਬਲਾਕਚੇਨ ਖੇਤੀ, ਫਸਲ ਟਰੈਕਿੰਗ, ਬਾਜ਼ਾਰ, MSP ਰੇਟਾਂ ਅਤੇ ਹੋਰ ਬਹੁਤ ਕੁਝ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ! ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?",
      bn: "🌱 নমস্কার! আমি AnnData AI সহায়ক। আমি আপনাকে ব্লকচেইন কৃষি, ফসল ট্র্যাকিং, বাজার, MSP হার এবং আরও অনেক কিছুতে সাহায্য করতে পারি! আজ আমি কীভাবে আপনাকে সহায়তা করতে পারি?"
    };
    return welcomeMessages[language] || welcomeMessages.en;
  }

  const getQuickSuggestions = (language: string): string[] => {
    const suggestions = {
      en: ["What is MSP?", "How blockchain works?", "Crop quality tracking"],
      hi: ["MSP क्या है?", "ब्लॉकचेन कैसे काम करता है?", "फसल की गुणवत्ता"],
      ta: ["MSP என்றால் என்ன?", "பிளாக்செயின் எப்படி வேலை செய்கிறது?", "பயிர் தரம்"],
      pa: ["MSP ਕੀ ਹੈ?", "ਬਲਾਕਚੇਨ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ?", "ਫਸਲ ਦੀ ਗੁਣਵੱਤਾ"],
      bn: ["MSP কি?", "ব্লকচেইন কিভাবে কাজ করে?", "ফসলের গুণমান"]
    };
    return suggestions[language] || suggestions.en;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLanguageName = (lang: string): string => {
    const languages = {
      'en': 'English',
      'hi': 'Hindi (हिंदी)',
      'ta': 'Tamil (தமிழ்)',
      'pa': 'Punjabi (ਪੰਜਾਬੀ)',
      'bn': 'Bengali (বাংলা)'
    };
    return languages[lang] || 'English';
  };

  const getSystemPrompt = (language: string) => {
    return `You are AnnData AI Assistant, a helpful and knowledgeable AI assistant for a revolutionary blockchain-powered agricultural platform called AnnData.

    IMPORTANT: Always respond in ${getLanguageName(language)} language only. Do not mix languages in your response.

    ABOUT ANNDATA PLATFORM:
    AnnData is a cutting-edge blockchain platform built on Polygon that revolutionizes agriculture through:

    🔗 BLOCKCHAIN TRANSPARENCY:
    - Complete supply chain transparency from farm to consumer
    - Immutable tracking of crop origin, pricing, and quality
    - Every transaction recorded permanently on Polygon blockchain
    - Smart contracts for automated processes

    🌾 CORE FEATURES:
    - Smart Contracts: Automated quality checks, pricing, and payments
    - QR Code Integration: Consumers can trace complete product journey and verify authenticity
    - Digital Marketplace: Direct farmer-to-consumer and farmer-to-distributor sales
    - Transparent Bidding System: Competitive and fair pricing for all crops
    - Verified Users: Only authorized farmers, distributors, and retailers
    - MSP Support: Guaranteed Minimum Support Price for farmers
    - Multi-language Support: Local language support for farmers
    - Polygon Blockchain: Secure, low-cost, and highly scalable solution

    💰 BENEFITS:
    - Eliminates middlemen exploitation
    - Ensures fair pricing for farmers
    - Provides complete supply chain visibility
    - Guarantees authenticity and quality
    - Reduces fraud and corruption
    - Empowers farmers with direct market access

    YOUR ROLE:
    - Be extremely helpful, friendly, and enthusiastic about AnnData
    - Explain complex blockchain concepts in simple, farmer-friendly language
    - Focus on practical benefits and real-world applications
    - Always emphasize transparency, fairness, and farmer empowerment
    - Provide detailed, informative responses about agriculture and technology
    - Use relevant emojis to make conversations engaging
    - Keep responses conversational but comprehensive (2-4 sentences)
    - Help with queries about farming, blockchain, marketplace, pricing, quality standards

    Remember: You represent AnnData's mission to empower farmers through blockchain technology!`;
  };

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      const systemPrompt = getSystemPrompt(currentLanguage);
      const prompt = `${systemPrompt}

User Question: ${userMessage}

AnnData AI Assistant Response:`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
            stopSequences: []
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Return a language-appropriate error message
      const errorMessages = {
        en: "🔧 I'm having trouble connecting to my AI brain right now. Please check your internet connection and try again!",
        hi: "🔧 मुझे अभी अपने AI दिमाग से जुड़ने में परेशानी हो रही है। कृपया अपना इंटरनेट कनेक्शन जांचें और फिर से कोशिश करें!",
        ta: "🔧 எனது AI மூளையுடன் இணைக்க சிக்கல் உள்ளது। உங்கள் இணைய இணைப்பை சரிபார்த்து மீண்டும் முயற்சிக்கவும்!",
        pa: "🔧 ਮੈਨੂੰ ਆਪਣੇ AI ਦਿਮਾਗ ਨਾਲ ਜੁੜਨ ਵਿੱਚ ਸਮੱਸਿਆ ਹੋ ਰਹੀ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਇੰਟਰਨੈੱਟ ਕੁਨੈਕਸ਼ਨ ਜਾਂਚੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ!",
        bn: "🔧 আমার AI মস্তিষ্কের সাথে সংযোগে সমস্যা হচ্ছে। অনুগ্রহ করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন!"
      };
      return errorMessages[currentLanguage] || errorMessages.en;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "🤔 Thinking...",
      isBot: true,
      timestamp: new Date(),
      isLoading: true
    };

    setMessages(prev => [...prev, loadingMessage]);

    try {
      const botResponse = await callGeminiAPI(inputText);

      // Remove loading message and add actual response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        const botMessage: Message = {
          id: (Date.now() + 2).toString(),
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        };
        return [...filtered, botMessage];
      });
    } catch (error) {
      console.error('Error handling message:', error);
      // Remove loading message and show error
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return filtered;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get dynamic dimensions based on expansion state
  const chatDimensions = isExpanded 
    ? 'w-[28rem] h-[36rem]' 
    : 'w-96 h-[32rem]';

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center overflow-hidden"
          style={{
            background: isOpen 
              ? 'linear-gradient(135deg, #2E7D32 0%, #FF9933 100%)' 
              : 'linear-gradient(135deg, #2E7D32 0%, #0D47A1 100%)',
            boxShadow: '0 8px 32px rgba(46, 125, 50, 0.3), 0 0 20px rgba(57, 255, 20, 0.2)'
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{
                 background: 'radial-gradient(circle, rgba(57, 255, 20, 0.3) 0%, transparent 70%)',
                 filter: 'blur(8px)'
               }}>
          </div>

          {/* Icon */}
          <div className="relative z-10 text-white transform group-hover:rotate-12 transition-transform duration-300">
            {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
          </div>

          {/* Pulse animation */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full border-2 border-neon-lime opacity-75 animate-ping"
                 style={{ borderColor: '#39FF14' }}>
            </div>
          )}

          {/* Sparkle effect */}
          <Sparkles className="absolute top-1 right-1 h-4 w-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 ${chatDimensions} z-50 transform translate-y-0 opacity-100 transition-all duration-300 ease-out animate-slide-in`}>
          <Card className="h-full flex flex-col overflow-hidden backdrop-blur-sm border border-neutral-grey/20"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(176,190,197,0.1) 100%)',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 30px rgba(57, 255, 20, 0.1)'
                }}>

            {/* Header */}
            <div className="relative p-6 border-b border-neutral-grey/20 overflow-hidden"
                 style={{ 
                   background: 'linear-gradient(135deg, #2E7D32 0%, #0D47A1 100%)'
                 }}>

              {/* Header background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-20 h-20 rounded-full"
                     style={{ background: 'radial-gradient(circle, #39FF14 0%, transparent 70%)' }}>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full"
                     style={{ background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)' }}>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-lg text-white">
                      AnnData AI
                    </h3>
                    <p className="text-white/80 text-sm font-inter">
                      Blockchain Agriculture Assistant
                    </p>
                  </div>
                </div>

                {/* Expand/Minimize Controls */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-neon-lime rounded-full animate-pulse"
                       style={{ backgroundColor: '#39FF14' }}>
                  </div>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group"
                    title={isExpanded ? "Minimize" : "Expand"}
                  >
                    {isExpanded ? (
                      <Minimize2 className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                    ) : (
                      <Maximize2 className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-neutral-grey/30">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.isBot ? 'justify-start' : 'justify-end'} 
                             transform transition-all duration-300 ease-out`}
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                  }}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ background: 'linear-gradient(135deg, #2E7D32 0%, #0D47A1 100%)' }}>
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl text-sm font-inter leading-relaxed transform hover:scale-105 transition-all duration-200 ${
                      message.isBot
                        ? 'bg-white shadow-md border border-neutral-grey/10 text-charcoal-black'
                        : 'text-white shadow-lg'
                    } ${message.isLoading ? 'animate-pulse' : ''}`}
                    style={!message.isBot ? {
                      background: 'linear-gradient(135deg, #2E7D32 0%, #FF9933 100%)',
                      boxShadow: '0 8px 25px rgba(46, 125, 50, 0.3)'
                    } : {}}
                  >
                    {message.isLoading ? (
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-neutral-grey rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-neutral-grey rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-neutral-grey rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-neutral-grey ml-2">AI is thinking...</span>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{message.text}</div>
                    )}
                  </div>

                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                         style={{ background: 'linear-gradient(135deg, #FF9933 0%, #2E7D32 100%)' }}>
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neutral-grey/20 bg-white/50 backdrop-blur-sm">
              <div className="flex gap-3 items-end">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder={currentLanguage === 'hi' ? 'अपना संदेश टाइप करें...' : 
                              currentLanguage === 'ta' ? 'உங்கள் செய்தியை தட்டச்சு செய்யுங்கள்...' :
                              currentLanguage === 'pa' ? 'ਆਪਣਾ ਸੰਦੇਸ਼ ਟਾਈਪ ਕਰੋ...' :
                              currentLanguage === 'bn' ? 'আপনার বার্তা টাইপ করুন...' :
                              'Ask me about AnnData, farming, blockchain...'}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border-2 border-transparent rounded-xl focus:outline-none focus:ring-0 text-sm font-inter
                           bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md
                           focus:shadow-lg resize-none"
                  style={{
                    borderColor: 'transparent',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#39FF14';
                    e.target.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.3), 0 4px 15px rgba(0,0,0,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:rotate-0"
                  style={{
                    background: inputText.trim() && !isLoading 
                      ? 'linear-gradient(135deg, #2E7D32 0%, #FF9933 100%)' 
                      : 'linear-gradient(135deg, #B0BEC5 0%, #9E9E9E 100%)',
                    boxShadow: inputText.trim() && !isLoading 
                      ? '0 8px 25px rgba(46, 125, 50, 0.4), 0 0 20px rgba(57, 255, 20, 0.2)' 
                      : '0 4px 15px rgba(0,0,0,0.1)'
                  }}
                >
                  <Send className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Quick suggestions */}
              {messages.length === 1 && !isLoading && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {getQuickSuggestions(currentLanguage).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInputText(suggestion)}
                      className="px-3 py-1 text-xs rounded-full border border-neutral-grey/30 hover:border-neon-lime/50 hover:bg-neon-lime/10 transition-all duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }

        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-thumb-neutral-grey\/30::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thumb-neutral-grey\/30::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thumb-neutral-grey\/30::-webkit-scrollbar-thumb {
          background-color: rgba(176, 190, 197, 0.3);
          border-radius: 2px;
        }
      `}</style>
    </>
  );
};

export default Chatbot;