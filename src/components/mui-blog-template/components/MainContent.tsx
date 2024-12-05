import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
// import { addData, readData } from '../../../firestoreUtils'; 
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { collection, doc, addDoc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
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

// function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         gap: 2,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         padding: '16px',
//       }}
//     >
//       <Box
//         sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
//       >
//         <AvatarGroup max={3}>
//           {authors.map((author, index) => (
//             <Avatar
//               key={index}
//               alt={author.name}
//               src={author.avatar}
//               sx={{ width: 24, height: 24 }}
//             />
//           ))}
//         </AvatarGroup>
//         <Typography variant="caption">
//           {authors.map((author) => author.name).join(', ')}
//         </Typography>
//       </Box>
//       <Typography variant="caption">July 14, 2021</Typography>
//     </Box>
//   );
// }

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [cs50Data, setCS50Data] = useState<any>(null);
  const [googleAIEssentialsData, setGoogleAIEssentialsData] = useState<any>(null);
  const [GenAINanoDegreeUdacityData, setGenAINanoDegreeUdacityData] = useState<any>(null);
  const [fastAIData, setfastAIData] = useState<any>(null);

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

  
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  // const handleAddData = async () => {
  //   await addData('testCollection', { testField: 'testValue' });
  // };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        <Typography variant="h1" > Course Review Collector </Typography>
        <Typography variant="subtitle1" gutterBottom >Deciding whether to start an online course? We collect and analyze reviews from unique sources</Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { xs: 'center', md: 'flex-start' }, width: '100%' }}>
          <Box>
          <Paper 
            elevation={3} 
            sx={{ 
              width: '100%', 
              maxWidth: 400, 
              padding: 2,
              display: 'flex', 
              justifyContent: 'center', 
              flexDirection: 'column'
          }}
            square
          >
          <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                  Suggest a Course
              </Typography>
              <Typography variant="body1" gutterBottom sx={{ maxWidth: 300 }}>
              Request for a course to be added! I will work on adding it to the list of summaries
              </Typography>
              <Box
              sx={{
            display: 'inline-block',
            border: '1px solid',
            borderColor: 'primary.main',
            borderRadius: 1,
            padding: '8px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
            backgroundColor: 'primary.light',
            },
            mt: 1,
              }}
              >
              <Link 
            href="https://docs.google.com/forms/d/e/1FAIpQLSeUFYoCTEIF102LXtKRyzT708hFPE_dZN_Z3VZmTAPVTYkrOg/viewform" 
            target="_blank" 
            sx={{ color: 'primary.main', textDecoration: 'none' }}
              >
            Submit Suggestion
              </Link>
              </Box>
          </Box>
          </Paper>

          <Paper 
            elevation={3} 
            sx={{ 
              width: '100%', 
              maxWidth: 400, 
              padding: 2,
              mt: 2,
              display: 'flex', 
              justifyContent: 'center', 
              flexDirection: 'column'
          }}
            square
            >
              <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  People We've Helped
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="P. Lee"
                      secondary="Requested a review of 'Fast AI: Practical Deep Learning for Coders' - Created on 15 Nov 2024"
                    />
                  </ListItem>
                </List>
              </Box>
          </Paper>
          </Box>


          <Grid xs={12} md={6}>
            <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%', alignItems: 'center' }}
            >
          <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(3)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
            sx={{ height: '100%', maxWidth: 700 }}
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
                {fastAIData ? fastAIData.data()?.Title : 'Loading...'}
              </Typography>
                <List sx={{ padding: 0, margin: 0 }}>
                {fastAIData?.data()?.bulletPoints?.map((point: string, index: number) => (
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
                {fastAIData ? fastAIData.data()?.shortSummary : 'Loading...'}
              </StyledTypography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Card sx={{ maxWidth: 500, textAlign: 'center' }}>
                  Analysed from... {fastAIData ? fastAIData.data()?.ReviewSourceDataNotes : 'Loading...'}
                </Card>
                </Box>
              </div>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Link 
                  sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', color: 'primary.main'}}
                  href={fastAIData ? fastAIData.data()?.Link : 'Loading...'} 
                  target='_blank'
                >
                  Link to Course
                </Link>
                <Link 
                  sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', color: 'secondary.main', ml: 3}}
                  href="/fastai"
                >
                  See Details on Collected Reviews
                </Link>
                </Box>
            </StyledCardContent>
          </StyledCard>
            <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            sx={{ height: '100%', width: '100%', maxWidth: 700 }}
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
              {cs50Data ? cs50Data.data()?.Title : 'Loading...'}
              </Typography>
              <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
              >
              Summary Coming Soon...
              </StyledTypography>
              </div>
            </StyledCardContent>
            </StyledCard>

            <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(1)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
            sx={{ height: '100%', width: '100%', maxWidth: 700 }}
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
              {googleAIEssentialsData ? googleAIEssentialsData.data()?.Title : 'Loading...'}
              </Typography>
              <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
              >
              Summary Coming Soon...
              </StyledTypography>
              </div>
            </StyledCardContent>
            </StyledCard>

            <StyledCard
            variant="outlined"
            onFocus={() => handleFocus(2)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
            sx={{ height: '100%', width: '100%', maxWidth: 700 }}
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
              {GenAINanoDegreeUdacityData ? GenAINanoDegreeUdacityData.data()?.Title : 'Loading...'}
              </Typography>
              <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
              sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
              >
              Summary Coming Soon...
              </StyledTypography>
              </div>
            </StyledCardContent>
            </StyledCard>
            </Box>
          </Grid>
        </Box>
    </Box>
  );
}
