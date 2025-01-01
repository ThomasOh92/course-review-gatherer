import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Footer from '../../Footer';
import getTheme from '../../mui-theme/getTheme';
import CollectedReviewShortSummary from './collected-reviews-short-summary';
import CollectedReviewsSources from './collected-reviews-sources';
import IndividualReview from './individual-review';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

interface ReviewPageProps {
    data: any;
}

const ReviewPage: React.FC<ReviewPageProps> = ({data}) => {
    const [mode, setMode] = React.useState<PaletteMode>('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const [displayedReviews, setDisplayedReviews] = React.useState<any | null>(null);
    const mainTheme = createTheme(getTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    React.useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as PaletteMode | null;
        if (savedMode) {
            setMode(savedMode);
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(systemPrefersDark ? 'dark' : 'light');
        }
    }, []);


    React.useEffect(() => {
        if (data?.CollectedReviews) {
            setDisplayedReviews(data.CollectedReviews);
        }
    }, [data]);

    const filterReviewShowcase = (source: string) => {
        const filteredReviews = data?.CollectedReviews?.filter((review: any) => review.source === source);
        setDisplayedReviews(filteredReviews);
    };

    // const filteredReviews = filteredSource
    //     ? data?.CollectedReviews?.filter((review: any) => review.source === filteredSource)
    //     : data?.CollectedReviews;

    return (
        <ThemeProvider theme={showCustomTheme ? mainTheme : defaultTheme}>
            <CssBaseline enableColorScheme />
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
                                    }
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
                                {[...new Set(data?.CollectedReviews?.map((review: any) => review.source))].map((source: string, index) => {
                                    const count = data?.CollectedReviews?.filter((review: any) => review.source === source).length;
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
                <Footer />
            </Container>
        </ThemeProvider>
    );
};

export default ReviewPage;
