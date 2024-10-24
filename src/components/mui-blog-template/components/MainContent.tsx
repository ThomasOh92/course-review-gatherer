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

  useEffect(() => {
    const fetchData = async () => {
      try {
      const docRefs = [
        { ref: doc(db, "summarizedReviews", "CS50"), setter: setCS50Data },
        { ref: doc(db, "summarizedReviews", "GoogleAIEssentials"), setter: setGoogleAIEssentialsData },
        { ref: doc(db, "summarizedReviews", "GenAINanoDegreeUdacity"), setter: setGenAINanoDegreeUdacityData }
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h1" gutterBottom> The Right Course </Typography>
        <Typography variant="subtitle1" >Deciding whether to start an online course? We collect and analyze reviews from unique sources</Typography>
        <Paper 
          elevation={3} 
          sx={{ 
            width: '100%', 
            maxWidth: 600, 
            padding: 2,
            mt: 3, 
            display: 'flex', 
            justifyContent: 'center', 
            flexDirection: 'column'
          }}
          square
        >
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row' }}>
            <Box sx={{ padding: 1, mt: 1, flex: 1 }}>
                <Typography sx={{mb:1}}  >
                <strong>Sources of Info (adding more soon!) </strong>
                </Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Reddit Threads, Youtube Transcripts, Youtube Comments, Class Central
              </Typography>
            </Box>
            <Box  sx={{ padding: 1, mt: 1, flex: 1 }}>
              <Typography sx={{mb:1}}><strong>Main Prompt Refinements</strong></Typography>
              <Typography variant="body2" sx={{ color: 'grey' }}>
                Summarize reviews in 3 bullet points + a paragraph. Focus on employability benefits, difficulty level, and engagement.
              </Typography>
            </Box>
            </Box>
        </Paper>
      </div>
      {/* <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip onClick={handleClick} size="medium" label="All categories" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Programming"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Data Science"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Search />
        </Box>
      </Box> */}
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
                  {/* <Typography gutterBottom variant="caption" component="div">
                    Programming
                  </Typography> */}
                    <Typography variant="h6" component="div">
                      {cs50Data ? cs50Data.data()?.Title : 'Loading...'}
                    </Typography>
                    <List sx={{ padding: 0, margin: 0 }}>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Engaging but challenging" />
                      </ListItem>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Foundational for learning computer science" />
                      </ListItem>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Employability benefits are not immediate" />
                      </ListItem>
                    </List>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
                    >
                      {cs50Data ? cs50Data.data()?.["Summarized Review"] : 'Loading...'}
                    </StyledTypography>
                    <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        Analysed from 10 reddit threads, 1062 youtube comments and 452 Class Central Reviews
                      </AccordionSummary>
                      <AccordionDetails>
                        Links to sources to be provided soon...
                      </AccordionDetails>
                    </Accordion>
                </div>
                <Link 
                    sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1, color: 'primary.main'}}
                    href={cs50Data ? cs50Data.data()?.Link : 'Loading...'} 
                    target='_blank'
                    >
                    Link to Course
                  </Link>
              </StyledCardContent>
            </StyledCard>
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
                  {/* <Typography gutterBottom variant="caption" component="div">
                    Programming
                  </Typography> */}
                    <Typography variant="h6" component="div">
                      {googleAIEssentialsData ? googleAIEssentialsData.data()?.Title : 'Loading...'}
                    </Typography>
                    <List sx={{ padding: 0, margin: 0 }}>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Beginner-friendly, no technical experience required" />
                      </ListItem>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Focuses on practical AI applications in the workplace" />
                      </ListItem>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Employability benefits not clear" />
                      </ListItem>
                    </List>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
                    >
                      {googleAIEssentialsData ? googleAIEssentialsData.data()?.["Summarized Review"] : 'Loading...'}
                    </StyledTypography>
                    <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        Analysed from 3 reddit threads, 2 youtube videos and 202 youtube comments
                      </AccordionSummary>
                      <AccordionDetails>
                        Links to sources to be provided soon...
                      </AccordionDetails>
                    </Accordion>
                </div>
                <Link 
                    sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1, color: 'primary.main'}}
                    href={googleAIEssentialsData ? googleAIEssentialsData.data()?.Link : 'Loading...'} 
                    target='_blank'
                    >
                    Link to Course
                  </Link>
              </StyledCardContent>
            </StyledCard>
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
                  {/* <Typography gutterBottom variant="caption" component="div">
                    Programming
                  </Typography> */}
                    <Typography variant="h6" component="div">
                      {GenAINanoDegreeUdacityData ? GenAINanoDegreeUdacityData.data()?.Title : 'Loading...'}
                    </Typography>
                    <List sx={{ padding: 0, margin: 0 }}>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• An excellent Generative AI course" />
                      </ListItem>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Intermediate level; requires Python and SQL knowledge" />
                      </ListItem>
                      <ListItem sx={{ padding: 0, margin: 0 }}>
                      <ListItemText primary="• Includes hands-on projects, especially for real-world tasks like image generation and chatbot creation" />
                      </ListItem>
                    </List>
                    <StyledTypography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                      sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1 }}
                    >
                      {GenAINanoDegreeUdacityData ? GenAINanoDegreeUdacityData.data()?.["Summarized Review"] : 'Loading...'}
                    </StyledTypography>
                    <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        Analysed from 1 reddit threads and 157 youtube comments
                      </AccordionSummary>
                      <AccordionDetails>
                        Links to sources to be provided soon...
                      </AccordionDetails>
                    </Accordion>
                </div>
                <Link 
                    sx={{ display: 'block', overflow: 'visible', WebkitLineClamp: 'unset', mt: 1, mb: 1, color: 'primary.main'}}
                    href={GenAINanoDegreeUdacityData ? GenAINanoDegreeUdacityData.data()?.Link : 'Loading...'} 
                    target='_blank'
                    >
                    Link to Course
                  </Link>
              </StyledCardContent>
            </StyledCard>
          </Box>
        </Grid>
    </Box>
  );
}
