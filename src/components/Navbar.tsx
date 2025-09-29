import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wheat, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import Button from './Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const getNavItems = () => {
    if (!isAuthenticated) return [{ name: t('nav.home'), path: '/' }];
    
    if (user?.role === 'admin') {
      return [
        { name: t('nav.home'), path: '/' },
        { name: 'Admin Dashboard', path: '/admin' },
        { name: t('nav.traceability'), path: '/traceability' },
      ];
    }
    
    const baseItems = [
      { name: t('nav.home'), path: '/' },
      { name: t('nav.dashboard'), path: '/dashboard' },
      { name: t('nav.marketplace'), path: '/marketplace' },
      { name: t('nav.traceability'), path: '/traceability' },
      { name: t('nav.profile'), path: '/profile' },
    ];
    
    return baseItems;
  };

  const navItems = getNavItems();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-neutral-grey/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-green to-neon-lime rounded-lg flex items-center justify-center">
              <Wheat className="h-6 w-6 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-primary-green">AnnData</span>
          </Link> */}
          <Link 
  to="/" 
  className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
>
  <img 
    src="asset/logo.png"   // replace with your actual PNG path
    alt="AnnData Logo" 
    className="w-16 h-16 object-contain"
  />
</Link>


          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-neon-lime border-b-2 border-neon-lime'
                      : 'text-neutral-black hover:text-primary-green hover:bg-primary-green/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Selector */}
              <LanguageSelector />
              
              {/* User Actions */}
              {isAuthenticated && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-neutral-grey">
                    {user?.name} ({user?.role})
                  </span>
                  <Button
                    onClick={logout}
                    variant="secondary"
                    size="sm"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    {t('nav.logout')}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-black hover:text-primary-green hover:bg-primary-green/10 transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-grey/20">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-neon-lime bg-primary-green/10 border-l-4 border-neon-lime'
                    : 'text-neutral-black hover:text-primary-green hover:bg-primary-green/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="px-3 py-2">
              <LanguageSelector />
            </div>
            
            {/* Mobile User Actions */}
            {isAuthenticated && (
              <div className="px-3 py-2 border-t border-neutral-grey/20">
                <p className="text-sm text-neutral-grey mb-2">
                  {user?.name} ({user?.role})
                </p>
                <Button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  {t('nav.logout')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;