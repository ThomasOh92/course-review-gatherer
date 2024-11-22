import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import Footer from './mui-blog-template/components/Footer';
import getBlogTheme from './mui-blog-template/theme/getBlogTheme';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function IndividualCourse() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  
  const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: 700,
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
      outlineOffset: '2px',
    },
  }));

  const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
      paddingBottom: 16,
    },
  });

  const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });


  return (
      <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 6, gap: 4 }}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        <Typography variant="h1" gutterBottom maxWidth='700px' align="center"> Fast AI: Practical Deep Learning for Coders </Typography>
          <StyledCard>
          <StyledCardContent>
            <StyledTypography variant="h5">
            Short summary
            </StyledTypography>
            <Typography variant="body2" color="textSecondary">
            -- What the course is about, what it generally covers
            </Typography>
            <Typography variant="body2" color="textSecondary">
            -- Why it is good: ... recommended by Reddit, developers,
            </Typography>
            <Typography variant="body2" color="textSecondary">
            -- Negative aspects about it: ....
            </Typography>
          </StyledCardContent>
          </StyledCard>

          <StyledCard>
          <StyledCardContent>
            <StyledTypography variant="h5">
            Reviews to take a closer look at
            </StyledTypography>
            <Typography variant="body2" color="textSecondary">
            --... e.g. one super long reddit post
            </Typography>
            <Typography variant="body2" color="textSecondary">
            --.. e.g. two youtube videos
            </Typography>
          </StyledCardContent>
          </StyledCard>

          <StyledCard>
          <StyledCardContent>
            <StyledTypography variant="h5">
            Suitability for me: I am a "business person" / I am a "developer looking to..."
            </StyledTypography>
            <Typography variant="body2" color="textSecondary">
            -- ...
            </Typography>
            <Typography variant="body2" color="textSecondary">
            -- ...
            </Typography>
          </StyledCardContent>
          </StyledCard>

          <StyledCard>
          <StyledCardContent>
            <StyledTypography variant="h5">
            Research Summary
            </StyledTypography>
            <Typography variant="body2" color="textSecondary">
            - Reviewed 20 sources from Reddit that said this...
            </Typography>
            <Typography variant="body2" color="textSecondary">
            - Reviewed 90 sources from youtube that said this
            </Typography>
            <Typography variant="body2" color="textSecondary">
            - Reviewed 5 youtube videos
            </Typography>
          </StyledCardContent>
          </StyledCard>
        </Box>
        <Footer />
        </Container>
      </ThemeProvider>
      
  );
}
