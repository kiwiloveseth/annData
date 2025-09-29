import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Timeline from '../components/Timeline';
import { useStaticData } from '../hooks/useDummyData';

const Traceability = () => {
  const { traceability } = useStaticData();
  const [cropId, setCropId] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);

  const handleSearch = () => {
    const cropData = traceability[cropId as keyof typeof traceability];
    if (cropData) {
      setSelectedCrop(cropData);
    } else {
      alert('Crop ID not found. Try "crop1" or "crop2" for demo.');
    }
  };

  const sampleIds = ['crop1', 'crop2'];

  return (
    <div className="min-h-screen bg-neutral-grey/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
            Crop Traceability
          </h1>
          <p className="text-neutral-grey">
            Track your crops from farm to consumer with complete transparency
          </p>
        </div>

        {/* Search Section */}
        <Card className="p-8 mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="text-center mb-6">
            <Package className="h-16 w-16 text-neon-lime mx-auto mb-4" />
            <h2 className="font-poppins font-semibold text-2xl text-neutral-black mb-2">
              Enter Crop ID to Track
            </h2>
            <p className="text-neutral-grey">
              Get complete journey details of your crop from farm to market
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-grey" />
                <input
                  type="text"
                  placeholder="Enter Crop ID (e.g., crop1)"
                  value={cropId}
                  onChange={(e) => setCropId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime focus:border-transparent transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>
                Track
              </Button>
            </div>

            {/* Sample IDs */}
            <div className="text-center">
              <p className="text-sm text-neutral-grey mb-2">Try sample IDs:</p>
              <div className="flex gap-2 justify-center">
                {sampleIds.map((id) => (
                  <button
                    key={id}
                    onClick={() => setCropId(id)}
                    className="px-3 py-1 bg-neutral-grey/10 text-primary-green rounded text-sm hover:bg-neutral-grey/20 transition-colors duration-200"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        {selectedCrop && (
          <Card className="p-8 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            {/* Crop Header */}
            <div className="border-b border-neutral-grey/20 pb-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-poppins font-bold text-2xl text-neutral-black mb-2">
                    {selectedCrop.cropName}
                  </h3>
                  <p className="text-neutral-grey">Farmer: {selectedCrop.farmer}</p>
                  <p className="text-sm text-primary-green font-medium">ID: {selectedCrop.cropId}</p>
                </div>
                <div className="flex items-center gap-2 text-neon-lime">
                  <CheckCircle className="h-6 w-6" />
                  <span className="font-medium">Verified Organic</span>
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="mb-8">
              <h4 className="font-poppins font-semibold text-xl text-neutral-black mb-6">
                Crop Journey
              </h4>
              <Timeline items={selectedCrop.journey} />
            </div>

            {/* Journey Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-neon-lime/10 rounded-lg">
                <Truck className="h-8 w-8 text-neon-lime mx-auto mb-2" />
                <p className="font-semibold text-neutral-black">Total Journey</p>
                <p className="text-sm text-neutral-grey">{selectedCrop.journey.length} Stages</p>
              </div>
              <div className="text-center p-4 bg-primary-green/10 rounded-lg">
                <CheckCircle className="h-8 w-8 text-primary-green mx-auto mb-2" />
                <p className="font-semibold text-neutral-black">Completed</p>
                <p className="text-sm text-neutral-grey">
                  {selectedCrop.journey.filter((stage: any) => stage.completed !== false).length} Stages
                </p>
              </div>
              <div className="text-center p-4 bg-primary-blue/10 rounded-lg">
                <Package className="h-8 w-8 text-primary-blue mx-auto mb-2" />
                <p className="font-semibold text-neutral-black">Quality</p>
                <p className="text-sm text-neutral-grey">Grade A Certified</p>
              </div>
            </div>
          </Card>
        )}

        {/* Info Section */}
        {!selectedCrop && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary-green" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-neutral-black mb-2">
                Full Transparency
              </h3>
              <p className="text-neutral-grey text-sm">
                Track every step of your crop's journey from farm to your table
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-neon-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-neon-lime" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-neutral-black mb-2">
                Quality Assured
              </h3>
              <p className="text-neutral-grey text-sm">
                Every stage is verified and quality-checked by certified inspectors
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-primary-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary-blue" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-neutral-black mb-2">
                Real-time Updates
              </h3>
              <p className="text-neutral-grey text-sm">
                Get live updates as your crop moves through the supply chain
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Traceability;