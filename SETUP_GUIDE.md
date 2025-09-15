# Creator Marketplace - Setup Guide

## Quick Start Instructions

### 1. Database Setup (Render PostgreSQL)

Since you're using Render PostgreSQL, follow these steps:

#### Get Your Render PostgreSQL Connection Details
1. Go to your Render Dashboard
2. Navigate to your PostgreSQL service
3. Copy the **External Database URL** (it looks like this):
   ```
   postgresql://username:password@dpg-xxxxxxxxx-a.oregon-postgres.render.com/database_name
   ```

#### Alternative: Get Individual Connection Details
If you prefer individual settings, get these from your Render PostgreSQL dashboard:
- **Host**: `dpg-xxxxxxxxx-a.oregon-postgres.render.com`
- **Database**: `your_database_name`
- **Username**: `your_username` 
- **Password**: `your_password`
- **Port**: `5432`

### 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Copy environment file:
```bash
copy .env.example .env
```

3. Edit `.env` file with your Render PostgreSQL credentials:

**Option A: Using Database URL (Recommended)**
```env
# Database Configuration - Render PostgreSQL
DATABASE_URL=postgresql://username:password@dpg-xxxxxxxxx-a.oregon-postgres.render.com/database_name

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Option B: Using Individual Settings**
```env
# Database Configuration - Individual Settings
DB_HOST=dpg-xxxxxxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

4. Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup

1. Open a new terminal and navigate to frontend:
```bash
cd frontend
```

2. Start the frontend:
```bash
npm start
```

## Testing the Application

1. Backend should be running on http://localhost:5000
2. Frontend should be running on http://localhost:3000
3. Test the health endpoint: http://localhost:5000/api/health

## Default Test Users

After the database is set up, you can register test users:

### Creator Account
- Email: creator@test.com
- Password: password123
- Role: Content Creator

### Business Account
- Email: business@test.com
- Password: password123
- Role: Business Owner

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database name exists

### Port Issues
- Backend default: 5000
- Frontend default: 3000
- Change ports in respective package.json if needed

### Dependencies Issues
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

## Next Steps After Setup

1. Register as both a creator and business user
2. Create a test campaign as a business user
3. Apply to the campaign as a creator
4. Test the dashboard functionality

## Week 1 MVP Features Completed ✅

- User authentication and registration
- Role-based access control
- Campaign creation and management
- Application system
- Creator and Business dashboards
- Modern React UI with Material-UI
- Complete API with validation and error handling
