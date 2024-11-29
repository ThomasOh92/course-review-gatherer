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
import { useState, useEffect } from 'react';
import { collection, doc, addDoc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebaseconfig';


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
              Curriculum Summary
              </StyledTypography>
              <Typography variant="body2" color="textSecondary">
              {fastAIData?.curriculumSummary?.firstHalf || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              {fastAIData?.curriculumSummary?.secondHalf || 'No data available'}
              </Typography>
            </StyledCardContent>
            </StyledCard>

            <StyledCard>
            <StyledCardContent>
              <StyledTypography variant="h5">
              Recommendations for Prospective Learners
              </StyledTypography>
              {fastAIData?.recommendationForProspectiveLearners?.map((recommendation: string, index: number) => (
              <Typography key={index} variant="body2" color="textSecondary">
                {recommendation}
              </Typography>
              )) || 'No data available'}
            </StyledCardContent>
            </StyledCard>

            <StyledCard>
            <StyledCardContent>
              <StyledTypography variant="h5">
              Tools Used in the Course
              </StyledTypography>
              <Typography variant="body2" color="textSecondary">
              {fastAIData?.tools || 'No data available'}
              </Typography>
            </StyledCardContent>
            </StyledCard>

            <StyledCard>
            <StyledCardContent>
              <StyledTypography variant="h5">
              Review Summary: Positives
              </StyledTypography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Accessibility for Beginners:</strong> {fastAIData?.reviewSummary?.positiveAspects?.accessibilityForBeginners || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Hands-On Learning:</strong> {fastAIData?.reviewSummary?.positiveAspects?.handsOnLearning || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Engaging Content:</strong> {fastAIData?.reviewSummary?.positiveAspects?.engagingContent || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Community and Support:</strong> {fastAIData?.reviewSummary?.positiveAspects?.communityAndSupport || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Inspirational Instructor:</strong> {fastAIData?.reviewSummary?.positiveAspects?.inspirationalInstructor || 'No data available'}
              </Typography>
              </StyledCardContent>
              </StyledCard>

              <StyledCard>
              <StyledCardContent>
              <StyledTypography variant="h5">
              Review Summary: Critiques
              </StyledTypography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Gaps in Foundational Knowledge:</strong> {fastAIData?.reviewSummary?.critiques?.gapsInFoundationalKnowledge || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Learning Style Mismatch:</strong> {fastAIData?.reviewSummary?.critiques?.learningStyleMismatch || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Practical vs Theoretical Balance:</strong> {fastAIData?.reviewSummary?.critiques?.practicalVsTheoreticalBalance || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Steep Learning Curve:</strong> {fastAIData?.reviewSummary?.critiques?.steepLearningCurve || 'No data available'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
              • <strong>Variability in Outcomes:</strong> {fastAIData?.reviewSummary?.critiques?.variabilityInOutcomes || 'No data available'}
              </Typography>
            </StyledCardContent>
            </StyledCard>

            <StyledCard>
            <StyledCardContent>
              <StyledTypography variant="h5">
              Where We Got the Data From
              </StyledTypography>
              <Typography variant="body2" color="textSecondary">
              {fastAIData?.reviewSummarySourceOverview || 'No data available'}
              </Typography>
            </StyledCardContent>
            </StyledCard>



            <StyledCard>
            <StyledCardContent>
              <StyledTypography variant="h5">
              Key Quotes and Relevant Links
              </StyledTypography>
              {fastAIData?.keyQuotesAndRelevantLinks?.map((quote: any, index: number) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                <strong>{quote.source}:</strong> {quote.quote}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                <a href={quote.url} target="_blank" rel="noopener noreferrer">{quote.url}</a>
                </Typography>
              </Box>
              )) || 'No data available'}
            </StyledCardContent>
            </StyledCard>

        </Box>
        <Footer />
        </Container>
      </ThemeProvider>
      
  );
}
