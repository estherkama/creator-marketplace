const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CreatorProfile = sequelize.define('CreatorProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  niche: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 100],
    },
  },
  socialMediaHandles: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    // Structure: { instagram: '@handle', tiktok: '@handle', youtube: 'channel_url', etc. }
  },
  followerCounts: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    // Structure: { instagram: 1000, tiktok: 5000, youtube: 500, etc. }
  },
  engagementRates: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    // Structure: { instagram: 3.5, tiktok: 8.2, youtube: 2.1, etc. }
  },
  contentCategories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: [],
    // Array of categories: ['fashion', 'lifestyle', 'tech', etc.]
  },
  averageRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  portfolio: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: [],
    // Array of portfolio items with URLs and descriptions
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 5,
    },
  },
  completedCampaigns: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

module.exports = CreatorProfile;
