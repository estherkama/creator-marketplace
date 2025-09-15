const express = require('express');
const { Application, Campaign, User, CreatorProfile } = require('../models');
const { verifyToken, requireRole } = require('../middleware/auth');
const { validateApplication } = require('../middleware/validation');

const router = express.Router();

// Apply to campaign (creator only)
router.post('/', verifyToken, requireRole('creator'), validateApplication, async (req, res) => {
  try {
    const { campaignId, proposedRate, message, portfolio } = req.body;

    // Check if campaign exists and is active
    const campaign = await Campaign.findOne({
      where: { id: campaignId, status: 'active' },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found or not active',
      });
    }

    // Check if application deadline has passed
    if (new Date() > campaign.applicationDeadline) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed',
      });
    }

    // Check if creator already applied
    const existingApplication = await Application.findOne({
      where: {
        campaignId,
        creatorId: req.user.id,
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied to this campaign',
      });
    }

    // Create application
    const application = await Application.create({
      campaignId,
      creatorId: req.user.id,
      proposedRate,
      message,
      portfolio,
    });

    // Update campaign application count
    await campaign.increment('applicationCount');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: { application },
    });
  } catch (error) {
    console.error('Application creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error submitting application',
    });
  }
});

// Get my applications (creator only)
router.get('/my', verifyToken, requireRole('creator'), async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { creatorId: req.user.id },
      include: [
        {
          model: Campaign,
          as: 'campaign',
          include: [
            {
              model: User,
              as: 'business',
              attributes: ['id', 'firstName', 'lastName'],
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: { applications },
    });
  } catch (error) {
    console.error('My applications fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching your applications',
    });
  }
});

// Get applications for campaign (business owner only)
router.get('/campaign/:campaignId', verifyToken, requireRole('business'), async (req, res) => {
  try {
    const { campaignId } = req.params;

    // Verify campaign ownership
    const campaign = await Campaign.findOne({
      where: {
        id: campaignId,
        businessId: req.user.id,
      },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found or unauthorized',
      });
    }

    const applications = await Application.findAll({
      where: { campaignId },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'firstName', 'lastName', 'profileImage'],
          include: [
            {
              model: CreatorProfile,
              as: 'creatorProfile',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json({
      success: true,
      data: { applications },
    });
  } catch (error) {
    console.error('Campaign applications fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching applications',
    });
  }
});

// Update application status (business owner only)
router.put('/:id/status', verifyToken, requireRole('business'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, businessFeedback } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be accepted or rejected',
      });
    }

    const application = await Application.findByPk(id, {
      include: [
        {
          model: Campaign,
          as: 'campaign',
          where: { businessId: req.user.id },
        },
      ],
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or unauthorized',
      });
    }

    await application.update({
      status,
      businessFeedback,
      reviewedAt: new Date(),
      reviewedBy: req.user.id,
    });

    // If accepted, add creator to campaign's selected creators
    if (status === 'accepted') {
      const campaign = application.campaign;
      const selectedCreators = campaign.selectedCreators || [];
      if (!selectedCreators.includes(application.creatorId)) {
        selectedCreators.push(application.creatorId);
        await campaign.update({ selectedCreators });
      }
    }

    res.json({
      success: true,
      message: `Application ${status} successfully`,
      data: { application },
    });
  } catch (error) {
    console.error('Application status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating application status',
    });
  }
});

// Withdraw application (creator only)
router.put('/:id/withdraw', verifyToken, requireRole('creator'), async (req, res) => {
  try {
    const application = await Application.findOne({
      where: {
        id: req.params.id,
        creatorId: req.user.id,
        status: 'pending',
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found or cannot be withdrawn',
      });
    }

    await application.update({ status: 'withdrawn' });

    res.json({
      success: true,
      message: 'Application withdrawn successfully',
      data: { application },
    });
  } catch (error) {
    console.error('Application withdrawal error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error withdrawing application',
    });
  }
});

module.exports = router;
