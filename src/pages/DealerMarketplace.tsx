import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Calendar, Truck, MessageCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import listingsData from '../data/listings.json';
import reviewsData from '../data/reviews.json';

interface Review {
  id: string;
  listingId: string;
  farmerId: string;
  dealerId: string;
  dealerName: string;
  rating: number;
  comment: string;
  date: string;
}

const DealerMarketplace: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState<Review[]>(reviewsData);
  const [showReviewForm, setShowReviewForm] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const activeListings = listingsData.filter(listing => listing.isActive);
  const filteredListings = activeListings.filter(listing =>
    listing.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getListingReviews = (listingId: string) => {
    return reviews.filter(review => review.listingId === listingId);
  };

  const getAverageRating = (listingId: string) => {
    const listingReviews = getListingReviews(listingId);
    if (listingReviews.length === 0) return 0;
    const sum = listingReviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / listingReviews.length).toFixed(1);
  };

  const handleBuyNow = (listingId: string, cropName: string, farmerName: string) => {
    if (user?.role !== 'dealer') {
      alert('Only dealers can purchase crops. Please login as a dealer.');
      return;
    }
    
    const confirmed = window.confirm(`Confirm purchase of ${cropName} from ${farmerName}?`);
    if (confirmed) {
      alert(`Purchase successful! ${cropName} from ${farmerName} has been added to your orders.`);
      setShowReviewForm(listingId);
    }
  };

  const handleSubmitReview = (listingId: string, farmerId: string) => {
    const review: Review = {
      id: `review${Date.now()}`,
      listingId,
      farmerId,
      dealerId: 'current_dealer',
      dealerName: 'Current Dealer',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [...prev, review]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(null);
  };

  return (
    <div className="min-h-screen bg-neutral-grey/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
            {t('marketplace.title')}
          </h1>
          <p className="text-neutral-grey">
            {t('marketplace.subtitle')}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-grey" />
              <input
                type="text"
                placeholder={t('marketplace.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime text-neutral-black">
                <option value="all">All Categories</option>
                <option value="grains">Grains</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
              </select>
              <Button variant="secondary" size="md">
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => {
            const listingReviews = getListingReviews(listing.id);
            const averageRating = getAverageRating(listing.id);
            
            return (
              <Card
                key={listing.id}
                className="overflow-hidden animate-slide-in"
                hover
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.cropName}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-green">
                      {listing.grade}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-poppins font-semibold text-xl text-neutral-black">
                      {listing.cropName}
                    </h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary-saffron fill-current" />
                      <span className="text-sm font-medium text-neutral-black">
                        {averageRating || 'New'}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-grey mb-4">By {listing.farmerName}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-grey">
                      <MapPin className="h-4 w-4" />
                      <span>{listing.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-grey">
                      <Calendar className="h-4 w-4" />
                      <span>Harvested: {listing.harvestDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-grey">
                      <Truck className="h-4 w-4" />
                      <span>Available: {listing.quantity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-primary-green">₹{listing.pricePerKg}</p>
                      <p className="text-xs text-neutral-grey">Per kg</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <Button
                      className="flex-1 hover:animate-glow"
                      onClick={() => handleBuyNow(listing.id, listing.cropName, listing.farmerName)}
                      disabled={user?.role !== 'dealer'}
                    >
                      {user?.role === 'dealer' ? t('marketplace.buy') : 'Dealers Only'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => alert(`Contacting ${listing.farmerName}`)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Reviews Section */}
                  {listingReviews.length > 0 && (
                    <div className="border-t border-neutral-grey/20 pt-4">
                      <h4 className="font-medium text-neutral-black mb-2">Recent Reviews</h4>
                      <div className="space-y-2">
                        {listingReviews.slice(0, 2).map((review) => (
                          <div key={review.id} className="text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-neutral-black">{review.dealerName}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? 'text-primary-saffron fill-current' : 'text-neutral-grey'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-neutral-grey text-xs">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Review Form */}
                  {showReviewForm === listing.id && (
                    <div className="border-t border-neutral-grey/20 pt-4 mt-4">
                      <h4 className="font-medium text-neutral-black mb-3">Rate this farmer</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-neutral-grey">Rating:</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`h-5 w-5 ${
                                    star <= newReview.rating
                                      ? 'text-primary-saffron fill-current'
                                      : 'text-neutral-grey'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea
                          placeholder="Write your review..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="w-full px-3 py-2 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime text-sm"
                          rows={3}
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSubmitReview(listing.id, listing.farmerId)}
                          >
                            Submit Review
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setShowReviewForm(null)}
                          >
                            {t('common.cancel')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
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

export default DealerMarketplace;