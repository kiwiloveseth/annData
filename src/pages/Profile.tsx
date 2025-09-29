import React from 'react';
import { User, Phone, MapPin, Calendar, Award, TrendingUp, Package, Star, Building } from 'lucide-react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import Table from '../components/Table';
import Button from '../components/Button';
import { useAuth } from '../contexts/AuthContext';
import farmerProfileData from '../data/profile.json';

// Dealer profile data
const dealerProfileData = {
  name: "Amit Distributors",
  businessId: "DL-2024-001",
  location: "New Delhi, India",
  phone: "+91 98765-12345",
  specialization: ["Grains", "Vegetables", "Export"],
  total_purchases: "₹8,75,000",
  monthly_purchases: "₹1,25,000",
  active_orders: 5,
  completed_purchases: 28,
  rating: 4.7,
  join_date: "2024-06-15",
  transactions: [
    {
      id: "TXN101",
      crop: "Organic Wheat",
      seller: "Ravi Kumar",
      amount: "₹2,30,000",
      quantity: "100 kg",
      date: "2025-03-15",
      status: "Delivered"
    },
    {
      id: "TXN102",
      crop: "Premium Rice",
      seller: "Sunita Devi",
      amount: "₹1,00,000",
      quantity: "50 kg",
      date: "2025-03-10",
      status: "In Transit"
    },
    {
      id: "TXN103",
      crop: "Fresh Corn",
      seller: "Amit Sharma",
      amount: "₹1,38,750",
      quantity: "75 kg",
      date: "2025-03-05",
      status: "Delivered"
    }
  ],
  monthly_data: [
    { month: "Sep", purchases: 45000 },
    { month: "Oct", purchases: 65000 },
    { month: "Nov", purchases: 82000 },
    { month: "Dec", purchases: 95000 },
    { month: "Jan", purchases: 110000 },
    { month: "Feb", purchases: 98000 },
    { month: "Mar", purchases: 125000 }
  ]
};

const Profile = () => {
  const { user } = useAuth();
  const profile = user?.role === 'farmer' ? farmerProfileData : dealerProfileData;
  const isDealer = user?.role === 'dealer';

  const profileStats = isDealer ? [
    { label: 'Total Purchases', value: profile.total_purchases, icon: TrendingUp, color: 'text-neon-lime' },
    { label: 'Active Orders', value: profile.active_orders.toString(), icon: Package, color: 'text-primary-green' },
    { label: 'Rating', value: `${profile.rating}/5`, icon: Star, color: 'text-primary-saffron' },
    { label: 'Completed Purchases', value: profile.completed_purchases.toString(), icon: Award, color: 'text-primary-blue' },
  ] : [
    { label: 'Total Earnings', value: profile.total_earnings, icon: TrendingUp, color: 'text-neon-lime' },
    { label: 'Active Listings', value: profile.active_listings.toString(), icon: Package, color: 'text-primary-green' },
    { label: 'Rating', value: `${profile.rating}/5`, icon: Star, color: 'text-primary-saffron' },
    { label: 'Completed Sales', value: profile.completed_sales.toString(), icon: Award, color: 'text-primary-blue' },
  ];

  const transactionHeaders = isDealer 
    ? ['ID', 'Crop', 'Seller', 'Amount', 'Date', 'Status']
    : ['ID', 'Crop', 'Buyer', 'Amount', 'Date', 'Status'];
    
  const transactionData = profile.transactions.map(transaction => ({
    ID: transaction.id,
    Crop: transaction.crop,
    [isDealer ? 'Seller' : 'Buyer']: isDealer ? transaction.seller : transaction.buyer,
    Amount: transaction.amount,
    Date: transaction.date,
    Status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        (transaction.status === 'Completed' || transaction.status === 'Delivered')
          ? 'bg-neon-lime/20 text-primary-green' 
          : transaction.status === 'In Transit'
          ? 'bg-primary-blue/20 text-primary-blue'
          : 'bg-primary-saffron/20 text-primary-saffron'
      }`}>
        {transaction.status}
      </span>
    ),
  }));

  return (
    <div className="min-h-screen bg-neutral-grey/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8 animate-slide-in neon-glow">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              isDealer 
                ? 'bg-gradient-to-br from-primary-blue to-neon-blue' 
                : 'bg-gradient-to-br from-primary-green to-neon-lime'
            }`}>
              {isDealer ? <Building className="h-12 w-12 text-white" /> : <User className="h-12 w-12 text-white" />}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
                {profile.name}
              </h1>
              <div className="mb-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  isDealer 
                    ? 'bg-primary-blue/20 text-primary-blue' 
                    : 'bg-primary-green/20 text-primary-green'
                }`}>
                  {isDealer ? 'Dealer' : 'Farmer'}
                </span>
              </div>
              <div className="space-y-1 text-neutral-grey">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {new Date(profile.join_date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-neutral-grey">
                  {isDealer ? 'Business ID: ' : 'Aadhaar: '}
                </span>
                <span className="font-mono text-sm text-neutral-black">
                  {isDealer ? profile.businessId : profile.aadhaar}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="neon">
                Edit Profile
              </Button>
              <Button variant="secondary">
                Share Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {profileStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 animate-slide-in"
                hover
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-neutral-grey/10 rounded-lg flex items-center justify-center">
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="font-poppins font-semibold text-2xl text-neutral-black mb-1">
                  {stat.value}
                </h3>
                <p className="text-neutral-grey text-sm">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Earnings Chart */}
          <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <Chart
              data={profile.monthly_data}
              dataKey={isDealer ? "purchases" : "earnings"}
              xAxisKey="month"
              title={isDealer ? "Monthly Purchases Trend" : "Monthly Earnings Trend"}
              color={isDealer ? "#00F5FF" : "#39FF14"}
            />
          </Card>

          {/* Specialization */}
          <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.5s' }}>
            <h3 className="font-poppins font-semibold text-xl mb-6 text-neutral-black">
              {isDealer ? 'Trading Specialization' : 'Crop Specialization'}
            </h3>
            <div className="space-y-4">
              {(isDealer ? profile.specialization : profile.crops).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-neutral-grey/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isDealer 
                        ? 'bg-primary-blue/20' 
                        : 'bg-primary-green/20'
                    }`}>
                      {isDealer ? (
                        <Building className={`h-5 w-5 text-primary-blue`} />
                      ) : (
                        <Package className="h-5 w-5 text-primary-green" />
                      )}
                    </div>
                    <span className="font-medium text-neutral-black">{item}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary-saffron fill-current" />
                    <span className="text-sm text-neutral-grey">4.5</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="secondary">
              {isDealer ? 'Add Specialization' : 'Add New Crop'}
            </Button>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-poppins font-semibold text-xl text-neutral-black">
              {isDealer ? 'Purchase History' : 'Transaction History'}
            </h3>
            <Button variant="secondary" size="sm">
              Export Data
            </Button>
          </div>
          <Table headers={transactionHeaders} data={transactionData} />
        </Card>
      </div>
    </div>
  );
};

export default Profile;