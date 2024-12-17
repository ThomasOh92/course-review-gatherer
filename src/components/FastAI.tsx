import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import Footer from './Footer';
import getBlogTheme from './mui-theme/getTheme';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { StyledCard, StyledCardContent, StyledTypography } from './helper-components/custom-styled-mui-components';


export default function FastAI() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [fastAIData, setfastAIData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const docRefs = [
        { ref: doc(db, "summarizedReviews", "FastAI"), setter: setfastAIData },
      ];

      const fetchDocs = docRefs.map(async ({ ref, setter }) => {
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
        setter(docSnap.data());
        }
      });

      await Promise.all(fetchDocs);
      } catch (error) {
      console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

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


  return (
    <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
    <CssBaseline enableColorScheme />
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 6, gap: 4 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Typography variant="h2" gutterBottom maxWidth='700px' align="center"> Fast AI: Practical Deep Learning for Coders </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper
              tabIndex={0}
              sx={{ height: '100%', maxWidth: 500 }}
            >
              <StyledCardContent
                sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
                }}
              >
                <div>
                <Typography variant="h6" component="div">
                  Summary
                </Typography>
                  <List sx={{ padding: 0, margin: 0 }}>
                  {fastAIData?.bulletPoints.map((point: string, index: number) => (
                    <ListItem key={index} sx={{ padding: 0, margin: 0 }}>
                    <ListItemText primary={`• ${point}`} />
                    </ListItem>
                  ))}
                  </List>
                <StyledTypography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
                >
                  {fastAIData ? fastAIData?.shortSummary : 'Loading...'}
                </StyledTypography>
                </div>
              </StyledCardContent>
            </Paper>
            <Paper
              tabIndex={0}
              sx={{ height: '100%', maxWidth: 500 }}
            >
              <StyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                  <Typography variant="h6" component="div">
                    Review Sources
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mb: 1 }}
                  >
                    {fastAIData ? fastAIData?.ReviewSourceDataNotes : 'Loading...'}
                  </StyledTypography>
                </StyledCardContent>
            </Paper>
          </Box>
          <Grid xs={12} md={6}>
              <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', alignItems: 'center' }}
              >
              
              {fastAIData?.keyQuotesAndRelevantLinks?.map((quote: any, index: number) => (
                <StyledCard key={index}>
                <StyledCardContent>
                  <Box >
                  <Typography variant="body2" color="textSecondary" sx={{mb: 1}}>
                    <strong>{quote.source}:</strong> {quote.quote}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <a href={quote.url} target="_blank" rel="noopener noreferrer">
                    {quote.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]}
                    </a>
                  </Typography>
                  </Box>
                </StyledCardContent>
                </StyledCard>
              )) || 'No data available'}
                  </Box>
          </Grid>
          </Box>
      </Box>
      <Footer />
      </Container>
        
    </ThemeProvider>  
  );
}
