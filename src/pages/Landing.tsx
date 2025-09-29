import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wheat, Shield, TrendingUp, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    { label: 'Active Farmers', value: '10,000+', icon: Users },
    { label: 'Crops Traded', value: '₹50Cr+', icon: TrendingUp },
    { label: 'Fair Trades', value: '95%', icon: Shield },
    { label: 'Avg Rating', value: '4.8/5', icon: Star },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Fair Price Guarantee',
      description: 'MSP tracking ensures farmers get fair market prices above government minimum support price.',
    },
    {
      icon: TrendingUp,
      title: 'Real-time Market Data',
      description: 'Access live market prices, demand forecasts, and trading opportunities across India.',
    },
    {
      icon: Wheat,
      title: 'Complete Traceability',
      description: 'Track your crops from farm to consumer with blockchain-powered transparency.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-in">
            <h1 className="font-poppins font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Fair, Transparent, <span className="text-neon-lime">Traceable</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-neutral-grey max-w-3xl mx-auto leading-relaxed">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate(
                  user?.role === 'dealer' ? '/marketplace' : 
                  user?.role === 'admin' ? '/admin' : 
                  '/dashboard'
                )}
                variant="neon"
                size="lg"
                className="w-full sm:w-auto"
              >
                {user?.role === 'dealer' ? t('landing.cta.marketplace') : 
                 user?.role === 'admin' ? 'Admin Panel' : 
                 t('landing.cta.dashboard')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => navigate(
                  user?.role === 'farmer' ? '/dashboard' : 
                  user?.role === 'admin' ? '/traceability' : 
                  '/marketplace'
                )}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {user?.role === 'farmer' ? t('landing.cta.dashboard') : 
                 user?.role === 'admin' ? 'Monitor Platform' : 
                 t('landing.cta.marketplace')}
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-neon-lime/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-primary-saffron/30 rounded-full animate-bounce"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center animate-slide-in"
                  hover
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-green to-neon-lime rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-neutral-grey">{stat.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-grey/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl text-neutral-black mb-4">
              Why Choose AnnData?
            </h2>
            <p className="text-xl text-neutral-grey max-w-2xl mx-auto">
              Empowering farmers with technology-driven solutions for transparent and profitable agricultural trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center animate-slide-in"
                  hover
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-blue to-neon-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-poppins font-semibold text-2xl text-neutral-black mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-grey leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-green text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-bold text-4xl mb-6">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl mb-8 text-neutral-grey max-w-2xl mx-auto">
            Join thousands of farmers who trust AnnData for fair, transparent, and profitable crop trading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate(
                user?.role === 'dealer' ? '/marketplace' : 
                user?.role === 'admin' ? '/admin' : 
                '/dashboard'
              )}
              variant="neon"
              size="lg"
            >
              {user?.role === 'dealer' ? 'Start Trading Now' : 
               user?.role === 'admin' ? 'Access Admin Panel' : 
               'Start Farming Now'}
            </Button>
            <Button 
              onClick={() => navigate('/traceability')}
              variant="secondary"
              size="lg"
            >
              Track Your Crops
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-neon-lime" />
              <span>100% Secure Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-neon-lime" />
              <span>MSP Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-neon-lime" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;