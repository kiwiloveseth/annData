import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  DollarSign, 
  Package, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  MessageSquare,
  Settings,
  Eye,
  UserCheck,
  Wheat,
  Star,
  Clock
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Chart from '../components/Chart';
import Table from '../components/Table';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

// Mock admin data
const adminStats = [
  { title: 'Total Users', value: '2,847', icon: Users, change: '+156 this month', color: 'text-neon-lime', glow: true },
  { title: 'Pending Verifications', value: '23', icon: Shield, change: '8 new today', color: 'text-primary-saffron' },
  { title: 'Active Listings', value: '1,234', icon: Package, change: '+89 this week', color: 'text-primary-green' },
  { title: 'Total Volume', value: '₹12.5Cr', icon: TrendingUp, change: '+18% this month', color: 'text-primary-blue' },
];

const pendingVerifications = [
  { id: 'VER001', name: 'Rajesh Kumar', role: 'Farmer', location: 'Punjab', documents: 'Complete', status: 'Pending', date: '2025-01-15' },
  { id: 'VER002', name: 'Agro Distributors Ltd', role: 'Dealer', location: 'Delhi', documents: 'Incomplete', status: 'Review', date: '2025-01-14' },
  { id: 'VER003', name: 'Sunita Devi', role: 'Farmer', location: 'Haryana', documents: 'Complete', status: 'Pending', date: '2025-01-13' },
];

const cropRequests = [
  { id: 'CR001', farmer: 'Ravi Kumar', crop: 'Organic Quinoa', quantity: '50kg', price: '₹180/kg', msp: '₹150/kg', status: 'Pending' },
  { id: 'CR002', farmer: 'Amit Sharma', crop: 'Premium Basmati', quantity: '100kg', price: '₹220/kg', msp: '₹200/kg', status: 'Approved' },
  { id: 'CR003', farmer: 'Deepak Patel', crop: 'Organic Cotton', quantity: '75kg', price: '₹5900/kg', msp: '₹5500/kg', status: 'Review' },
];

const mspData = [
  { crop: 'Wheat', currentMSP: 2200, proposedMSP: 2300, lastUpdated: '2025-01-01', status: 'Active' },
  { crop: 'Rice', currentMSP: 1900, proposedMSP: 2000, lastUpdated: '2024-12-15', status: 'Pending Update' },
  { crop: 'Cotton', currentMSP: 5500, proposedMSP: 5800, lastUpdated: '2025-01-10', status: 'Active' },
  { crop: 'Sugarcane', currentMSP: 300, proposedMSP: 320, lastUpdated: '2024-12-20', status: 'Review' },
];

const recentDisputes = [
  { id: 'DIS001', farmer: 'Ravi Kumar', dealer: 'Delhi Distributors', issue: 'Quality Dispute', amount: '₹50,000', status: 'Open', date: '2025-01-14' },
  { id: 'DIS002', farmer: 'Sunita Devi', dealer: 'Export House Ltd', issue: 'Payment Delay', amount: '₹80,000', status: 'Resolved', date: '2025-01-12' },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVerification, setSelectedVerification] = useState<any>(null);

  const monthlyData = [
    { month: 'Sep', users: 2100, transactions: 450, volume: 8.5 },
    { month: 'Oct', users: 2300, transactions: 520, volume: 9.2 },
    { month: 'Nov', users: 2500, transactions: 680, volume: 10.8 },
    { month: 'Dec', users: 2650, transactions: 750, volume: 11.5 },
    { month: 'Jan', users: 2847, transactions: 890, volume: 12.5 },
  ];

  const handleVerifyUser = (userId: string, action: 'approve' | 'reject') => {
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    alert(`User verification ${actionText} successfully!`);
  };

  const handleApproveCrop = (cropId: string, action: 'approve' | 'reject') => {
    const actionText = action === 'approve' ? 'approved' : 'rejected';
    alert(`Crop listing ${actionText} successfully!`);
  };

  const handleUpdateMSP = (crop: string, newMSP: number) => {
    alert(`MSP for ${crop} updated to ₹${newMSP} successfully!`);
  };

  const verificationTableData = pendingVerifications.map(verification => ({
    ID: verification.id,
    Name: verification.name,
    Role: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        verification.role === 'Farmer' 
          ? 'bg-primary-green/20 text-primary-green' 
          : 'bg-primary-blue/20 text-primary-blue'
      }`}>
        {verification.role}
      </span>
    ),
    Location: verification.location,
    Documents: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        verification.documents === 'Complete' 
          ? 'bg-neon-lime/20 text-primary-green' 
          : 'bg-primary-saffron/20 text-primary-saffron'
      }`}>
        {verification.documents}
      </span>
    ),
    Actions: (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => handleVerifyUser(verification.id, 'approve')}>
          <CheckCircle className="h-3 w-3 mr-1" />
          Approve
        </Button>
        <Button size="sm" variant="secondary" onClick={() => handleVerifyUser(verification.id, 'reject')}>
          <XCircle className="h-3 w-3 mr-1" />
          Reject
        </Button>
      </div>
    ),
  }));

  const cropRequestTableData = cropRequests.map(request => ({
    ID: request.id,
    Farmer: request.farmer,
    Crop: request.crop,
    Quantity: request.quantity,
    Price: request.price,
    MSP: request.msp,
    Status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        request.status === 'Approved' 
          ? 'bg-neon-lime/20 text-primary-green' 
          : request.status === 'Pending'
          ? 'bg-primary-saffron/20 text-primary-saffron'
          : 'bg-primary-blue/20 text-primary-blue'
      }`}>
        {request.status}
      </span>
    ),
    Actions: request.status === 'Pending' ? (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => handleApproveCrop(request.id, 'approve')}>
          <CheckCircle className="h-3 w-3 mr-1" />
          Approve
        </Button>
        <Button size="sm" variant="secondary" onClick={() => handleApproveCrop(request.id, 'reject')}>
          <XCircle className="h-3 w-3 mr-1" />
          Reject
        </Button>
      </div>
    ) : (
      <Button size="sm" variant="secondary">
        <Eye className="h-3 w-3 mr-1" />
        View
      </Button>
    ),
  }));

  const mspTableData = mspData.map(item => ({
    Crop: (
      <div className="flex items-center gap-2">
        <Wheat className="h-4 w-4 text-primary-green" />
        {item.crop}
      </div>
    ),
    'Current MSP': `₹${item.currentMSP}`,
    'Proposed MSP': `₹${item.proposedMSP}`,
    'Last Updated': item.lastUpdated,
    Status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        item.status === 'Active' 
          ? 'bg-neon-lime/20 text-primary-green' 
          : item.status === 'Pending Update'
          ? 'bg-primary-saffron/20 text-primary-saffron'
          : 'bg-primary-blue/20 text-primary-blue'
      }`}>
        {item.status}
      </span>
    ),
    Actions: (
      <Button size="sm" onClick={() => handleUpdateMSP(item.crop, item.proposedMSP)}>
        <Settings className="h-3 w-3 mr-1" />
        Update
      </Button>
    ),
  }));

  const disputeTableData = recentDisputes.map(dispute => ({
    ID: dispute.id,
    Farmer: dispute.farmer,
    Dealer: dispute.dealer,
    Issue: dispute.issue,
    Amount: dispute.amount,
    Status: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        dispute.status === 'Resolved' 
          ? 'bg-neon-lime/20 text-primary-green' 
          : 'bg-primary-saffron/20 text-primary-saffron'
      }`}>
        {dispute.status}
      </span>
    ),
    Date: dispute.date,
    Actions: (
      <Button size="sm" variant="secondary">
        <MessageSquare className="h-3 w-3 mr-1" />
        Resolve
      </Button>
    ),
  }));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'crops', label: 'Crop Management', icon: Package },
    { id: 'msp', label: 'MSP Management', icon: DollarSign },
    { id: 'disputes', label: 'Disputes', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-neutral-grey/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
            Admin Dashboard
          </h1>
          <p className="text-neutral-grey">
            Manage users, crops, pricing, and platform operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => {
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

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-neutral-grey/20">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-neon-lime text-neon-lime'
                        : 'border-transparent text-neutral-grey hover:text-primary-green hover:border-neutral-grey'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 animate-slide-in">
                <Chart
                  data={monthlyData}
                  dataKey="users"
                  xAxisKey="month"
                  title="User Growth Trend"
                  color="#39FF14"
                />
              </Card>
              <Card className="p-6 animate-slide-in">
                <Chart
                  data={monthlyData}
                  dataKey="volume"
                  xAxisKey="month"
                  title="Transaction Volume (₹Cr)"
                  color="#00F5FF"
                />
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6 animate-slide-in">
              <h3 className="font-poppins font-semibold text-xl mb-6 text-neutral-black">
                Recent Platform Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-neutral-grey/5 rounded-lg">
                  <div className="w-10 h-10 bg-primary-green/20 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-primary-green" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-black">New farmer verified</p>
                    <p className="text-sm text-neutral-grey">Rajesh Kumar from Punjab joined the platform</p>
                  </div>
                  <span className="text-xs text-neutral-grey">2 hours ago</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-neutral-grey/5 rounded-lg">
                  <div className="w-10 h-10 bg-primary-blue/20 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary-blue" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-black">New crop listing approved</p>
                    <p className="text-sm text-neutral-grey">Organic Quinoa by Ravi Kumar</p>
                  </div>
                  <span className="text-xs text-neutral-grey">4 hours ago</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-neutral-grey/5 rounded-lg">
                  <div className="w-10 h-10 bg-primary-saffron/20 rounded-full flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary-saffron" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-black">MSP updated</p>
                    <p className="text-sm text-neutral-grey">Wheat MSP increased to ₹2,300/kg</p>
                  </div>
                  <span className="text-xs text-neutral-grey">1 day ago</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'users' && (
          <Card className="p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-poppins font-semibold text-xl text-neutral-black">
                Pending User Verifications
              </h3>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-saffron" />
                <span className="text-sm text-primary-saffron font-medium">
                  {pendingVerifications.length} pending
                </span>
              </div>
            </div>
            <Table
              headers={['ID', 'Name', 'Role', 'Location', 'Documents', 'Actions']}
              data={verificationTableData}
            />
          </Card>
        )}

        {activeTab === 'crops' && (
          <Card className="p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-poppins font-semibold text-xl text-neutral-black">
                Crop Listing Requests
              </h3>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary-green" />
                <span className="text-sm text-primary-green font-medium">
                  {cropRequests.filter(r => r.status === 'Pending').length} pending approval
                </span>
              </div>
            </div>
            <Table
              headers={['ID', 'Farmer', 'Crop', 'Quantity', 'Price', 'MSP', 'Status', 'Actions']}
              data={cropRequestTableData}
            />
          </Card>
        )}

        {activeTab === 'msp' && (
          <Card className="p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-poppins font-semibold text-xl text-neutral-black">
                Minimum Support Price Management
              </h3>
              <Button variant="neon">
                <DollarSign className="h-4 w-4 mr-2" />
                Bulk Update MSP
              </Button>
            </div>
            <Table
              headers={['Crop', 'Current MSP', 'Proposed MSP', 'Last Updated', 'Status', 'Actions']}
              data={mspTableData}
            />
          </Card>
        )}

        {activeTab === 'disputes' && (
          <Card className="p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-poppins font-semibold text-xl text-neutral-black">
                Dispute Resolution
              </h3>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary-saffron" />
                <span className="text-sm text-primary-saffron font-medium">
                  {recentDisputes.filter(d => d.status === 'Open').length} open disputes
                </span>
              </div>
            </div>
            <Table
              headers={['ID', 'Farmer', 'Dealer', 'Issue', 'Amount', 'Status', 'Date', 'Actions']}
              data={disputeTableData}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;