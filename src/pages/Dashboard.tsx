import React from 'react';
import { TrendingUp, DollarSign, Package, Star, Calendar, MapPin } from 'lucide-react';
import Card from '../components/Card';
import Chart from '../components/Chart';
import Table from '../components/Table';
import Button from '../components/Button';
import { useStaticData } from '../hooks/useDummyData';

const Dashboard = () => {
  const { crops, profile } = useStaticData();

  const stats = [
    {
      title: 'Total Earnings',
      value: profile.total_earnings,
      icon: DollarSign,
      change: '+12.5%',
      color: 'text-neon-lime',
      glow: true,
    },
    {
      title: 'Active Listings',
      value: profile.active_listings.toString(),
      icon: Package,
      change: '+3 this month',
      color: 'text-primary-green',
    },
    {
      title: 'Avg Rating',
      value: profile.rating.toString(),
      icon: Star,
      change: '+0.2 this month',
      color: 'text-primary-saffron',
    },
    {
      title: 'Completed Sales',
      value: profile.completed_sales.toString(),
      icon: TrendingUp,
      change: '+8 this month',
      color: 'text-primary-blue',
    },
  ];

  const recentTransactions = profile.transactions.slice(0, 5).map(transaction => ({
    Crop: transaction.crop,
    Buyer: transaction.buyer,
    Amount: transaction.amount,
    Date: transaction.date,
    Status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        transaction.status === 'Completed' 
          ? 'bg-neon-lime/20 text-primary-green' 
          : 'bg-primary-saffron/20 text-primary-saffron'
      }`}>
        {transaction.status}
      </span>
    ),
  }));

  return (
    <div className="min-h-screen bg-neutral-grey/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
            Welcome back, {profile.name}
          </h1>
          <div className="flex items-center gap-4 text-neutral-grey">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Member since {new Date(profile.join_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 animate-slide-in"
                hover
                glow={stat.glow}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.glow ? 'bg-neon-lime/20' : 'bg-neutral-grey/10'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="font-poppins font-semibold text-2xl text-neutral-black mb-1">
                  {stat.value}
                </h3>
                <p className="text-neutral-grey text-sm mb-2">{stat.title}</p>
                <p className="text-primary-green text-xs font-medium">{stat.change}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Earnings Chart */}
          <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <Chart
              data={profile.monthly_data}
              dataKey="earnings"
              xAxisKey="month"
              title="Monthly Earnings vs MSP"
              color="#39FF14"
            />
          </Card>

          {/* Active Crops */}
          <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.5s' }}>
            <h3 className="font-poppins font-semibold text-xl mb-4 text-neutral-black">
              Active Crops
            </h3>
            <div className="space-y-4">
              {crops.slice(0, 4).map((crop, index) => (
                <div
                  key={crop.id}
                  className="flex items-center justify-between p-4 bg-neutral-grey/5 rounded-lg hover:bg-neutral-grey/10 transition-colors duration-200"
                >
                  <div>
                    <h4 className="font-medium text-neutral-black">{crop.name}</h4>
                    <p className="text-sm text-neutral-grey">{crop.quantity} • {crop.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-green">₹{crop.price}</p>
                    <p className="text-xs text-neutral-grey">MSP: ₹{crop.msp}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="secondary">
              View All Crops
            </Button>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="mt-8 p-6 animate-slide-in" style={{ animationDelay: '0.6s' }}>
          <h3 className="font-poppins font-semibold text-xl mb-4 text-neutral-black">
            Recent Transactions
          </h3>
          <Table
            headers={['Crop', 'Buyer', 'Amount', 'Date', 'Status']}
            data={recentTransactions}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;