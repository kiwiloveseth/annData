# AnnData - Bridge for Agriculture

AnnData is a blockchain-inspired agricultural marketplace that connects farmers directly with distributors and ensures fair, transparent, and traceable crop trading.

## 🌟 Features

### Frontend (React + TypeScript + Tailwind CSS)
- **Landing Page**: Hero section with compelling call-to-actions
- **Dashboard**: Farmer analytics with earnings, MSP tracking, and crop management
- **Marketplace**: Browse and purchase crops with advanced filtering
- **Traceability**: Track crop journey from farm to consumer
- **Profile**: Farmer profile management and transaction history
- **Responsive Design**: Mobile-first approach with smooth animations

### Design System
- **Colors**: Indian-inspired palette (Green #2E7D32, Saffron #FF9933, Blue #0D47A1) with modern neon accents (Lime #39FF14, Electric Blue #00F5FF)
- **Typography**: Poppins for headings, Inter for body text
- **Animations**: Smooth Tailwind CSS transitions and hover effects

### Technology Stack
- **Frontend**: React 18, TypeScript, React Router, Tailwind CSS, Recharts
- **Backend**: Node.js + Express (placeholder)
- **Smart Contracts**: Solidity + Hardhat (placeholder)
- **Styling**: Tailwind CSS with custom design system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AnnData
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
AnnData/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Chart.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Table.tsx
│   │   └── Timeline.tsx
│   ├── pages/              # Application pages
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Marketplace.tsx
│   │   ├── Traceability.tsx
│   │   └── Profile.tsx
│   ├── data/               # Dummy data for MVP
│   │   ├── crops.json
│   │   ├── marketplace.json
│   │   ├── traceability.json
│   │   └── profile.json
│   ├── hooks/              # Custom React hooks
│   │   └── useDummyData.ts
│   └── lib/                # Utility libraries
│       └── contracts.ts    # Blockchain contract interfaces (placeholder)
├── contracts/              # Smart contracts (placeholder)
├── backend/               # Backend API (placeholder)
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary Green**: #2E7D32 (Agricultural/Nature theme)
- **Saffron**: #FF9933 (Indian heritage)
- **Deep Blue**: #0D47A1 (Trust and reliability)
- **Neon Lime**: #39FF14 (Modern accent)
- **Electric Blue**: #00F5FF (Technology accent)

### Components
- **Button**: Primary, secondary, and neon variants with hover effects
- **Card**: Flexible container with optional hover and glow effects
- **Chart**: Responsive charts using Recharts
- **Timeline**: Vertical timeline for traceability
- **Table**: Data tables with sorting and pagination

## 📊 Dummy Data

The application uses comprehensive dummy data to simulate:
- **Crops**: Various crop types with MSP, market prices, and ratings
- **Marketplace**: Crop listings with farmer details and locations
- **Traceability**: Complete supply chain journey from farm to consumer
- **Profile**: Farmer profiles with transaction history and earnings

## 🔮 Future Enhancements

### Smart Contracts (Planned)
- **UserRegistry**: Farmer registration and KYC verification
- **MSPManager**: Government MSP price management
- **CropNFT**: Crop tokenization for ownership and traceability
- **Marketplace**: Decentralized trading with escrow
- **Traceability**: Immutable supply chain records
- **RatingSystem**: Reputation management

### Backend API (Planned)
- **Authentication**: JWT-based user authentication
- **User Management**: Farmer and buyer profiles
- **Crop Management**: CRUD operations for crop listings
- **Trading Engine**: Order matching and settlement
- **Analytics**: Market insights and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Farmers**: The backbone of our agricultural economy
- **Government MSP Policies**: Ensuring fair pricing for farmers
- **Blockchain Technology**: Enabling transparency and trust
- **Open Source Community**: Making this project possible

---

**AnnData** - Building a transparent, fair, and profitable agricultural future for farmers across India. 🌾