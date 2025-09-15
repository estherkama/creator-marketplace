const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BusinessProfile = sequelize.define('BusinessProfile', {
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
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
    },
  },
  industry: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 50],
    },
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  companySize: {
    type: DataTypes.ENUM('startup', 'small', 'medium', 'large', 'enterprise'),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  contactPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {},
    // Structure: { street, city, state, country, zipCode }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  totalCampaigns: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 5,
    },
  },
}, {
  timestamps: true,
});

module.exports = BusinessProfile;
