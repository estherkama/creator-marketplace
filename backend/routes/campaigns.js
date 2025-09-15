const express = require('express');
const { Campaign, User, Application } = require('../models');
const { verifyToken, requireRole } = require('../middleware/auth');
const { validateCampaign } = require('../middleware/validation');

const router = express.Router();

// Get all campaigns (public)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status = 'active' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { status };
    if (category) {
      whereClause.category = category;
    }

    const campaigns = await Campaign.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'business',
          attributes: ['id', 'firstName', 'lastName'],
          include: [
            {
              model: require('../models').BusinessProfile,
              as: 'businessProfile',
              attributes: ['companyName', 'logo'],
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        campaigns: campaigns.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(campaigns.count / limit),
          totalItems: campaigns.count,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    console.error('Campaigns fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching campaigns',
    });
  }
});

// Get single campaign
router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'business',
          attributes: ['id', 'firstName', 'lastName'],
          include: [
            {
              model: require('../models').BusinessProfile,
              as: 'businessProfile',
              attributes: ['companyName', 'logo', 'rating'],
            },
          ],
        },
      ],
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found',
      });
    }

    res.json({
      success: true,
      data: { campaign },
    });
  } catch (error) {
    console.error('Campaign fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching campaign',
    });
  }
});

// Create campaign (business only)
router.post('/', verifyToken, requireRole('business'), validateCampaign, async (req, res) => {
  try {
    const campaignData = {
      ...req.body,
      businessId: req.user.id,
    };

    const campaign = await Campaign.create(campaignData);

    res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      data: { campaign },
    });
  } catch (error) {
    console.error('Campaign creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating campaign',
    });
  }
});

// Update campaign (business owner only)
router.put('/:id', verifyToken, requireRole('business'), async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      where: {
        id: req.params.id,
        businessId: req.user.id,
      },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found or unauthorized',
      });
    }

    await campaign.update(req.body);

    res.json({
      success: true,
      message: 'Campaign updated successfully',
      data: { campaign },
    });
  } catch (error) {
    console.error('Campaign update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating campaign',
    });
  }
});

// Delete campaign (business owner only)
router.delete('/:id', verifyToken, requireRole('business'), async (req, res) => {
  try {
    const campaign = await Campaign.findOne({
      where: {
        id: req.params.id,
        businessId: req.user.id,
      },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found or unauthorized',
      });
    }

    await campaign.destroy();

    res.json({
      success: true,
      message: 'Campaign deleted successfully',
    });
  } catch (error) {
    console.error('Campaign deletion error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting campaign',
    });
  }
});

// Get my campaigns (business only)
router.get('/my/campaigns', verifyToken, requireRole('business'), async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      where: { businessId: req.user.id },
      include: [
        {
          model: Application,
          as: 'applications',
          include: [
            {
              model: User,
              as: 'creator',
              attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: { campaigns },
    });
  } catch (error) {
    console.error('My campaigns fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching your campaigns',
    });
  }
});

module.exports = router;
