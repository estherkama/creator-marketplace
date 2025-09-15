const sequelize = require('../config/database');
const User = require('./User');
const CreatorProfile = require('./CreatorProfile');
const BusinessProfile = require('./BusinessProfile');
const Campaign = require('./Campaign');
const Application = require('./Application');

// Define associations
User.hasOne(CreatorProfile, {
  foreignKey: 'userId',
  as: 'creatorProfile',
  onDelete: 'CASCADE',
});

User.hasOne(BusinessProfile, {
  foreignKey: 'userId',
  as: 'businessProfile',
  onDelete: 'CASCADE',
});

CreatorProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

BusinessProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// Campaign associations
User.hasMany(Campaign, {
  foreignKey: 'businessId',
  as: 'campaigns',
  onDelete: 'CASCADE',
});

Campaign.belongsTo(User, {
  foreignKey: 'businessId',
  as: 'business',
});

// Application associations
Campaign.hasMany(Application, {
  foreignKey: 'campaignId',
  as: 'applications',
  onDelete: 'CASCADE',
});

User.hasMany(Application, {
  foreignKey: 'creatorId',
  as: 'applications',
  onDelete: 'CASCADE',
});

Application.belongsTo(Campaign, {
  foreignKey: 'campaignId',
  as: 'campaign',
});

Application.belongsTo(User, {
  foreignKey: 'creatorId',
  as: 'creator',
});

Application.belongsTo(User, {
  foreignKey: 'reviewedBy',
  as: 'reviewer',
});

module.exports = {
  sequelize,
  User,
  CreatorProfile,
  BusinessProfile,
  Campaign,
  Application,
};
