import React from 'react';
import { Wheat, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-blue text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-green to-neon-lime rounded-lg flex items-center justify-center">
                <Wheat className="h-6 w-6 text-white" />
              </div>
              <span className="font-poppins font-bold text-xl">AnnData</span>
            </div>
            <p className="text-neutral-grey text-sm leading-relaxed">
              Bridging the gap between farmers and markets through blockchain technology and transparent trading.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Dashboard', 'Marketplace', 'Traceability', 'Profile'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase()}`} className="text-neutral-grey hover:text-neon-lime transition-colors duration-300 text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-neutral-grey text-sm">
              <li>Crop Marketplace</li>
              <li>MSP Tracking</li>
              <li>Supply Chain Traceability</li>
              <li>Fair Price Guarantee</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-neutral-grey text-sm">
                <Mail className="h-4 w-4" />
                <span>contact@AnnData.com</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-grey text-sm">
                <Phone className="h-4 w-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-grey text-sm">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-grey/20 mt-8 pt-8 text-center">
          <p className="text-neutral-grey text-sm">
            &copy; 2025 AnnData. All rights reserved. Building a transparent agricultural future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;