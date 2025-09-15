import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import { Campaign, People, TrendingUp, Assignment } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusinessDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalApplications: 0,
    completedCampaigns: 0,
  });
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/campaigns/my/campaigns');
      const campaigns = response.data.data.campaigns;
      
      setRecentCampaigns(campaigns.slice(0, 5));
      
      const totalApplications = campaigns.reduce((sum, campaign) => 
        sum + (campaign.applications?.length || 0), 0
      );
      
      setStats({
        totalCampaigns: campaigns.length,
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
        totalApplications,
        completedCampaigns: campaigns.filter(c => c.status === 'completed').length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'info';
      case 'draft':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          borderColor: `${color}.main`,
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography 
              color="text.secondary" 
              gutterBottom 
              variant="body2"
              sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1 }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ fontWeight: 700, color: 'text.primary' }}
            >
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: `${color}.main`,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {React.cloneElement(icon, { sx: { fontSize: 28 } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading dashboard...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            Welcome back, {user?.firstName}! 👋
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Here's your business dashboard overview
          </Typography>
        </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Campaigns"
            value={stats.totalCampaigns}
            icon={<Campaign />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Campaigns"
            value={stats.activeCampaigns}
            icon={<TrendingUp />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Applications Received"
            value={stats.totalApplications}
            icon={<People />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={stats.completedCampaigns}
            icon={<Assignment />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Recent Campaigns */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Campaigns
              </Typography>
              
              {recentCampaigns.length === 0 ? (
                <Box textAlign="center" py={3}>
                  <Typography color="textSecondary">
                    No campaigns yet. Create your first campaign to get started!
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/business/campaigns/create')}
                  >
                    Create Campaign
                  </Button>
                </Box>
              ) : (
                <Box>
                  {recentCampaigns.map((campaign) => (
                    <Box
                      key={campaign.id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: 2,
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle1">
                          {campaign.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {campaign.applications?.length || 0} applications • 
                          Budget: ${campaign.budget}
                        </Typography>
                      </Box>
                      <Chip
                        label={campaign.status}
                        color={getStatusColor(campaign.status)}
                        size="small"
                      />
                    </Box>
                  ))}
                  
                  <Box textAlign="center" mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/business/campaigns')}
                    >
                      View All Campaigns
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate('/business/campaigns/create')}
                >
                  Create Campaign
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/business/campaigns')}
                >
                  Manage Campaigns
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/profile')}
                >
                  Update Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default BusinessDashboard;
