import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CollectedReviewShortSummary from './collected-reviews-short-summary';
import CollectedReviewsSources from './collected-reviews-sources';
import IndividualReview from './individual-review';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

interface ReviewPageProps {
    data: any;
    courseId: string;
}

const ReviewPage: React.FC<ReviewPageProps> = ({data, courseId}) => {
    const [reviews, setReviews] = React.useState<any[]>([]);
    const [displayedReviews, setDisplayedReviews] = React.useState<any | null>(null);


    React.useEffect(() => {
        const fetchCollectedReviews = async () => {
            try {
              const subCollectionRef = collection(doc(db, "summarizedReviews", courseId), "CollectedReviews");
              const snapshot = await getDocs(subCollectionRef);
      
              const reviewsData = snapshot.docs.map((doc) => ({
                ...doc.data(),
              }));
              setReviews(reviewsData);
              console.log(reviewsData);
              setDisplayedReviews(reviewsData);
            } catch (error) {
              console.error("Error fetching subcollection data for reviews:", error);
            } 
          };
      
          fetchCollectedReviews();
        }, [courseId]);


    const filterReviewShowcase = (source: string) => {
        const filteredReviews = reviews.filter((review: any) => review.source === source);
        setDisplayedReviews(filteredReviews);
    };

    return (
            <Container
                maxWidth="xl"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 6, gap: 4 }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                    <Typography variant="h2" gutterBottom maxWidth='700px' align="center">{data?.Title}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: { xs: 'center', md: 'flex-start' }, width: '100%', justifyContent: 'center' }}>
                        {/* Left hand Column */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', gap: 2 }}>
                            <Link 
                                href={data?.CourseLink} 
                                target="_blank" 
                                rel="noopener" 
                                sx={{ 
                                    textDecoration: 'none', 
                                    padding: '8px 16px', 
                                    border: '1px solid', 
                                    borderColor: 'primary.main', 
                                    borderRadius: '4px', 
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                        borderColor: 'primary.dark',
                                    },
                                    width: '100%',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                Go to Course
                            </Link>
                            <CollectedReviewShortSummary data={data} />
                            <CollectedReviewsSources data={data} />     
                        </Box>
                        {/* Right Hand Column */}
                        <Grid xs={12} md={6}>
                            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', maxWidth: '800px', justifyContent: 'center', gap: 1 }}>
                                <Chip 
                                    label="All Reviews" 
                                    onClick={() => setDisplayedReviews(reviews)} 
                                    size="medium" 
                                    sx={{ mb: 1 }}
                                />
                                {[...new Set(reviews.map((review: any) => review.source))].map((source: string, index) => {
                                    const count = reviews.filter((review: any) => review.source === source).length;
                                    return (
                                        <Chip 
                                            key={index} 
                                            label={<span><span style={{ fontWeight: 'normal' }}>{source}</span> {`(${count})`}</span>} 
                                            onClick={() => filterReviewShowcase(source)} 
                                            size="medium" 
                                            sx={{ mb: 1 }}
                                        />
                                    );
                                })}
                            </Stack>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', alignItems: 'center' }}>
                                {displayedReviews?.map((review: any, index: number) => (
                                    <IndividualReview  
                                        quote={review.quote} 
                                        source={review.source} 
                                        source_url={review.source_url} 
                                        bolded_text={review.bolded_text}
                                        flagged_status={review.flagged_status}
                                        keywords={review.keywords}
                                        sentiment={review.sentiment}
                                        date={review.date} 
                                        key={index}  />
                                )) || 'No data available'}
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            </Container>
    );
};

export default ReviewPage;
