import React, { useState } from 'react';
import { User, Mail, Lock, Wallet, Users } from 'lucide-react';
import Button from '../Button';
import Card from '../Card';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

// Dummy user credentials for testing
const DUMMY_USERS = {
  farmer: {
    email: 'farmer@AnnData.com',
    password: 'farmer123',
    name: 'Ravi Kumar',
    role: 'farmer' as const
  },
  dealer: {
    email: 'dealer@AnnData.com',
    password: 'dealer123',
    name: 'Amit Distributors',
    role: 'dealer' as const
  }
};

interface LoginFormProps {
  onToggleMode: () => void;
  isSignUp: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleMode, isSignUp }) => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer' as 'farmer' | 'dealer'
  });
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (isSignUp) {
      // Sign up flow
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        walletAddress: walletConnected ? walletAddress : undefined
      };
      login(userData);
    } else {
      // Sign in flow - check dummy credentials
      const dummyUser = Object.values(DUMMY_USERS).find(user => 
        user.email === formData.email && 
        user.password === formData.password &&
        user.role === formData.role
      );

      if (dummyUser) {
        const userData = {
          id: dummyUser.role === 'farmer' ? 'farmer1' : 'dealer1',
          name: dummyUser.name,
          email: dummyUser.email,
          role: dummyUser.role,
          walletAddress: walletConnected ? walletAddress : undefined
        };
        login(userData);
      } else {
        setLoginError('Invalid credentials or role mismatch. Please check your email, password, and selected role.');
      }
    }
  };

  const handleDemoLogin = (role: 'farmer' | 'dealer') => {
    const dummyUser = DUMMY_USERS[role];
    setFormData({
      ...formData,
      email: dummyUser.email,
      password: dummyUser.password,
      role: dummyUser.role
    });
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to connect your wallet.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-grey/5 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-green to-neon-lime rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-poppins font-bold text-2xl text-neutral-black">
            {isSignUp ? t('auth.signup') : t('auth.signin')}
          </h2>
          {!isSignUp && (
            <p className="text-sm text-neutral-grey mt-2">
              Use demo credentials or create a new account
            </p>
          )}
        </div>

        {/* Demo Login Buttons */}
        {!isSignUp && (
          <div className="mb-6 p-4 bg-neutral-grey/5 rounded-lg">
            <p className="text-sm font-medium text-neutral-black mb-3">Quick Demo Login:</p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleDemoLogin('farmer')}
                className="flex-1"
              >
                <User className="h-4 w-4 mr-1" />
                Login as Farmer
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleDemoLogin('dealer')}
                className="flex-1"
              >
                <Users className="h-4 w-4 mr-1" />
                Login as Dealer
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{loginError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection - Always First */}
          <div>
            <label className="block text-sm font-medium text-neutral-black mb-2">
              {t('auth.role')}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'farmer' | 'dealer' })}
              className="w-full px-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime focus:border-transparent"
            >
              <option value="farmer">{t('auth.farmer')}</option>
              <option value="dealer">{t('auth.dealer')}</option>
            </select>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-neutral-black mb-2">
                {t('auth.name')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-grey" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-neutral-black mb-2">
              {t('auth.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-grey" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-black mb-2">
              {t('auth.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-grey" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-neutral-grey/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-lime focus:border-transparent"
              />
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="border-t border-neutral-grey/20 pt-6">
            <Button
              type="button"
              onClick={connectWallet}
              variant={walletConnected ? "primary" : "secondary"}
              className="w-full mb-4"
            >
              <Wallet className="h-5 w-5 mr-2" />
              {walletConnected ? t('auth.wallet.connected') : t('auth.wallet.connect')}
            </Button>
            {walletConnected && (
              <p className="text-xs text-neutral-grey text-center">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {isSignUp ? t('auth.signup') : t('auth.signin')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onToggleMode}
            className="text-primary-green hover:text-neon-lime transition-colors duration-300"
          >
            {isSignUp 
              ? `Already have an account? ${t('auth.signin')}`
              : `Don't have an account? ${t('auth.signup')}`
            }
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;