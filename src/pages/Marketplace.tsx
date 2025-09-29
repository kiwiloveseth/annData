import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Calendar, Truck } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useStaticData } from '../hooks/useDummyData';

const Marketplace = () => {
  const { marketplace } = useStaticData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Cash Crops'];

  const filteredCrops = marketplace.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.farmer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-grey/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
            Agricultural Marketplace
          </h1>
          <p className="text-neutral-grey">
            Discover fresh, quality crops directly from farmers across India
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-grey" />
              <input
                type="text"
                placeholder="Search crops, farmers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime text-neutral-black">
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Button variant="secondary" size="md">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop, index) => (
            <Card
              key={crop.id}
              className="overflow-hidden animate-slide-in"
              hover
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-green">
                    {crop.quality}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-poppins font-semibold text-xl text-neutral-black">
                    {crop.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary-saffron fill-current" />
                    <span className="text-sm font-medium text-neutral-black">{crop.rating}</span>
                  </div>
                </div>

                <p className="text-neutral-grey mb-4">By {crop.farmer}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-grey">
                    <MapPin className="h-4 w-4" />
                    <span>{crop.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-grey">
                    <Calendar className="h-4 w-4" />
                    <span>Harvested: {crop.harvest_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-grey">
                    <Truck className="h-4 w-4" />
                    <span>Available: {crop.quantity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary-green">{crop.price}</p>
                    <p className="text-xs text-neutral-grey">MSP: {crop.msp}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-black">Per kg</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 hover:animate-glow"
                    onClick={() => alert(`Buying ${crop.name} from ${crop.farmer}`)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => alert(`Contacting ${crop.farmer}`)}
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12 animate-slide-in" style={{ animationDelay: '0.8s' }}>
          <Button variant="secondary" size="lg">
            Load More Crops
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;