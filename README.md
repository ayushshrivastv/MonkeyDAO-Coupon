# DealCoin - NFT Deal Marketplace

A revolutionary Groupon-style marketplace where deals are NFTs on the Solana blockchain. Own, trade, and redeem exclusive discounts as digital assets.

## 🌟 Features

### For Users
- **Browse Deals**: Discover amazing NFT deals across multiple categories
- **Own Digital Assets**: Purchase deals as tradeable NFT coupons
- **Wallet Integration**: Seamless Solana wallet connection (Phantom, Solflare)
- **Redeem Coupons**: Use your NFT coupons for real discounts
- **Trade Deals**: Buy and sell deals on secondary markets

### For Merchants
- **Create Deals**: Mint NFT coupons with custom discounts and terms
- **Dashboard Analytics**: Track sales, redemptions, and performance
- **Flexible Terms**: Set expiry dates, redemption limits, and categories
- **Blockchain Security**: Fraud-proof deals with smart contract validation

## 🏗️ Architecture

### Frontend (Next.js 16)
- **Framework**: Next.js 16.0.0 with Turbopack
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Solana Web3.js + Anchor framework
- **State Management**: TanStack React Query
- **UI Components**: Custom components with Lucide React icons

### Smart Contract (Anchor/Rust)
- **Program ID**: `55aFX7zaqURizkrxJc2HdtKrdpqLo5Vin6Qpo2gFXzMF`
- **Token Standard**: Metaplex NFTs with custom metadata
- **Features**: Merchant registration, coupon creation, redemption tracking
- **Security**: PDA-based account management, expiry validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Solana CLI tools
- Anchor framework
- A Solana wallet (Phantom recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayushshrivastv/MonkeyDAO.git
   cd MonkeyDAO
   ```

2. **Install dependencies**
   ```bash
   # Root project
   npm install
   
   # Frontend
   cd Frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   cd Frontend
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Smart Contract Development

1. **Build the program**
   ```bash
   anchor build
   ```

2. **Deploy to devnet**
   ```bash
   anchor deploy
   ```

3. **Run tests**
   ```bash
   anchor test
   ```

## 📱 Pages & Components

### Core Pages
- **Homepage** (`/`) - Hero section, categories, featured deals
- **Deals** (`/deals`) - Filterable marketplace of all deals
- **Merchant Dashboard** (`/merchant`) - Create and manage deals
- **My Coupons** (`/my-coupons`) - User's owned NFT coupons

### Key Components
- **WalletProvider** - Solana wallet integration
- **Navbar** - Responsive navigation with search
- **HeroSection** - Groupon-style landing with animations
- **CategoryGrid** - Deal categories with hover effects
- **FeaturedDeals** - Showcase of popular deals
- **DealsGrid** - Filterable deal listings
- **MerchantDashboard** - Deal creation and analytics
- **CreateDealModal** - NFT coupon creation form

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`#0ea5e9` to `#0284c7`)
- **Secondary**: Purple gradient (`#d946ef` to `#c026d3`)
- **Success**: Green (`#22c55e`)
- **Warning**: Orange (`#f59e0b`)
- **Error**: Red (`#ef4444`)

### Typography
- **Primary**: Geist Sans
- **Monospace**: Geist Mono
- **Headings**: Bold, large scale
- **Body**: Regular, readable scale

### Components
- **Rounded corners**: 12px-24px border radius
- **Shadows**: Layered elevation system
- **Animations**: Smooth transitions and hover states
- **Responsive**: Mobile-first breakpoints

## 🔧 Smart Contract Integration

### Core Instructions
```rust
// Initialize merchant account
initialize_merchant(business_name: String)

// Create NFT coupon deal
create_coupon(
    title: String,
    description: String,
    discount_percentage: u8,
    expiry_date: i64,
    category: CouponCategory,
    max_redemptions: u8,
    metadata_uri: String
)

// Redeem coupon (burns NFT)
redeem_coupon()

// Update coupon status
update_coupon_status(is_active: bool)
```

### Account Structure
```rust
// Merchant PDA: ["merchant", authority]
pub struct Merchant {
    pub authority: Pubkey,
    pub business_name: String,
    pub total_coupons_created: u64,
    pub bump: u8,
}

// Coupon PDA: ["coupon", nft_mint]
pub struct CouponData {
    pub mint: Pubkey,
    pub merchant: Pubkey,
    pub discount_percentage: u8,
    pub expiry_date: i64,
    pub category: CouponCategory,
    pub redemptions_remaining: u8,
    pub max_redemptions: u8,
    pub is_active: bool,
    pub bump: u8,
}
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)
```bash
cd Frontend
npm run build
npm run start
```

### Smart Contract (Solana Devnet/Mainnet)
```bash
anchor build
anchor deploy --provider.cluster devnet
```

## 🛠️ Development

### Project Structure
```
MonkeyDAO/
├── Frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js 13+ app directory
│   │   ├── components/      # React components
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── programs/               # Anchor smart contracts
│   └── NFTCoupon/         # Main program
├── tests/                 # Smart contract tests
└── package.json          # Root project config
```

### Key Technologies
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Blockchain**: Solana, Anchor, Rust
- **Wallet**: @solana/wallet-adapter-react
- **State**: TanStack React Query
- **Styling**: Tailwind CSS, Lucide React
- **Build**: Turbopack, PostCSS, Autoprefixer

## 📊 Features Roadmap

### Phase 1 (Current) ✅
- [x] Basic marketplace UI
- [x] Wallet integration
- [x] Smart contract foundation
- [x] Deal creation and redemption
- [x] Merchant dashboard

### Phase 2 (Next)
- [ ] Real blockchain integration
- [ ] IPFS metadata storage
- [ ] Payment processing
- [ ] Advanced filtering
- [ ] Deal trading marketplace

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Push notifications
- [ ] Analytics dashboard
- [ ] Multi-chain support
- [ ] DAO governance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ayush Srivastava**
- GitHub: [@ayushshrivastv](https://github.com/ayushshrivastv)
- Project: [MonkeyDAO](https://github.com/ayushshrivastv/MonkeyDAO)

## 🙏 Acknowledgments

- Solana Foundation for blockchain infrastructure
- Anchor framework for smart contract development
- Next.js team for the amazing React framework
- Tailwind CSS for the utility-first styling approach
- Groupon for UI/UX inspiration

---

**Built with ❤️ on Solana blockchain**
