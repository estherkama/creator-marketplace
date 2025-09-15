import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
} from '@mui/material';
import { Campaign, People, TrendingUp, Star } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Campaign sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Browse Campaigns',
      description: 'Discover exciting brand collaboration opportunities tailored to your niche and audience.',
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Connect with Creators',
      description: 'Find authentic micro-influencers who align with your brand values and target audience.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Grow Your Business',
      description: 'Scale your marketing efforts with cost-effective influencer partnerships.',
    },
    {
      icon: <Star sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Build Your Portfolio',
      description: 'Showcase your work and build lasting relationships with brands you love.',
    },
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (user?.role === 'creator') {
        navigate('/creator/dashboard');
      } else if (user?.role === 'business') {
        navigate('/business/dashboard');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(45deg, #ffffff 30%, #f1f5f9 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Creator Marketplace
          </Typography>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              mb: 6, 
              fontWeight: 400,
              opacity: 0.95,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Connecting micro-influencers with businesses for authentic, affordable marketing
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: 'grey.50',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Why Choose Creator Marketplace?
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}
            >
              The platform that makes influencer marketing accessible for everyone
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 6 },
              alignItems: 'stretch',
              justifyContent: 'center'
            }}
          >
            {features.map((feature, index) => (
              <Box 
                key={index}
                sx={{ 
                  flex: '1',
                  maxWidth: { xs: '100%', md: '280px' },
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    p: 5,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 4,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, ${index % 2 === 0 ? '#6366f1' : '#8b5cf6'} 0%, ${index % 2 === 0 ? '#8b5cf6' : '#6366f1'} 100%)`,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.4s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                      borderColor: 'primary.main',
                      '&::before': {
                        transform: 'scaleX(1)',
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box 
                      sx={{ 
                        mb: 4,
                        p: 3,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${index % 2 === 0 ? '#6366f1' : '#8b5cf6'} 0%, ${index % 2 === 0 ? '#8b5cf6' : '#6366f1'} 100%)`,
                        display: 'inline-flex',
                        color: 'white',
                        mx: 'auto',
                        boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
                      }}
                    >
                      {React.cloneElement(feature.icon, { sx: { fontSize: 36 } })}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom
                      sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.7,
                        fontSize: '1.1rem',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Sections */}
      <Box sx={{ backgroundColor: 'background.default', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%', 
                  p: 6,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)',
                  }
                }}
              >
                <CardContent sx={{ p: 0, position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    gutterBottom 
                    sx={{ fontWeight: 700, mb: 3 }}
                  >
                    For Creators
                  </Typography>
                  <Typography variant="h6" paragraph sx={{ opacity: 0.95, mb: 4 }}>
                    Turn your social media presence into a revenue stream. Apply to campaigns
                    that match your style and audience, build your portfolio, and grow your
                    personal brand.
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    {[
                      'Flexible campaign opportunities',
                      'Fair compensation rates', 
                      'Build lasting brand relationships',
                      'Showcase your creativity'
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box 
                          sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            backgroundColor: 'secondary.main',
                            mr: 2 
                          }} 
                        />
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 0 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'grey.100',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => navigate('/register')}
                  >
                    Join as Creator
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card 
                sx={{ 
                  height: '100%', 
                  p: 6,
                  background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100px',
                    height: '100px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    transform: 'translate(30px, -30px)',
                  }
                }}
              >
                <CardContent sx={{ p: 0, position: 'relative', zIndex: 1 }}>
                  <Typography 
                    variant="h3" 
                    component="h3" 
                    gutterBottom 
                    sx={{ fontWeight: 700, mb: 3 }}
                  >
                    For Businesses
                  </Typography>
                  <Typography variant="h6" paragraph sx={{ opacity: 0.95, mb: 4 }}>
                    Reach your target audience through authentic micro-influencer partnerships.
                    Create campaigns, review applications, and work with creators who truly
                    connect with your brand.
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    {[
                      'Cost-effective marketing solutions',
                      'Authentic brand advocacy',
                      'Easy campaign management', 
                      'Measurable results'
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box 
                          sx={{ 
                            width: 6, 
                            height: 6, 
                            borderRadius: '50%', 
                            backgroundColor: 'white',
                            mr: 2 
                          }} 
                        />
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 0 }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'white',
                      color: 'secondary.main',
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'grey.100',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => navigate('/register')}
                  >
                    Join as Business
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph>
          Join thousands of creators and businesses already using Creator Marketplace
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{ mr: 2 }}
            onClick={handleGetStarted}
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Sign Up Now'}
          </Button>
          {!isAuthenticated && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
