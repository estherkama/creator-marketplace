import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
} from '@mui/material';
import {
  People as PeopleIcon,
  Campaign as CampaignIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCreators: 0,
    totalBusinesses: 0,
    totalCampaigns: 0,
    totalApplications: 0,
    activeUsers: 0,
  });

  const [recentUsers, setRecentUsers] = useState([]);
  const [recentCampaigns, setRecentCampaigns] = useState([]);

  useEffect(() => {
    // Mock data for now - replace with actual API calls
    setStats({
      totalUsers: 156,
      totalCreators: 89,
      totalBusinesses: 67,
      totalCampaigns: 34,
      totalApplications: 127,
      activeUsers: 23,
    });

    setRecentUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'creator', createdAt: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'business', createdAt: '2024-01-14' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'creator', createdAt: '2024-01-13' },
    ]);

    setRecentCampaigns([
      { id: 1, title: 'Summer Fashion Campaign', business: 'Fashion Co.', status: 'active', budget: 5000 },
      { id: 2, title: 'Tech Product Launch', business: 'Tech Corp', status: 'pending', budget: 8000 },
      { id: 3, title: 'Food Brand Promotion', business: 'Food Inc.', status: 'completed', budget: 3000 },
    ]);

    setLoading(false);
  }, []);

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

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'business':
        return 'primary';
      case 'creator':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography>Loading admin dashboard...</Typography>
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
            Admin Dashboard 🛠️
          </Typography>
          
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Welcome, {user?.firstName}! Manage your platform overview
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={2}>
            <StatCard
              title="Total Users"
              value={stats.totalUsers}
              icon={<PeopleIcon />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <StatCard
              title="Creators"
              value={stats.totalCreators}
              icon={<PeopleIcon />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <StatCard
              title="Businesses"
              value={stats.totalBusinesses}
              icon={<PeopleIcon />}
              color="info"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <StatCard
              title="Campaigns"
              value={stats.totalCampaigns}
              icon={<CampaignIcon />}
              color="warning"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <StatCard
              title="Applications"
              value={stats.totalApplications}
              icon={<AssignmentIcon />}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <StatCard
              title="Active Now"
              value={stats.activeUsers}
              icon={<TrendingUpIcon />}
              color="error"
            />
          </Grid>
        </Grid>

        {/* Recent Users */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Recent Users
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Joined</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {user.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {user.email}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={user.role} 
                              size="small" 
                              color={getRoleColor(user.role)}
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Campaigns */}
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Recent Campaigns
                  </Typography>
                  <Button variant="outlined" size="small">
                    View All
                  </Button>
                </Box>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Campaign</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Budget</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {campaign.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                by {campaign.business}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={campaign.status} 
                              size="small" 
                              color={getStatusColor(campaign.status)}
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              ${campaign.budget.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton size="small">
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Card>
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
              <Button variant="contained" startIcon={<PeopleIcon />}>
                Manage Users
              </Button>
              <Button variant="contained" startIcon={<CampaignIcon />}>
                Review Campaigns
              </Button>
              <Button variant="contained" startIcon={<AssignmentIcon />}>
                View Applications
              </Button>
              <Button variant="outlined">
                System Settings
              </Button>
              <Button variant="outlined">
                Generate Reports
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
