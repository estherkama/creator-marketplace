# Creator Marketplace

A platform connecting micro-influencers with businesses for affordable influencer marketing.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access (Creator, Business, Admin)
- **Campaign Management**: Businesses can create and manage marketing campaigns
- **Application System**: Creators can apply to campaigns with proposals
- **Role-based Dashboards**: Customized dashboards for different user types
- **Profile Management**: Detailed profiles for creators and businesses

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database with Sequelize ORM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React** with functional components and hooks
- **Material-UI (MUI)** for modern UI components
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## 📁 Project Structure

```
creator-marketplace/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── CreatorProfile.js
│   │   ├── BusinessProfile.js
│   │   ├── Campaign.js
│   │   ├── Application.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── campaigns.js
│   │   └── applications.js
│   ├── .env.example
│   ├── package.json
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Home/
│   │   │   └── Layout/
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your database credentials and JWT secret:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/creator_marketplace
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `GET /api/campaigns/:id` - Get single campaign
- `POST /api/campaigns` - Create campaign (Business only)
- `PUT /api/campaigns/:id` - Update campaign (Business owner only)
- `DELETE /api/campaigns/:id` - Delete campaign (Business owner only)
- `GET /api/campaigns/my/campaigns` - Get my campaigns (Business only)

### Applications
- `POST /api/applications` - Apply to campaign (Creator only)
- `GET /api/applications/my` - Get my applications (Creator only)
- `GET /api/applications/campaign/:campaignId` - Get applications for campaign (Business owner only)
- `PUT /api/applications/:id/status` - Update application status (Business owner only)
- `PUT /api/applications/:id/withdraw` - Withdraw application (Creator only)

## 🔐 User Roles

### Creator
- Browse and apply to campaigns
- Manage applications
- Update creator profile with portfolio and social media stats

### Business
- Create and manage campaigns
- Review creator applications
- Accept/reject applications
- Update business profile

### Admin (Future)
- Manage all users and campaigns
- Platform analytics
- Content moderation

## 🎯 Week 1 Milestones (COMPLETED)

- ✅ Project setup with Git repository
- ✅ Database schema design and models
- ✅ JWT authentication system
- ✅ User registration and login
- ✅ Role-based access control
- ✅ Basic API routes for auth, campaigns, and applications
- ✅ React frontend with routing
- ✅ Authentication context and protected routes
- ✅ Role-based dashboards for creators and businesses
- ✅ Modern UI with Material-UI components

## 🔄 Next Steps (Week 2+)

- [ ] Campaign browsing and filtering
- [ ] Application management interface
- [ ] Profile completion flows
- [ ] File upload for portfolios and images
- [ ] Email notifications
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced search and matching
- [ ] Analytics and reporting
- [ ] Mobile responsiveness improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@creatormarketplace.com or create an issue in this repository.