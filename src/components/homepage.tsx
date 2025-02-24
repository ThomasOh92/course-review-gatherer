import * as React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseconfig';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import HomepageSummaryCard from './helper-components/for-homepage/homepage-summary-card';
import SubmitQuestion from './helper-components/for-homepage/submit-question';

export default function HomePage() {
  const [cs50xData, setCS50xData] = useState<any>(null);
  const [fastAIData, setFastAIData] = useState<any>(null);
  const [andrewNgDeepLearningData, setAndrewNgDeepLearningData] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRefs = [
          { ref: doc(db, "summarizedReviews", "CS50x"), setter: setCS50xData },
          { ref: doc(db, "summarizedReviews", "FastAI"), setter: setFastAIData },
          { ref: doc(db, "summarizedReviews", "andrewNgDeepLearning"), setter: setAndrewNgDeepLearningData },
        ];

        const fetchDocs = docRefs.map(async ({ ref, setter }) => {
          const docSnap = await getDoc(ref);
          if (docSnap.exists()) {
            setter(docSnap.data()); // Extracting data directly
          }
        });

        await Promise.all(fetchDocs);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleCourseChange = (event: SelectChangeEvent) => {
    setSelectedCourse(event.target.value);
  };

  // Find the selected course data
  const selectedCourseData = 
    selectedCourse === cs50xData?.Title ? cs50xData :
    selectedCourse === fastAIData?.Title ? fastAIData :
    selectedCourse === andrewNgDeepLearningData?.Title ? andrewNgDeepLearningData :
    null;

  return (
    <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 4, alignItems: 'center' }}>
      {/* Header */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, borderBottom: 2, borderColor: 'divider' }}>
        <Typography
          variant="h1"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            fontWeight: 'bold',
            mt: 2
          }}
        >
          Course&nbsp;Review&nbsp;
          <Typography component="span" variant="h1" sx={{ fontSize: 'inherit', color: 'primary.main', fontWeight: 'bold' }}>
            Collector
          </Typography>
        </Typography>
        <Typography sx={{ textAlign: 'center', color: 'text.Primary', mb: 2 }}>
          Have an online course in mind? Find out more with our manually verified reviews.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', width: '100%', maxWidth: '600px'}}>
        {/* Drop Down List of Courses */}
        <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
          <InputLabel>Select a Course</InputLabel>
          <Select value={selectedCourse} label="Select a Course" onChange={handleCourseChange}>
            {cs50xData && <MenuItem value={cs50xData.Title}>{cs50xData.Title}</MenuItem>}
            {fastAIData && <MenuItem value={fastAIData.Title}>{fastAIData.Title}</MenuItem>}
            {andrewNgDeepLearningData && <MenuItem value={andrewNgDeepLearningData.Title}>{andrewNgDeepLearningData.Title}</MenuItem>}
          </Select>
        </FormControl>

        {/* Dynamically Generated Summary Card */}
        {selectedCourseData && <HomepageSummaryCard data={selectedCourseData} />}

        {/* Question Interface */}
        <SubmitQuestion selectedCourseData={selectedCourseData}/>

      </Box>
    </Container>
  );
}
