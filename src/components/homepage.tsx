import * as React from 'react';
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import Footer from './Footer';
import getBlogTheme from './mui-theme/getTheme';
import SuggestCourse from './helper-components/for-homepage/suggest-course';
import PeopleHelped from './helper-components/for-homepage/people-helped';
import HomepageSummaryCard from './helper-components/for-homepage/homepage-summary-card';
import HomepageComingSoon from './helper-components/for-homepage/hompage-coming-soon';

export default function HomePage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const [cs50Data, setCS50Data] = useState<any>(null);
  const [googleAIEssentialsData, setGoogleAIEssentialsData] = useState<any>(null);
  const [GenAINanoDegreeUdacityData, setGenAINanoDegreeUdacityData] = useState<any>(null);
  const [fastAIData, setfastAIData] = useState<any>(null);

  const comingSoonTitles = ['CS50', 'Google AI Essentials', 'Gen AI Nano Degree Udacity'];

  
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


  useEffect(() => {
    const fetchData = async () => {
      try {
      const docRefs = [
        { ref: doc(db, "summarizedReviews", "CS50"), setter: setCS50Data },
        { ref: doc(db, "summarizedReviews", "GoogleAIEssentials"), setter: setGoogleAIEssentialsData },
        { ref: doc(db, "summarizedReviews", "GenAINanoDegreeUdacity"), setter: setGenAINanoDegreeUdacityData },
        { ref: doc(db, "summarizedReviews", "FastAI"), setter: setfastAIData },
      ];

      const fetchDocs = docRefs.map(async ({ ref, setter }) => {
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
        setter(docSnap);
        }
      });

      await Promise.all(fetchDocs);
      } catch (error) {
      console.error('Error fetching data: ', error);
      }
    };

    fetchData();
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
            <Typography variant="h1" > Course Review Collector </Typography>
            <Typography variant="subtitle1" gutterBottom >Deciding whether to start an online course? We collect and analyze reviews from unique sources</Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
              {/* Left Hand Column */}
              <Box>
                <SuggestCourse />
                <PeopleHelped />
              </Box>
              {/* Right Hand Column */}
              <Grid xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%', alignItems: 'center' }}>
                  <HomepageSummaryCard
                    data={fastAIData}
                  />
                  {comingSoonTitles.map((title, index) => (
                    <HomepageComingSoon key={index} title={title} />
                  ))}
                </Box>
              </Grid>
            </Box>
          </Box>
        </Container>
        <Footer />
      </ThemeProvider>
  );
}
