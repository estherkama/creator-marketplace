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
import { TrendingUp, Campaign, Assignment, Star } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalApplications: 0,
    acceptedApplications: 0,
    pendingApplications: 0,
    completedCampaigns: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/applications/my');
      const applications = response.data.data.applications;
      
      setRecentApplications(applications.slice(0, 5));
      
      setStats({
        totalApplications: applications.length,
        acceptedApplications: applications.filter(app => app.status === 'accepted').length,
        pendingApplications: applications.filter(app => app.status === 'pending').length,
        completedCampaigns: applications.filter(app => app.status === 'accepted').length, // Simplified for now
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
        return 'warning';
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
            Welcome back, {user?.firstName}! 🎨
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Here's your creator dashboard overview
          </Typography>
        </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Applications"
            value={stats.totalApplications}
            icon={<Assignment />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Accepted"
            value={stats.acceptedApplications}
            icon={<Star />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={stats.pendingApplications}
            icon={<TrendingUp />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={stats.completedCampaigns}
            icon={<Campaign />}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Applications
              </Typography>
              
              {recentApplications.length === 0 ? (
                <Box textAlign="center" py={3}>
                  <Typography color="textSecondary">
                    No applications yet. Start by browsing available campaigns!
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/campaigns')}
                  >
                    Browse Campaigns
                  </Button>
                </Box>
              ) : (
                <Box>
                  {recentApplications.map((application) => (
                    <Box
                      key={application.id}
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
                          {application.campaign.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Applied on {new Date(application.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                        size="small"
                      />
                    </Box>
                  ))}
                  
                  <Box textAlign="center" mt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/creator/applications')}
                    >
                      View All Applications
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
                  onClick={() => navigate('/campaigns')}
                >
                  Browse Campaigns
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/profile')}
                >
                  Update Profile
                </Button>
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/creator/applications')}
                >
                  My Applications
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

export default CreatorDashboard;
