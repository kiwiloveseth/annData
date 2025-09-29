// import React, { useState, useContext } from 'react';
// import { Plus, Package, Star, TrendingUp, Edit, Trash2 } from 'lucide-react';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import Chart from '../components/Chart';
// import { useAuth } from '../contexts/AuthContext';
// import { useLanguage } from '../contexts/LanguageContext';
// import listingsData from '../data/listings.json';
// import reviewsData from '../data/reviews.json';
// import axios from 'axios';
// import { NFTContext } from '../blockchain/cropContext';
// import { QRCodeCanvas } from 'qrcode.react';

// // Define an interface for the form's state for type safety
// interface NewCropFormState {
//   cropName: string;
//   quality: string;
//   pesticides: string;
//   quantity: string;       // Keep as string for form inputs
//   purchasePrice: string;  // Keep as string for form inputs
//   certificateURI: string;
// }

// const FarmerDashboard: React.FC = () => {
//   const { user } = useAuth();
//   const { t } = useLanguage();
//   const [listings, setListings] = useState(listingsData);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const nftContext = useContext(NFTContext);
//   if (!nftContext) {
//     throw new Error("NFTContext must be used within an NFTProvider");
//   }
//   // Use the custom hook to get the required functions and state from your context
//   const { mintCrop, currentAccount } = nftContext;

//   // Initialize the state for the new crop form
//   const [newCropForm, setNewCropForm] = useState<Omit<NewCropFormState, 'imageURI'>>({
//     cropName: '',
//     quality: 'Grade A',
//     pesticides: '',
//     quantity: '',
//     purchasePrice: '',
//     certificateURI: '',
//   });

//   // Create a separate state to handle the image file
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const farmerListings = listings.filter(listing => listing.isActive);
//   const farmerReviews = reviewsData.filter(review => 
//     farmerListings.some(listing => listing.id === review.listingId)
//   );

//   // Mock data for stats and charts
//   const stats = [
//     { title: t('dashboard.earnings'), value: '₹3,45,000', icon: TrendingUp, change: '+12.5%', color: 'text-neon-lime', glow: true },
//     { title: t('dashboard.listings'), value: farmerListings.length.toString(), icon: Package, change: '+3 this month', color: 'text-primary-green' },
//     { title: t('dashboard.rating'), value: '4.5', icon: Star, change: '+0.2 this month', color: 'text-primary-saffron' },
//     { title: t('dashboard.sales'), value: '12', icon: TrendingUp, change: '+8 this month', color: 'text-primary-blue' },
//   ];
//   const monthlyData = [ { month: 'Sep', earnings: 25000 }, { month: 'Oct', earnings: 35000 }, { month: 'Nov', earnings: 42000 }, { month: 'Dec', earnings: 48000 }, { month: 'Jan', earnings: 52000 }, { month: 'Feb', earnings: 45000 }, { month: 'Mar', earnings: 58000 } ];

//   // A generic handler to update the text-based form state as the user types
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewCropForm(prev => ({ ...prev, [name]: value }));
//   };

//   // A specific handler for the file input
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   // The handler for the form submission
//   const handleAddListing = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!currentAccount) {
//       alert("Please connect your wallet before minting.");
//       return;
//     }
//     if (!imageFile) {
//       alert("Please select an image for your crop.");
//       return;
//     }

//     try {
//       // Step 1: Upload the image to a service like Cloudinary to get a URL
//       const formData = new FormData();
//       console.log("checkpoint 1");
//       formData.append("file", imageFile);
//       console.log("checkpoint 2");
//       formData.append("upload_preset", "NFT_Marketplace");
      
//       const cloudinaryRes = await axios.post(
//         `https://api.cloudinary.com/v1_1/dbvezos5j/image/upload`,
//         formData
//       );
//       const imageUrl = cloudinaryRes.data.secure_url;
//       console.log("Image uploaded to Cloudinary:", imageUrl);
//       // Step 2: Call the mintCrop function with the form data and the new image URL
//       console.log("Minting crop NFT...");
//       console.log("Current Account:", currentAccount);
//       console.log("Form Data:", newCropForm);
//       const tokenId = await mintCrop(
//         currentAccount,
//         newCropForm.cropName,
//         newCropForm.quality,
//         newCropForm.pesticides,
//         Number(newCropForm.quantity),
//         Number(newCropForm.purchasePrice),
//         newCropForm.certificateURI,
//         imageUrl // Use the URL from the successful upload
//       );
      
//       alert(`Successfully minted Crop NFT with Token ID: ${tokenId}`);
//       setShowAddForm(false);
//     } catch (error) {
//       console.error("Failed to mint NFT:", error);
//       alert("Failed to mint NFT. Check the console for more details.");
//     }
//   };
  
//     const handleDelistCrop = (listingId: string) => {
//     setListings(prev => 
//       prev.map(listing => 
//         listing.id === listingId 
//           ? { ...listing, isActive: false }
//           : listing
//       )
//     );
//   };

// function QRPopupExample() {
//   const [isOpen, setIsOpen] = useState(false);

//   // The value you want to encode in QR
//   const qrValue = "https://apple-supply-chain-j-eych.bolt.host/";

//   return (
//     <div className="min-h-screen bg-neutral-grey/5 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8 animate-slide-in">
//           <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
//             {t('dashboard.welcome')}, {user?.name}
//           </h1>
//           <p className="text-neutral-grey">Farmer Dashboard</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {stats.map((stat, index) => {
//             const IconComponent = stat.icon;
//             return (
//               <Card key={index} className="p-6 animate-slide-in" hover glow={stat.glow} style={{ animationDelay: `${index * 0.1}s` }}>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.glow ? 'bg-neon-lime/20' : 'bg-neutral-grey/10'}`}>
//                     <IconComponent className={`h-6 w-6 ${stat.color}`} />
//                   </div>
//                 </div>
//                 <h3 className="font-poppins font-semibold text-2xl text-neutral-black mb-1">{stat.value}</h3>
//                 <p className="text-neutral-grey text-sm mb-2">{stat.title}</p>
//                 <p className="text-primary-green text-xs font-medium">{stat.change}</p>
//               </Card>
//             );
//           })}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//           {/* Earnings Chart */}
//           <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
//             <Chart data={monthlyData} dataKey="earnings" xAxisKey="month" title="Monthly Earnings" color="#39FF14" />
//           </Card>

//           {/* Add Listing Form */}
//           <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.5s' }}>
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-poppins font-semibold text-xl text-neutral-black">
//                 {t('dashboard.add.listing')}
//               </h3>
//               <Button onClick={() => setShowAddForm(!showAddForm)} variant="neon" size="sm">
//                 <Plus className="h-4 w-4 mr-2" /> Add
//               </Button>
//             </div>

//             {showAddForm && (
//               <form onSubmit={handleAddListing} className="space-y-4">
//                 <input type="text" placeholder={t('listing.crop')} name="cropName" value={newCropForm.cropName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
//                 <select name="quality" value={newCropForm.quality} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
//                   <option value="Grade A">Grade A</option>
//                   <option value="Premium">Premium</option>
//                   <option value="Export Quality">Export Quality</option>
//                   <option value="Organic">Organic</option>
//                 </select>
//                 <input type="text" placeholder="Pesticides Used (e.g., None, DDT)" name="pesticides" value={newCropForm.pesticides} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
//                 <input type="number" placeholder="Quantity (in kg)" name="quantity" value={newCropForm.quantity} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
//                 <input type="number" placeholder="Purchase Price (per kg)" name="purchasePrice" value={newCropForm.purchasePrice} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
//                 <input type="url" placeholder="Certificate URL (e.g., IPFS link)" name="certificateURI" value={newCropForm.certificateURI} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                
//                 {/* Changed input type to "file" and connected to handleFileChange */}
//                 <input type="file" name="image" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-lg" required />

//                 <div className="bg-neon-lime/10 border border-neon-lime/30 rounded-lg p-3">
//                   <p className="text-sm text-primary-green font-medium">💡 NFT Minting: Your crop will be tokenized for complete traceability.</p>
//                 </div>

//                 <div className="flex gap-2">
//                   <Button type="submit" size="sm">{t('listing.add')}</Button>
//                   <Button type="button" variant="secondary" size="sm" onClick={() => setShowAddForm(false)}>{t('common.cancel')}</Button>
//                 </div>
//               </form>
//             )}
//           </Card>
//         </div>


//         {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
//             {/* Close Button */}
//             <button
//               className="absolute top-2 right-2 text-gray-600"
//               onClick={() => setIsOpen(false)}
//             >
//               ✖
//             </button>

//             <h2 className="text-lg font-semibold mb-4">Scan this QR Code</h2>
            
//             {/* QR Code */}
//             <QRCodeCanvas value={qrValue} size={200} />
//           </div>
//         </div>
//       )}


//         {/* My Listings */}
//         <Card className="p-6 mt-8 animate-slide-in" style={{ animationDelay: '0.6s' }}>
//           <h3 className="font-poppins font-semibold text-xl mb-6 text-neutral-black">
//             My Active Listings
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {farmerListings.map((listing, index) => (
//               <Card
//                 key={listing.id}
//                 className="overflow-hidden"
//                 hover
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={listing.image}
//                     alt={listing.cropName}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute top-4 right-4">
//                     <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-green">
//                       {listing.grade}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-4">
//                   <h4 className="font-poppins font-semibold text-lg text-neutral-black mb-2">
//                     {listing.cropName}
//                   </h4>
//                   <p className="text-neutral-grey text-sm mb-2">{listing.quantity}</p>
//                   <p className="text-2xl font-bold text-primary-green mb-4">
//                     ₹{listing.pricePerKg}/kg
//                   </p>
//                   <div className="flex gap-2">
//                     <Button size="sm" variant="secondary">
//                       <Edit className="h-4 w-4 mr-1" />
//                       Edit
//                     </Button>
//                     <Button
//                       size="sm"
//                       variant="secondary"
//                       onClick={() => handleDelistCrop(listing.id)}
//                       className="text-red-600 hover:bg-red-50"
//                     >
//                       <Trash2 className="h-4 w-4 mr-1" />
//                       {t('listing.delist')}
//                     </Button>
//                     <Button size="sm" variant="primary"   onClick={() => setIsOpen(true)}>
//                       <Edit className="h-4 w-4 mr-1" />
//                       QR
//                     </Button>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </Card>

//         {/* Reviews */}
//         {farmerReviews.length > 0 && (
//           <Card className="mt-8 p-6 animate-slide-in" style={{ animationDelay: '0.8s' }}>
//             <h3 className="font-poppins font-semibold text-xl mb-6 text-neutral-black">
//               Recent Reviews
//             </h3>
//             <div className="space-y-4">
//               {farmerReviews.slice(0, 3).map((review) => (
//                 <div key={review.id} className="border-b border-neutral-grey/20 pb-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-medium text-neutral-black">{review.dealerName}</span>
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`h-4 w-4 ${
//                             i < review.rating ? 'text-primary-saffron fill-current' : 'text-neutral-grey'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                   <p className="text-neutral-grey text-sm">{review.comment}</p>
//                   <p className="text-xs text-neutral-grey mt-1">{review.date}</p>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FarmerDashboard;




import React, { useState, useContext } from 'react';
import { Plus, Package, Star, TrendingUp, Edit, Trash2, QrCode } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Chart from '../components/Chart';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import listingsData from '../data/listings.json';
import reviewsData from '../data/reviews.json';
import axios from 'axios';
import { NFTContext } from '../blockchain/cropContext';
import { QRCodeCanvas } from 'qrcode.react';

// Define an interface for the form's state for type safety
interface NewCropFormState {
  cropName: string;
  quality: string;
  pesticides: string;
  quantity: string;       // Keep as string for form inputs
  purchasePrice: string;  // Keep as string for form inputs
  certificateURI: string;
}

const FarmerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [listings, setListings] = useState(listingsData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // QR popup state
  const qrValue = "https://apple-supply-chain-j-eych.bolt.host/";

  const nftContext = useContext(NFTContext);
  if (!nftContext) {
    throw new Error("NFTContext must be used within an NFTProvider");
  }
  const { mintCrop, currentAccount } = nftContext;

  // Initialize the state for the new crop form
  const [newCropForm, setNewCropForm] = useState<NewCropFormState>({
    cropName: '',
    quality: 'Grade A',
    pesticides: '',
    quantity: '',
    purchasePrice: '',
    certificateURI: '',
  });

  // Image file state
  const [imageFile, setImageFile] = useState<File | null>(null);

  const farmerListings = listings.filter(listing => listing.isActive);
  const farmerReviews = reviewsData.filter(review =>
    farmerListings.some(listing => listing.id === review.listingId)
  );

  // Stats
  const stats = [
    { title: t('dashboard.earnings'), value: '₹3,45,000', icon: TrendingUp, change: '+12.5%', color: 'text-neon-lime', glow: true },
    { title: t('dashboard.listings'), value: farmerListings.length.toString(), icon: Package, change: '+3 this month', color: 'text-primary-green' },
    { title: t('dashboard.rating'), value: '4.5', icon: Star, change: '+0.2 this month', color: 'text-primary-saffron' },
    { title: t('dashboard.sales'), value: '12', icon: TrendingUp, change: '+8 this month', color: 'text-primary-blue' },
  ];
  const monthlyData = [
    { month: 'Sep', earnings: 25000 },
    { month: 'Oct', earnings: 35000 },
    { month: 'Nov', earnings: 42000 },
    { month: 'Dec', earnings: 48000 },
    { month: 'Jan', earnings: 52000 },
    { month: 'Feb', earnings: 45000 },
    { month: 'Mar', earnings: 58000 }
  ];

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCropForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentAccount) {
      alert("Please connect your wallet before minting.");
      return;
    }
    if (!imageFile) {
      alert("Please select an image for your crop.");
      return;
    }

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "NFT_Marketplace");

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dbvezos5j/image/upload`,
        formData
      );
      const imageUrl = cloudinaryRes.data.secure_url;

      // Mint crop NFT
      const tokenId = await mintCrop(
        currentAccount,
        newCropForm.cropName,
        newCropForm.quality,
        newCropForm.pesticides,
        Number(newCropForm.quantity),
        Number(newCropForm.purchasePrice),
        newCropForm.certificateURI,
        imageUrl
      );

      alert(`Successfully minted Crop NFT with Token ID: ${tokenId}`);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to mint NFT:", error);
      alert("Failed to mint NFT. Check the console for more details.");
    }
  };

  const handleDelistCrop = (listingId: string) => {
    setListings(prev =>
      prev.map(listing =>
        listing.id === listingId
          ? { ...listing, isActive: false }
          : listing
      )
    );
  };

  return (
    <div className="min-h-screen bg-neutral-grey/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="font-poppins font-bold text-3xl text-neutral-black mb-2">
            {t('dashboard.welcome')}, {user?.name}
          </h1>
          <p className="text-neutral-grey">Farmer Dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6 animate-slide-in" hover glow={stat.glow} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.glow ? 'bg-neon-lime/20' : 'bg-neutral-grey/10'}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="font-poppins font-semibold text-2xl text-neutral-black mb-1">{stat.value}</h3>
                <p className="text-neutral-grey text-sm mb-2">{stat.title}</p>
                <p className="text-primary-green text-xs font-medium">{stat.change}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Earnings Chart */}
          <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.4s' }}>
            <Chart data={monthlyData} dataKey="earnings" xAxisKey="month" title="Monthly Earnings" color="#39FF14" />
          </Card>

          {/* Add Listing Form */}
          <Card className="p-6 animate-slide-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-poppins font-semibold text-xl text-neutral-black">
                {t('dashboard.add.listing')}
              </h3>
              <Button onClick={() => setShowAddForm(!showAddForm)} variant="neon" size="sm">
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddListing} className="space-y-4">
                <input type="text" placeholder={t('listing.crop')} name="cropName" value={newCropForm.cropName} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                <select name="quality" value={newCropForm.quality} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                  <option value="Grade A">Grade A</option>
                  <option value="Premium">Premium</option>
                  <option value="Export Quality">Export Quality</option>
                  <option value="Organic">Organic</option>
                </select>
                <input type="text" placeholder="Pesticides Used (e.g., None, DDT)" name="pesticides" value={newCropForm.pesticides} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="number" placeholder="Quantity (in kg)" name="quantity" value={newCropForm.quantity} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="number" placeholder="Purchase Price (per kg)" name="purchasePrice" value={newCropForm.purchasePrice} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="url" placeholder="Certificate URL (e.g., IPFS link)" name="certificateURI" value={newCropForm.certificateURI} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                <input type="file" name="image" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-lg" required />

                <div className="bg-neon-lime/10 border border-neon-lime/30 rounded-lg p-3">
                  <p className="text-sm text-primary-green font-medium">💡 NFT Minting: Your crop will be tokenized for complete traceability.</p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" size="sm">{t('listing.add')}</Button>
                  <Button type="button" variant="secondary" size="sm" onClick={() => setShowAddForm(false)}>{t('common.cancel')}</Button>
                </div>
              </form>
            )}
          </Card>
        </div>

        {/* QR Popup */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
              <h2 className="text-lg font-semibold mb-4">Scan this QR Code</h2>
              <QRCodeCanvas value={qrValue} size={200} />
            </div>
          </div>
        )}

        {/* My Listings */}
        <Card className="p-6 mt-8 animate-slide-in" style={{ animationDelay: '0.6s' }}>
          <h3 className="font-poppins font-semibold text-xl mb-6 text-neutral-black">
            My Active Listings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerListings.map((listing, index) => (
              <Card
                key={listing.id}
                className="overflow-hidden"
                hover
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.cropName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-green">
                      {listing.grade}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-poppins font-semibold text-lg text-neutral-black mb-2">
                    {listing.cropName}
                  </h4>
                  <p className="text-neutral-grey text-sm mb-2">{listing.quantity}</p>
                  <p className="text-2xl font-bold text-primary-green mb-4">
                    ₹{listing.pricePerKg}/kg
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDelistCrop(listing.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {t('listing.delist')}
                    </Button>
                    <Button size="sm" variant="primary" onClick={() => setIsOpen(true)}>
                      <QrCode className="h-4 w-4 mr-1" />
                      QR
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Reviews */}
        {farmerReviews.length > 0 && (
          <Card className="mt-8 p-6 animate-slide-in" style={{ animationDelay: '0.8s' }}>
            <h3 className="font-poppins font-semibold text-xl mb-6 text-neutral-black">
              Recent Reviews
            </h3>
            <div className="space-y-4">
              {farmerReviews.slice(0, 3).map((review) => (
                <div key={review.id} className="border-b border-neutral-grey/20 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-neutral-black">{review.dealerName}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-primary-saffron fill-current' : 'text-neutral-grey'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-neutral-grey text-sm">{review.comment}</p>
                  <p className="text-xs text-neutral-grey mt-1">{review.date}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
